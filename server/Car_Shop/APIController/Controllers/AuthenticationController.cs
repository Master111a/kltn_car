using CommonServices.Abstract;
using CommonServices.Extensions;
using CommonServices.Implement;
using DTOs;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using System.Text.Json.Serialization;
using System.Net.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Net.Http.Json;

namespace APIController.Controllers
{
    [Route("api/Common/[controller]")]
    [ApiController]
    public class AuthenticationController : Controller
    {
        private readonly IAuthenticationServices authenServices;
        private readonly IConfiguration _configuration;
        private readonly IHttpContextAccessor _context;
        private readonly IEmailServices _emailServices;



        public AuthenticationController(IAuthenticationServices authenServices, IConfiguration configuration, IHttpContextAccessor context, IEmailServices emailServices)
        {
            this.authenServices = authenServices;
            _configuration = configuration;
            _context = context;
            _emailServices = emailServices;
        }
        /// <summary>
        /// Validates login credentials and returns authentication tokens
        /// </summary>
        /// <param name="dto">Login credentials</param>
        /// <returns>User info and tokens if successful, 401 if unauthorized</returns>
        /// <exception cref="Exception">Thrown when login validation fails</exception>
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDTO dto)
        {
            try
            {
                if (dto == null)
                {
                    return BadRequest("Login credentials cannot be null");
                }

                if (string.IsNullOrEmpty(dto.Email) || string.IsNullOrEmpty(dto.Password))
                {
                    return BadRequest("Email and password are required");
                }

                var loginResult = await authenServices.LoginAsync(dto);
                if (loginResult == null)
                {
                    return StatusCode(StatusCodes.Status401Unauthorized, "Invalid credentials");
                }

                var accessToken = await authenServices.CreateAccessToken(loginResult);
                var refreshToken = await authenServices.CreateRefreshToken(loginResult);

                return Ok(new
                {
                    UserInfo = loginResult,
                    AccessToken = accessToken.Item1,
                    RefreshToken = refreshToken.Item1
                });
            }
            catch (Exception ex)
            {
                // Log the exception details here
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred during login");
            }
        }

        [HttpPost("test")]
        [Authorize]
        public async Task<IActionResult> Test()
        {
            return Ok();
        }

        [HttpGet("logingoogle")]
        //[Authorize]
        public string LoginByGoogle()
        {
            var authUrl = _configuration.GetSection("GoogleAuthenticationConfig:AuthUrl").Value;
            var clientId = _configuration.GetSection("GoogleAuthenticationConfig:ClientId").Value;
            var redirectUri = _configuration.GetSection("GoogleAuthenticationConfig:RedirectUrl").Value;
            var scope = "email"; // Single scope value

            var urlLogin = $"{authUrl}?client_id={Uri.EscapeDataString(clientId)}&redirect_uri={Uri.EscapeDataString(redirectUri)}&response_type=code&scope={Uri.EscapeDataString(scope)}";

            return urlLogin;
        }

        [HttpGet("callbackgoogle")]
        public async Task<IActionResult> TestCallBack(string code, string scope, string authuser, string prompt)
        {
            try
            {
                if (string.IsNullOrEmpty(code))
                {
                    Console.WriteLine("Error: Missing authorization code");
                    return BadRequest("Missing authorization code");
                }

                Console.WriteLine($"Received Google callback with code: {code.Substring(0, Math.Min(10, code.Length))}...");

                // URL frontend cần chuyển hướng đến 
                var frontendUrl = "http://localhost:5173"; // URL đúng của frontend
                
                // Tạo token dummy để test
                var dummyToken = "test_token_" + DateTime.Now.Ticks;
                
                Console.WriteLine($"Using dummy token for testing: {dummyToken}");
                Console.WriteLine($"Redirecting to: {frontendUrl}?token={dummyToken}");
                
                // Chuyển hướng về frontend kèm theo dummy token để test
                return Redirect($"{frontendUrl}?token={dummyToken}");
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Google auth error: {ex.Message}");
                return BadRequest($"Authentication error: {ex.Message}");
            }
        }

        // Phương thức hỗ trợ để trao đổi code lấy token
        private async Task<GoogleTokenResponse> ExchangeCodeForTokenAsync(string code, string clientId, string clientSecret, string redirectUrl)
        {
            using (var client = new HttpClient())
            {
                var tokenRequestParameters = new Dictionary<string, string>
                {
                    { "code", code },
                    { "client_id", clientId },
                    { "client_secret", clientSecret },
                    { "redirect_uri", redirectUrl },
                    { "grant_type", "authorization_code" }
                };

                var requestContent = new FormUrlEncodedContent(tokenRequestParameters);
                var response = await client.PostAsync("https://oauth2.googleapis.com/token", requestContent);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    return System.Text.Json.JsonSerializer.Deserialize<GoogleTokenResponse>(responseContent);
                }

                return null;
            }
        }

        // Phương thức hỗ trợ để lấy thông tin người dùng từ Google
        private async Task<GoogleUserInfo> GetUserInfoFromGoogleAsync(string accessToken)
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", accessToken);
                var response = await client.GetAsync("https://www.googleapis.com/oauth2/v3/userinfo");

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    return System.Text.Json.JsonSerializer.Deserialize<GoogleUserInfo>(responseContent);
                }

                return null;
            }
        }

        // Phương thức tạo JWT token
        private async Task<string> GenerateJwtToken(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            try
            {
                // Tạo access token cho user
                var tokenResult = await authenServices.CreateAccessToken(user);
                return tokenResult.Item1; // Trả về token
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Error generating JWT token: {ex.Message}");
                throw new Exception("Token generation failed", ex);
            }
        }

        // Class hỗ trợ để deserialize response từ Google
        private class GoogleTokenResponse
        {
            [JsonPropertyName("access_token")]
            public string AccessToken { get; set; }
            
            [JsonPropertyName("expires_in")]
            public int ExpiresIn { get; set; }
            
            [JsonPropertyName("token_type")]
            public string TokenType { get; set; }
            
            [JsonPropertyName("refresh_token")]
            public string RefreshToken { get; set; }
        }
        
        private class GoogleUserInfo
        {
            [JsonPropertyName("sub")]
            public string Id { get; set; }
            
            [JsonPropertyName("name")]
            public string Name { get; set; }
            
            [JsonPropertyName("email")]
            public string Email { get; set; }
            
            [JsonPropertyName("picture")]
            public string Picture { get; set; }
        }

        [HttpGet("handletoken")]
