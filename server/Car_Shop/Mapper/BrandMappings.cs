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
    public class BrandMappings: Profile
    {
        public BrandMappings() {
            CreateMap<Brand,CreateOrUpdateBrandDTO>().ReverseMap();
        }
    }
}
