using BlogBoutique.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("Blog")]
    public class BlogModel
    {
        public virtual List<BlogBlogTypeModel>? BlogBlogTypes { get; set; } = new List<BlogBlogTypeModel>();
        [Key]
        public Int64 BlogId { get; set; }
        [ForeignKey("User")]
        public Int64 UserId { get; set; }
        public String? Title { get; set; } = null;
        public String? Text { get; set; } = null;
        public Int64? Upvote { get; set; } = null;
        public DateTime? DateCreated { get; set; } = null;
        public DateTime? DateModified { get; set; } = null;
    }
}
