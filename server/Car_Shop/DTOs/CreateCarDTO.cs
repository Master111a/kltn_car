using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs
{
    public class CreateCarDTO
    {
        public string Name { get; set; }

        public decimal Price { get; set; }

        public string Description { get; set; }

        public int Year { get; set; }

        public string Color { get; set; }

        public string EngineType { get; set; }

        public string Transmission { get; set; }
        public string Image { get; set; }
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
        public string ModelName { get; set; }

    }
}
