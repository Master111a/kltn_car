using AutoMapper;
using DTOs;
using Entities.CarSalesApp.Models;
using Microsoft.EntityFrameworkCore.Migrations;
using Repository.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemServices.Abstract;
using static BaseSystem.BaseEnum;

namespace SystemServices.Implement
{
    public class CarsService : ICarsService
    {
        private readonly IRepository<Car> _carRepository;
        private readonly IMapper _mapper;

        public CarsService(IRepository<Car> carRepository, IMapper mapper)
        {
            _carRepository = carRepository;
            _mapper = mapper;
        }

        public async Task<BaseResult> CreateCar(CreateCarDTO dto)
        {
            try
            {
                var carMap = _mapper.Map<Car>(dto);
                carMap.Id = Guid.NewGuid();
                var brand = new Brand()
                {
                    Id = Guid.NewGuid(),
                    Name = dto.BrandName,
                };
                var category = new Category()
                {
                    Id = Guid.NewGuid(),
                    Name = dto.CategoryName,
                };
                var model = new Model()
                {
                    Id = Guid.NewGuid(),
                    Name = dto.Name,
                };
                carMap.Brand = brand;
                carMap.Categories = category;
                carMap.Model = model;
                _carRepository.Create(carMap);
                _carRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {
                return BaseResult.Failed;
            }
            
        }

        public async Task<BaseResult> UpdateCar(Guid carId,CreateCarDTO dto)
        {
            try
            {
                var updateCar = _carRepository.GetObjectByCondition(x => x.Id.Equals(carId));
                if (updateCar == null) { 
                    return BaseResult.Failed;
                }

                await _mapper.Map(dto, updateCar);
                _carRepository.Update(updateCar.Result);
               await _carRepository.CommitChangeAsync();
                return BaseResult.Success;

            }
            catch (Exception)
            {
                return BaseResult.Failed;
            }
        }

        public async Task<BaseResult> DeleteCar(Guid carId)
        {
            try
            {
                var car = await _carRepository.GetObjectByCondition(x => x.Id.Equals(carId));
                if (car == null)
                {
                    return BaseResult.NullObject;
                }
                _carRepository.Delete(car);
                _carRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

            }return BaseResult.Failed;
            
        }

        public async Task<IEnumerable<Car>> GetListCar()
        {
            var carlist = await _carRepository.GetDataIncludeAsync(null, x => x.Brand, y => y.Categories, z => z.Model);
            return carlist.ToList();
        }

        public async Task<Car> GetCarById(Guid carId)
        {
            var car = await _carRepository.GetDataIncludeAsync(x => x.Id.Equals(carId), x => x.Brand, y => y.Categories, z => z.Model);
            return car.First();
        }

        
    }
}
