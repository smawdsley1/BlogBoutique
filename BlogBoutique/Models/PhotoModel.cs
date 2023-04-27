using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("Photo")]
    public class PhotoModel
    {
        [Key]
        public Int64 PhotoId { get; set; }
        [ForeignKey("Blog")]
        public Int64? BlogId { get; set; }
        public String? Url { get; set; } = null;
        public DateTime? DateCreated { get; set; } = null;
    }
}
