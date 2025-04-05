using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemServices.Abstract;
using static BaseSystem.BaseEnum;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        private readonly IModelService _modelService;

        public ModelController(IModelService modelService)
        {
            _modelService = modelService;
        }

        [HttpGet("getlistmodel")]
        public async Task<IActionResult> GetListModel()
        {
            var result = await _modelService.GetListModel();
            return Ok(result);
        }

        [HttpGet("getmodelbyId")]
        public async Task<IActionResult> GetModelById(Guid id)
        {
            var result = _modelService.GetModelById(id);
            return Ok(result);
        }

        [HttpPost("createmodel")]
        public async Task<IActionResult> CreateModel(CreateOrUpdateModelDTO dto)
        {
            var result = await _modelService.CreateModel(dto);
            if (result == BaseResult.Failed)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("updatemodel")]
        public async Task<IActionResult> UpdateModel(Guid id, CreateOrUpdateModelDTO dto)
        {
            var result = await _modelService.UpdateModel(id, dto);
            if (result == BaseResult.Failed)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            if (result == BaseResult.Failed)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("deletemodel")]
        public async Task<IActionResult> DeleteModel(Guid id)
        {
            var result = await _modelService.DeleteModel(id);
            if (result == BaseResult.Failed)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            if (result == BaseResult.Failed)
            {
                return BadRequest();
            }
            return Ok(result);
        }
    }
}
