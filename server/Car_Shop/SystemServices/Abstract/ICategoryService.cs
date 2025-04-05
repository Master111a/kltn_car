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
    public interface ICategoryService
    {
        Task<BaseEnum.BaseResult> CreateCategory(CreateOrUpdateCategoryDTO dto);
        Task<BaseEnum.BaseResult> DeleteCategory(Guid id);
        Task<Category> GetCategoryById(Guid id);
        Task<IEnumerable<Category>> GetListCategory();
        Task<BaseEnum.BaseResult> UpdateCategory(Guid id, CreateOrUpdateCategoryDTO dto);
    }
}
