using AutoMapper;
using DTOs;
using Entities.CarSalesApp.Models;
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
    public class BrandService: IBrandService
    {
        private readonly IRepository<Brand> _brandRepository;
        private readonly IMapper _mapper;

        public BrandService(IRepository<Brand> brandRepository, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }

        public async Task<BaseResult> CreateBrand(CreateOrUpdateBrandDTO dto)
        {
            try
            {
                var createBrand = _mapper.Map<Brand>(dto);
                createBrand.Id = Guid.NewGuid();
                _brandRepository.Create(createBrand);
                await _brandRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }
            
        }

        public async Task<BaseResult> UpdateBrand(Guid id, CreateOrUpdateBrandDTO dto)
        {
            try
            {
                var updateCar = await _brandRepository.GetObjectByCondition(x => x.Id.Equals(id));
                if (updateCar == null)
                {
                    return BaseResult.NullObject;
                }
                updateCar = _mapper.Map(dto, updateCar);
                _brandRepository.Update(updateCar);
                await _brandRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }
            
        }

        public async Task<IEnumerable<Brand>> GetListBrand()
        {
            var listbrand = await _brandRepository.GetDataIncludeAsync(null);
            return listbrand;
        }

        public async Task<Brand> GetBrandById(Guid id)
        {
            var brand = await _brandRepository.GetObjectByCondition(x => x.Id == id);
            return brand;
        }

        public async Task<BaseResult> DeleteBrand(Guid id)
        {
            var brand = await _brandRepository.GetObjectByCondition(x => x.Id == id);
            if(brand == null)
            {
                return BaseResult.NullObject;
            }
            _brandRepository.Delete(brand);
            return BaseResult.Success;
        }

    }
}
