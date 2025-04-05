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
    public interface IModelService
    {
        Task<BaseEnum.BaseResult> CreateModel(CreateOrUpdateModelDTO dto);
        Task<BaseEnum.BaseResult> DeleteModel(Guid id);
        Task<IEnumerable<Model>> GetListModel();
        Task<Model> GetModelById(Guid id);
        Task<BaseEnum.BaseResult> UpdateModel(Guid id, CreateOrUpdateModelDTO dto);
    }
}
