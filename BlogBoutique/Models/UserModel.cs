using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("User")]
    public class UserModel
    {

        [Key]
        public Int64 UserId { get; set; }
        public String? Username { get; set; } = null;
        public String? FirstName { get; set; } = null;
        public String? LastName { get; set; } = null;
        public String? EmailAddress { get; set; } = null;
        public DateTime? DateCreated { get; set; } = null;
        public DateTime? DateModified { get; set; } = null;
        public String? Password { get; set; } = null;
    }
}
