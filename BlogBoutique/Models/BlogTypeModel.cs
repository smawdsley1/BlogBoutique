using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("BlogType")]
    public class BlogTypeModel
    {
        [Key]
        public Int64 BlogTypeId { get; set; }
        public String? Name { get; set; } = null;
    }
}
