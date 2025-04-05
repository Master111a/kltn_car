using AutoMapper;
using DTOs;
using Entities.CarSalesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mapper
{
    public class CategoryMappings:Profile
    {
        public CategoryMappings() { 
            CreateMap<CreateOrUpdateCategoryDTO, Category>().ReverseMap();
        }
    }
}
