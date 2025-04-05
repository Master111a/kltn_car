using Entities;
using Entities.CarSalesApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Table("OrderDetails")]
    public class OrderDetail
    {
        [Key]
        public Guid Id { get; set; }

        public Guid CarId { get; set; }
        public virtual Car Car { get; set; }

        public Guid OrderId { get; set; }
        public virtual Order Order { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
