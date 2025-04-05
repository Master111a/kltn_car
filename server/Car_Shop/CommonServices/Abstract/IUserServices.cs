using DTOs;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonServices.Abstract
{
    public interface IUserServices
    {
        Task<User> CreateAccount(CreateUserDTO dto);
    }
}
