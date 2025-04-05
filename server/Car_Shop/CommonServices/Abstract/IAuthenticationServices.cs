using BaseSystem;
using DTOs;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonServices.Abstract
{
    public interface IAuthenticationServices
    {
        Task<BaseEnum.BaseResult> ActiveAccount(User user);
        Task<(User, BaseEnum.BaseResult)> changePass(Guid userId, string newPass, string confirmPass, string oldPass);
        Task<(string, DateTime)> CreateAccessToken(User userEntity);
        Task<(string, DateTime)> CreateRefreshToken(User entity);
        Task<User> getAccountByEmail(string email);
        Task<string> GetEmailFromUserId(Guid userId);
        Task<User> GetUserByAccountName(string email);
        Task<User> GetUserById(Guid id);
        Task<TokenDTO> HandleLoginGoogle(string code);
        Task<User> LoginAsync(LoginDTO dto);
        Task<BaseEnum.BaseResult> RegisterAccount(SignUpDTO dto);
        Task<User> LoginOrRegisterWithGoogle(string email, string name);
    }
}
