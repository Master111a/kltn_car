using AutoMapper;
using Entities;
using Repository.Abstract;
using Repository.Implement;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SystemServices.Abstract;

namespace SystemServices.Implement
{
    public class OrderService : IOrderService
    {
        private readonly IRepository<Order> _orderRepository;
        private readonly IRepository<OrderDetail> _orderDetailRepository;
        private readonly IMapper _mapper;
        private readonly IRepository<User> _userRepository;

        public OrderService(IRepository<Order> orderRepository, IRepository<OrderDetail> orderDetailRepository,IMapper mapper, IRepository<User> userRepository)
        {
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        public async Task<DataTable> GetTableData()
        {
            DataTable table = new DataTable();
            table.Columns.Add("BillId", typeof(Guid));
            table.Columns.Add("Account", typeof(string));
            table.Columns.Add("Payment Date", typeof(DateTime));
            table.Columns.Add("Bill Description", typeof(string));
            table.Columns.Add("Cost", typeof(float));

            var listBill = await _orderRepository.GetDataIncludeAsync(null, x => x.OrderDetails);
            if (listBill.ToList().Count > 0)
            {
                foreach (var item in listBill.ToList())
                {
                    var cost = 0;
                    foreach (var item2 in item.OrderDetails)
                    {
                        cost = (int)item2.Price * item2.Quantity;
                    }
                    var user = await _userRepository.GetObjectByCondition(x => x.Id.Equals(item.CustomerId));
                    table.Rows.Add(item.Id, user.UserName, item.OrderDate, cost);
                }
            }
            return table;
        }
    }
}
