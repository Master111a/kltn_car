using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Table("Account")]
    public class User
    {
        [Key]
        public Guid Id { get; set; }
        [Required]
        public int RoleId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public bool Gender { get; set; }
        [Required]
        public string Avatar { get; set; }
        [Required]
        public bool Verify { get; set; }
        [Required]
        public bool Enable { get; set; }
    }
}
