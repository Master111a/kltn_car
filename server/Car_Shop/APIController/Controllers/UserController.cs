using CommonServices.Abstract;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace APIController.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserServices userServices;

        public UserController(IUserServices userServices)
        {
            this.userServices = userServices;
        }
        [AllowAnonymous]
        [HttpPost("CreateUserAccount")]
        public async Task<IActionResult> CreateUserAccount(CreateUserDTO userDTO)
        {
            var result = await userServices.CreateAccount(userDTO);
            if (result == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            return StatusCode(StatusCodes.Status201Created, result);
        }
    }
}
