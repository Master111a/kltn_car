using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CommonServices.Payment
{
    public interface IPaymentService
    {
        public string CreateUrlPayMoney(float money, Guid userId);
        //Task<bool> SaveResponsePayment(ResponsePaymentDTO responsePaymentDto);
    }
}
