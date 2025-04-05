using CommonServices.Extensions;
using CommonServices.Payment;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        private readonly IHttpContextAccessor _context;
        public PaymentController(IPaymentService paymentService, IHttpContextAccessor context)
        {
            _paymentService = paymentService;
            _context = context;
        }

        [Authorize]
        [HttpGet("geturlpayment")]
        public string GetUrlPayment(float money)
        {
            var userId = _context.HttpContext.GetUserId();
            var result = _paymentService.CreateUrlPayMoney(money, Guid.Parse(userId));
            return result;
        }

        [HttpGet("pay-return")]
        public ResponsePayment TestResponse([FromQuery] ResponsePayment test)
        {
            return test;
        }

        //[Authorize]
        //[HttpPost("saveresponsepayment")]
        //public async Task<bool> SaveResponse(ResponsePaymentDTO responsePayment)
        //{
        //    var result = await _paymentService.SaveResponsePayment(responsePayment);
        //    return result;
        //}
    }
}
