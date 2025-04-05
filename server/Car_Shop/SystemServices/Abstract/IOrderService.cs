using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SystemServices.Abstract
{
    public interface IOrderService
    {
        Task<DataTable> GetTableData();
    }
}