public async Task<IActionResult> HandleLoginGoogle(string code)
{
    if (string.IsNullOrEmpty(code))
    {
        return BadRequest("Missing code parameter");
    }

    // Xử lý trao đổi 'code' lấy access_token từ Google
    // Ví dụ: dùng HttpClient gửi request đến https://oauth2.googleapis.com/token với các tham số cần thiết
    
    // Giả sử bạn đã lấy được accessToken từ Google:
    var accessToken = "example_access_token";

    // Trả về accessToken hoặc thực hiện logic đăng nhập tiếp theo
    return Ok(new { AccessToken = accessToken });
}


        [HttpPost("signUpAccount")]
        public async Task<IActionResult> SignUpAccount(SignUpDTO dto)
        {
            var result = await authenServices.RegisterAccount(dto);
            if (result == BaseSystem.BaseEnum.BaseResult.Failed) {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost]
        [Route("send-verify-email")]
        public async Task<IActionResult> SendVerifyEmail(string email)
        {
            if (await _emailServices.CanSendMail(email))
            {
                var randomNumber = await _emailServices.RandomNumber(6);
                var message = new EmailMessageDTO(new string[] { email }, "CarShop verify email", $"Your verify code : {randomNumber}.");
                _emailServices.AddToCache(email, randomNumber);

                _emailServices.SendMail(message);
                return Ok(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status406NotAcceptable, "Hãy thử lại sau 1 phút");
        }

        [HttpPost]
        [Route("send-verify-email-for-exist-account")]
        [Authorize]
        public async Task<IActionResult> SendVerifyEmailForExistedAccount()
        {

            var userId = Guid.Parse(_context.HttpContext.GetUserId());
            var email = await authenServices.GetEmailFromUserId(userId);
            if (await _emailServices.CanSendMail(email))
            {
                var randomNumber = await _emailServices.RandomNumber(6);
                var message = new EmailMessageDTO(new string[] { email }, "CarShop verify email", $"Your verify code : {randomNumber}.");
                _emailServices.AddToCache(email, randomNumber);

                _emailServices.SendMail(message);
                return Ok(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status406NotAcceptable);

        }

        [HttpPost]
        [Route("Verify-Account")]
        [Authorize]
        public async Task<IActionResult> VerifyExistedAccount(string verifyCode)
        {
            var userId = Guid.Parse(_context.HttpContext.GetUserId());
            var email = await authenServices.GetEmailFromUserId(userId);
            var user = await authenServices.GetUserById(userId);
            var verifyEmailCode = await _emailServices.GetValueFromCache(email);
            if (!verifyEmailCode.Equals(verifyCode))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var result = await authenServices.ActiveAccount(user);
            if (result.Equals(BaseSystem.BaseEnum.BaseResult.Failed))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return Ok(StatusCodes.Status200OK);
        }

        [HttpPost]
        [Route("verify-regis-account")]
        public async Task<IActionResult> VerifyRegisAccount(string email, string verifyCode)
        {
            var verifyEmailCode = await _emailServices.GetValueFromCache(email);
            if (!verifyEmailCode.Equals(verifyCode))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            var user = await authenServices.GetUserByAccountName(account);
            var result = await authenServices.ActiveAccount(user);
            if (result.Equals(BaseSystem.BaseEnum.BaseResult.Failed))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return StatusCode(StatusCodes.Status200OK);

        }
 
        [HttpPost]
        [Route("forgot-password")]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            if (await _emailServices.CanSendMail(email))
            {
                var account = await authenServices.getAccountByEmail(email);
                if (account == null)
                {
                    return BadRequest();
                }
                if (!account.Email.Equals(email))
                {
                    return BadRequest();
                }
                var newPass = await _emailServices.randomPassWord(15);
                var message = new EmailMessageDTO(new string[] { email }, "CarShop", $"Your new password : {newPass}.");

                _emailServices.SendMail(message);
                _emailServices.AddToCache(account.Email, newPass);
                var result = await authenServices.changePass(account.Id, newPass, newPass, account.Password);
                if (result.Item1 == null || result.Item2.Equals(BaseSystem.BaseEnum.BaseResult.Failed))
                {
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
                return StatusCode(StatusCodes.Status200OK);
            }
            return StatusCode(StatusCodes.Status406NotAcceptable);

        }

        [HttpPost]
        [Route("changePass")]
        [Authorize]
        public async Task<IActionResult> ChangePassword(string oldPass, string newPass)
        {
            var result = await authenServices.changePass(Guid.Parse(_context.HttpContext.GetUserId()), newPass, newPass, oldPass);
            if (result.Item1 == null || result.Item2.Equals(BaseSystem.BaseEnum.BaseResult.Failed))
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return StatusCode(StatusCodes.Status200OK, BaseSystem.BaseEnum.BaseResult.Success);
        }
    }
}
