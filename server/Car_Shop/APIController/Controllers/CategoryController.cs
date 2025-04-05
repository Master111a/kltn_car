using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemServices.Abstract;
using static BaseSystem.BaseEnum;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("getlistcategory")]
        public async Task<IActionResult> GetListCategory()
        {
            var result = await _categoryService.GetListCategory();
            return Ok(result);
        }

        [HttpGet("getcategorybyId")]
        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var result = _categoryService.GetCategoryById(id);
            return Ok(result);
        }

        [HttpPost("createcategory")]
        public async Task<IActionResult> CreateCategory(CreateOrUpdateCategoryDTO dto)
        {
            var result = await _categoryService.CreateCategory(dto);
            if (result == BaseResult.Failed)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("updatecategory")]
        public async Task<IActionResult> UpdateCategory(Guid id, CreateOrUpdateCategoryDTO dto)
        {
            var result = await _categoryService.UpdateCategory(id, dto);
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

        [HttpPost("deletecategory")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result = await _categoryService.DeleteCategory(id);
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
