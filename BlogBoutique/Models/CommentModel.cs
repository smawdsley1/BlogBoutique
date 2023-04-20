using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("Comment")]
    public class CommentModel
    {
        [Key]
        public Int64 CommentId { get; set; }
        [ForeignKey("User")]
        public Int64? UserId { get; set; }
        [ForeignKey("Blog")]
        public Int64? BlogId { get; set; }
        public String? Text { get; set; } = null;
        public DateTime? DateCreated { get; set; } = null;
    }
}