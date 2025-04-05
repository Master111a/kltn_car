using AutoMapper;
using CommonServices.Abstract;
using DTOs;
using Entities;
using Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonServices.Implement
{
    public class UserServices : IUserServices
    {
        private readonly IRepository<User> userRepository;
        private readonly IMapper mapper;

        public UserServices(IRepository<User> userRepository, IMapper mapper)
        {
            this.userRepository = userRepository;
            this.mapper = mapper;
        }

        public async Task<User> CreateAccount(CreateUserDTO dto)
        {
            try
            {
                var user = mapper.Map<User>(dto);
                user.Id = Guid.NewGuid();
                user.Avatar = "";
                user.Verify = true;
                user.Address = "";
                user.Enable = true;
                user.FullName = "";

                userRepository.Create(user);
                await userRepository.CommitChangeAsync();
                return user;
            }
            catch (Exception)
            {

                throw new Exception();
            }
            


        }
    }
}
