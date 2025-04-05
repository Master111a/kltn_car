using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class ResponsePaymentDTO
    {
        public string OrderInfo { get; set; }
        public float Amount { get; set; }
        public string ResponseCode { get; set; }
    }
}
