using AutoMapper;
using BaseSystem;
using CommonServices.Abstract;
using Database;
using DTOs;
using Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Repository.Abstract;
using Repository.Implement;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static BaseSystem.BaseEnum;

namespace CommonServices.Implement
{
    public class AuthenticationServices: IAuthenticationServices
    {
        private readonly IConfiguration configuration;
        private readonly IRepository<User> userRepository;
        private readonly IRepository<UserJwtToken> tokenRepository;
        private readonly JwtSecurityTokenHandler _tokenHandler;
        private readonly CarShopDBContext _context;

        public AuthenticationServices(IConfiguration configuration, IRepository<User> userRepository, IRepository<UserJwtToken> tokenRepository, CarShopDBContext context)
        {
            this.configuration = configuration;
            this.userRepository = userRepository;
            this.tokenRepository = tokenRepository;
            _tokenHandler = new JwtSecurityTokenHandler();
            _context = context;
        }

        public async Task<(string, DateTime)> CreateAccessToken(User userEntity)
        {
            DateTime expiredToken = DateTime.UtcNow.AddHours(1);
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, userEntity.UserName, ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
                new Claim(BaseConstant.USER_CLAIM_ID,userEntity.Id.ToString(),ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
                new Claim(BaseConstant.USER_CLAIM_ROLE,userEntity.RoleId.ToString(),ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenBearer:SignatureKey"]));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var infor = new JwtSecurityToken(
                    issuer: configuration["TokenBearer:Issuer"],
                    claims: claims,
                    audience: configuration["TokenBearer:Audience"],
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: credential
                );
            string token = new JwtSecurityTokenHandler().WriteToken(infor);
            return await Task.FromResult((token, expiredToken));
        }

        public async Task<(string, DateTime)> CreateRefreshToken(User entity)
        {
            DateTime expiredTime = DateTime.UtcNow.AddHours(1);
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString(), ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
                new Claim(JwtRegisteredClaimNames.Iss, ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
                new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToString(), ClaimValueTypes.Integer64, configuration["TokenBearer:Issuer"]),
                new Claim(JwtRegisteredClaimNames.Exp, DateTime.UtcNow.AddHours(1).ToString("dd/MM/yyyy"), ClaimValueTypes.String, configuration["TokenBearer:Issuer"]),
                new Claim(ClaimTypes.SerialNumber, Guid.NewGuid().ToString(),ClaimValueTypes.String, configuration["TokenBearer:Issuer"])
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenBearer:SignatureKey"]));
            var credential = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var infor = new JwtSecurityToken(
                    issuer: configuration["TokenBearer:Issuer"],
                    claims: claims,
                    audience: configuration["TokenBearer:Audience"],
                    notBefore: DateTime.UtcNow,
                    expires: DateTime.UtcNow.AddHours(1),
                    signingCredentials: credential
                );
            string token = new JwtSecurityTokenHandler().WriteToken(infor);
            return await Task.FromResult((token, expiredTime));
        }

        public async Task<User> LoginAsync(LoginDTO dto)
        {
            try
            {
                var user = await userRepository.GetObjectByCondition(x => x.Email.ToLower().Equals(dto.Email.ToLower()) && x.Password.Equals(dto.Password));
                if (user == null)
                {
                    throw new Exception("Invalid email or password");
                }
                return user;
            }
            catch (Exception ex)
            {
                // Log the exception details
                Console.WriteLine($"Login error: {ex.Message}");
                throw new Exception($"Login failed: {ex.Message}", ex);
            }
        }

        public async Task<TokenDTO> HandleLoginGoogle(string code)
        {
            var clientId = configuration.GetSection("GoogleAuthenticationConfig:ClientId").Value;
            var clientSecret = configuration.GetSection("GoogleAuthenticationConfig:ClientSecret").Value;
            var redirectUri = configuration.GetSection("GoogleAuthenticationConfig:RedirectUrl").Value;

            var tokenRequestUri = "https://oauth2.googleapis.com/token";

            // Exchange authorization code for an access token
            var requestContent = new FormUrlEncodedContent(new Dictionary<string, string>
    {
        { "code", code },
        { "client_id", clientId },
        { "client_secret", clientSecret },
        { "redirect_uri", redirectUri },
        { "grant_type", "authorization_code" }
    });

            using (var client = new HttpClient())
            {
                var tokenResponse = await client.PostAsync(tokenRequestUri, requestContent);
                if (!tokenResponse.IsSuccessStatusCode)
                {
                    // Handle failure here (e.g., log the error and return null)
                    return null;
                }

                var tokenResponseBody = await tokenResponse.Content.ReadAsStringAsync();
                var tokenData = JsonConvert.DeserializeObject<Dictionary<string, string>>(tokenResponseBody);

                var accessToken = tokenData["access_token"];

                // Now, use the access token to get the user info
                var userInfoResponse = await client.GetStringAsync($"https://www.googleapis.com/oauth2/v3/userinfo?access_token={accessToken}");
                var userInfo = JsonConvert.DeserializeObject<Dictionary<string, string>>(userInfoResponse);

                if (userInfo == null) return null;

                var userEmail = userInfo["email"];
                var user = await userRepository.GetObjectByCondition(x => x.Email.ToLower().Equals(userEmail.ToLower()));
                if (user == null) return null;

                var loginAccount = new LoginDTO()
                {
                    Email = userEmail,
                    Password = user.Password,
                };

                var result = await LoginAsync(loginAccount);
                (string newAccessToken, DateTime expiredAccessToken) = await CreateAccessToken(result);
                (string newrefreshToken, DateTime expiredRefreshToken) = await CreateAccessToken(result);

                var lastResult = new TokenDTO()
                {
                    AccessToken = newAccessToken,
                    RefreshToken = newrefreshToken,
                };
                return lastResult;
            }
            }

        public async Task<BaseResult> RegisterAccount(SignUpDTO dto)
        {
            var user = await userRepository.GetObjectByCondition(x => x.Email.ToLower().Equals(dto.Email.ToLower()));
            if (user != null) {
                return BaseResult.Failed;
            }

            var signupAcc = new User()
            {
                Id = Guid.NewGuid(),
                Address = "",
                Avatar = "",
                Dob = dto.Dob,
                Email = dto.Email,
                FullName = "",
                Enable = true,
                Gender = dto.Gender,
                Password = dto.Password,
                PhoneNumber = "",
                RoleId = (int)BaseEnum.RoleEnum.Customer,
                UserName = "",
                Verify = false,
            };

            userRepository.Create(signupAcc);
            _context.SaveChanges();
            return BaseResult.Success;
        }

        public async Task<string> GetEmailFromUserId(Guid userId)
        {
            var user = await userRepository.GetObjectByCondition(x => x.Id.Equals(userId));
            if (user == null)
            {
                return null;
            }
            return user.Email;
        }

        public async Task<BaseResult> ActiveAccount(User user)
        {
            if (user == null)
            {
                return BaseResult.Failed;
            }
            user.Verify = true;
            userRepository.Update(user);
            await userRepository.CommitChangeAsync();
            return BaseResult.Success;

        }

        public async Task<User> GetUserById(Guid id)
        {
            var account = await userRepository.GetObjectByCondition(x => x.Id.Equals(id));
            if (account == null)
            {
                return null;
            }
            return account;
        }

        public async Task<User> GetUserByAccountName(string email)
        {
            var account = await userRepository.GetObjectByCondition(x => x.Email.Equals(email));
            if (account == null)
            {
                return null;
            }
            return account;
        }

        public async Task<(User, BaseResult)> changePass(Guid userId, string newPass, string confirmPass, string oldPass)
        {
            if (string.IsNullOrEmpty(newPass) || string.IsNullOrEmpty(confirmPass) || string.IsNullOrEmpty(oldPass))
            {
                return (null, BaseResult.Failed);
            }
            if (!newPass.Equals(confirmPass))
            {
                return (null, BaseResult.Failed);
            }
            var Account = await userRepository.GetObjectByCondition(x => x.Id.Equals(userId)) as User;
            if (Account == null || !Account.Password.Equals(oldPass))
            {
                return (null, BaseResult.Failed);
            }
            Account.Password = newPass;
            userRepository.Update(Account);
            await userRepository.CommitChangeAsync();
            return (Account, BaseResult.Success);
        }

        public async Task<User> getAccountByEmail(string email)
        {
            return await userRepository.GetObjectByCondition(x => x.Email == email);
        }

        public async Task<User> LoginOrRegisterWithGoogle(string email, string name)
        {
            try
            {
                // Kiểm tra xem email đã tồn tại trong hệ thống chưa
                var user = await userRepository.GetObjectByCondition(x => x.Email.ToLower().Equals(email.ToLower()));
                
                // Nếu user đã tồn tại, trả về thông tin user
                if (user != null)
                {
                    return user;
                }
                
                // Nếu user chưa tồn tại, tạo mới tài khoản
                var newUser = new User
                {
                    Id = Guid.NewGuid(),
                    Email = email,
                    FullName = name,
                    UserName = email.Split('@')[0], // Tạo username từ phần đầu của email
                    Password = Guid.NewGuid().ToString(), // Tạo mật khẩu ngẫu nhiên
                    RoleId = (int)BaseEnum.RoleEnum.Customer,
                    Enable = true,
                    Verify = true, // Email đã được xác thực qua Google
                    Avatar = "", // Có thể lấy avatar từ Google nếu cần
                    Dob = DateTime.UtcNow,
                    Gender = false, // Giá trị mặc định
                    PhoneNumber = "",
                    Address = ""
                };
                
                // Lưu user mới vào database
                userRepository.Create(newUser);
                _context.SaveChanges();
                
                return newUser;
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Error in LoginOrRegisterWithGoogle: {ex.Message}");
                throw new Exception($"Failed to login or register with Google: {ex.Message}", ex);
            }
        }
    }
}
