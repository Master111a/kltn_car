using ClosedXML.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using SystemServices.Abstract;

namespace APIController.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet("genarateorderhistory")]
        public async Task<IActionResult> GenarateOrderToExcel()
        {
            var tableData = await _orderService.GetTableData();
            string base64String = string.Empty;
            using (XLWorkbook wb = new XLWorkbook())
            {
                var sheet = wb.AddWorksheet(tableData, "Bill Record");
                sheet.Columns(1, 5).Style.Font.FontColor = XLColor.Black;
                using (MemoryStream ms = new MemoryStream())
                {
                    wb.SaveAs(ms);
                    base64String = Convert.ToBase64String(ms.ToArray());
                }
            }
            return new CreatedResult(string.Empty, new { Code = 200, Status = true, Message = "", Data = base64String });
        }
    }
}
