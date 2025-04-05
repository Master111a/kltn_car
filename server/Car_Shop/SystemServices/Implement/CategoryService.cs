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
    public class CategoryService : ICategoryService
    {
        private readonly IRepository<Category> _CategoryRepository;
        private readonly IMapper _mapper;

        public CategoryService(IRepository<Category> categoryRepository, IMapper mapper)
        {
            _CategoryRepository = categoryRepository;
            _mapper = mapper;
        }

        public async Task<BaseResult> CreateCategory(CreateOrUpdateCategoryDTO dto)
        {
            try
            {
                var createCategory = _mapper.Map<Category>(dto);
                createCategory.Id = Guid.NewGuid();
                _CategoryRepository.Create(createCategory);
                await _CategoryRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }

        }

        public async Task<BaseResult> UpdateCategory(Guid id, CreateOrUpdateCategoryDTO dto)
        {
            try
            {
                var updateCar = await _CategoryRepository.GetObjectByCondition(x => x.Id.Equals(id));
                if (updateCar == null)
                {
                    return BaseResult.NullObject;
                }
                updateCar = _mapper.Map(dto, updateCar);
                _CategoryRepository.Update(updateCar);
                await _CategoryRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }

        }

        public async Task<IEnumerable<Category>> GetListCategory()
        {
            var listCategory = await _CategoryRepository.GetDataIncludeAsync(null);
            return listCategory;
        }

        public async Task<Category> GetCategoryById(Guid id)
        {
            var Category = await _CategoryRepository.GetObjectByCondition(x => x.Id == id);
            return Category;
        }

        public async Task<BaseResult> DeleteCategory(Guid id)
        {
            var Category = await _CategoryRepository.GetObjectByCondition(x => x.Id == id);
            if (Category == null)
            {
                return BaseResult.NullObject;
            }
            _CategoryRepository.Delete(Category);
            return BaseResult.Success;
        }
    }
}
