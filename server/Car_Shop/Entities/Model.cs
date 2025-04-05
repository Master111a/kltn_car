using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Runtime.ConstrainedExecution;

    namespace CarSalesApp.Models
    {
        [Table("Models")]
        public class Model
        {
            [Key]
            public Guid Id { get; set; }

            [Required]
            [StringLength(100)]
            public string Name { get; set; }

            public virtual ICollection<Car> Cars { get; set; }
        }
    }

}
