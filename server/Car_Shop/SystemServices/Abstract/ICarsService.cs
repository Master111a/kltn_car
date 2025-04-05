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
    public interface ICarsService
    {
        Task<BaseEnum.BaseResult> CreateCar(CreateCarDTO dto);
        Task<BaseEnum.BaseResult> DeleteCar(Guid carId);
        Task<Car> GetCarById(Guid carId);
        Task<IEnumerable<Car>> GetListCar();
        Task<BaseEnum.BaseResult> UpdateCar(Guid carId, CreateCarDTO dto);
    }
}
