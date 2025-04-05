using DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SystemServices.Abstract;
using static BaseSystem.BaseEnum;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarsService _carsService;

        public CarController(ICarsService carsService)
        {
            _carsService = carsService;
        }

        [HttpGet("getlistcar")]
        public async Task<IActionResult> GetListCar()
        {
            var listCar = await _carsService.GetListCar();
            return Ok(listCar);
        }

        [HttpGet("getcarbyId")]
        public async Task<IActionResult> GetCarById(Guid carId)
        {
            var car = await _carsService.GetCarById(carId);
            return Ok(car);
        }

        [HttpPost("deletecar")]
        public async Task<IActionResult> DeleteCar(Guid carId)
        {
            var deleteResult = await _carsService.DeleteCar(carId);
            if (deleteResult == BaseResult.NullObject)
            {
                return StatusCode(StatusCodes.Status404NotFound);
            }
            if (deleteResult == BaseResult.Failed) {
                return BadRequest();
            }
            return Ok(deleteResult);
        }

        [HttpPost("createcar")]
        public async Task<IActionResult> CreateCar(CreateCarDTO dto)
        {
            var car = await _carsService.CreateCar(dto);
            return Ok(car);
        }

        [HttpPost("updatecar")]
        public async Task<IActionResult> UpdateCar(Guid id,CreateCarDTO dto)
        {
            var updateCar = await _carsService.UpdateCar(id, dto);
            return Ok(updateCar);
        }
    }
}
