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
    public class ModelService : IModelService
    {
        private readonly IRepository<Model> _modelRepository;
        private readonly IMapper _mapper;

        public ModelService(IRepository<Model> modelRepository, IMapper mapper)
        {
            _modelRepository = modelRepository;
            _mapper = mapper;
        }

        public async Task<BaseResult> CreateModel(CreateOrUpdateModelDTO dto)
        {
            try
            {
                var createModel = _mapper.Map<Model>(dto);
                createModel.Id = Guid.NewGuid();
                _modelRepository.Create(createModel);
                await _modelRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }

        }

        public async Task<BaseResult> UpdateModel(Guid id, CreateOrUpdateModelDTO dto)
        {
            try
            {
                var updateCar = await _modelRepository.GetObjectByCondition(x => x.Id.Equals(id));
                if (updateCar == null)
                {
                    return BaseResult.NullObject;
                }
                updateCar = _mapper.Map(dto, updateCar);
                _modelRepository.Update(updateCar);
                await _modelRepository.CommitChangeAsync();
                return BaseResult.Success;
            }
            catch (Exception)
            {

                return BaseResult.Failed;
            }

        }

        public async Task<IEnumerable<Model>> GetListModel()
        {
            var listModel = await _modelRepository.GetDataIncludeAsync(null);
            return listModel;
        }

        public async Task<Model> GetModelById(Guid id)
        {
            var Model = await _modelRepository.GetObjectByCondition(x => x.Id == id);
            return Model;
        }

        public async Task<BaseResult> DeleteModel(Guid id)
        {
            var Model = await _modelRepository.GetObjectByCondition(x => x.Id == id);
            if (Model == null)
            {
                return BaseResult.NullObject;
            }
            _modelRepository.Delete(Model);
            return BaseResult.Success;
        }
    }
}
