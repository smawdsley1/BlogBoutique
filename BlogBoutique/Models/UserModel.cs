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
        public String? Username { get; set; }
        public String? FirstName { get; set; }
        public String? LastName { get; set; }
        public String? EmailAddress { get; set; }
        public String? Password { get; set; }
    }
}
