using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemServices.Abstract;
using static BaseSystem.BaseEnum;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;

        public BrandController(IBrandService brandService)
        {
            _brandService = brandService;
        }

        [HttpGet("getlistbrand")]
        public async Task<IActionResult> GetListBrand()
        {
            var result = await _brandService.GetListBrand();
            return Ok(result);
        }

        [HttpGet("getbrandbyId")]
        public async Task<IActionResult> GetBrandById(Guid id)
        {
            var result = _brandService.GetBrandById(id);
            return Ok(result);
        }

        [HttpPost("createbrand")]
        public async Task<IActionResult> CreateBrand(CreateOrUpdateBrandDTO dto)
        {
            var result = await _brandService.CreateBrand(dto);
            if (result == BaseResult.Failed)
            {
                return BadRequest();
            }
            return Ok(result);
        }

        [HttpPost("updatebrand")]
        public async Task<IActionResult> UpdateBrand(Guid id, CreateOrUpdateBrandDTO dto)
        {
            var result = await _brandService.UpdateBrand(id, dto);
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

        [HttpPost("deletebrand")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var result = await _brandService.DeleteBrand(id);
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
