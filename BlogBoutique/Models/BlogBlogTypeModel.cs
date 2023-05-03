using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;

namespace BlogBoutique.Models
{
    [Table("BlogBlogType")]
    public class BlogBlogTypeModel
    {
        public virtual BlogTypeModel? BlogType { get; set; }
        [JsonIgnore]
        public virtual BlogModel? Blog { get; set; }

        [Key]
        public Int64 BlogBlogTypeId { get; set; }

        [ForeignKey("Blog")]
        public Int64? BlogId { get; set; }

        [ForeignKey("BlogType")]
        public Int64? BlogTypeId { get; set; }
    }
}
