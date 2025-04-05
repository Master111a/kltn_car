using AutoMapper;
using DTOs;
using Entities;

namespace Mapper
{
    public class UserMappings: Profile
    {
       public UserMappings() {
            CreateMap<User, CreateUserDTO>().ReverseMap();
        }
    }
}
