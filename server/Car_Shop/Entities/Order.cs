using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Table("Orders")]
    public class Order
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        public Guid CustomerId { get; set; }
        public virtual User Customer { get; set; }

        public virtual ICollection<OrderDetail> OrderDetails { get; set; }

    }
}
