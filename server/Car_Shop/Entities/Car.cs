using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using static Org.BouncyCastle.Asn1.Cmp.Challenge;

    namespace CarSalesApp.Models
    {
        [Table("Cars")]
        public class Car
        {
            [Key]
            public Guid Id { get; set; }

            [Required]
            [StringLength(255)]
            public string Name { get; set; }

            [Required]
            public decimal Price { get; set; }

            [Required]
            public string Description { get; set; }

            [Required]
            public int Year { get; set; } 

            [Required]
            public string Color { get; set; }

            [Required]
            public string EngineType { get; set; }

            [Required]
            public string Transmission { get; set; }
            [Required]
            public string Image { get; set; }

            public Guid BrandId { get; set; }
            [ForeignKey(nameof(BrandId))]
            public virtual Brand Brand { get; set; }

            public Guid ModelId { get; set; }
            [ForeignKey(nameof(ModelId))]
            public virtual Model Model { get; set; }

            public Guid CategoryId { get; set; }
            [ForeignKey(nameof(Id))]
            public virtual Category Categories { get; set; }

        }
    }

}
