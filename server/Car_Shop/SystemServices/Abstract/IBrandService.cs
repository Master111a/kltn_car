using BaseSystem;
using DTOs;
using Entities.CarSalesApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SystemServices.Abstract
{
    public interface IBrandService
    {
        Task<BaseEnum.BaseResult> CreateBrand(CreateOrUpdateBrandDTO dto);
        Task<BaseEnum.BaseResult> DeleteBrand(Guid id);
        Task<Brand> GetBrandById(Guid id);
        Task<IEnumerable<Brand>> GetListBrand();
        Task<BaseEnum.BaseResult> UpdateBrand(Guid id, CreateOrUpdateBrandDTO dto);
    }
}
