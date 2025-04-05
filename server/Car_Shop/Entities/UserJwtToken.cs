using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    [Table("UserJwtToken")]
    public class UserJwtToken
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public string AccessToken { get; set; }
        [Required]
        public DateTime ExpriredAccesToken { get; set; }
        [Required]
        public string RefresherToken { get; set; }
        [Required]
        public DateTime ExpiredRefreshToken { get; set; }
        [Required]
        public Guid UserId { get; set; }
        [Required]
        public Boolean IsLocked { get; set; }

        [ForeignKey(nameof(UserId))]
        public virtual User? User { get; set; }

    }
}
