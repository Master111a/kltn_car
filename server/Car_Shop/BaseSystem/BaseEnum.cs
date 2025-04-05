using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BaseSystem
{
    public class BaseEnum
    {
        public enum BaseResult
        {
            Success,
            Failed,
            NullObject
        }
        public enum RoleEnum
        {
            Admin,
            Seller,
            Customer,
        }
    }
}
