using BlogBoutique.Models;
using Microsoft.EntityFrameworkCore;

namespace BlogBoutique.Models
{
    public class MyContext : MySecretContext
    {
        public DbSet<UserModel> User { get; set; }
        public DbSet<BlogModel> Blog { get; set; }
        public DbSet<BlogTypeModel> BlogType { get; set; }
        public DbSet<BlogBlogTypeModel> BlogBlogType { get; set; }
        public DbSet<PhotoModel> Photo { get; set; }
        public DbSet<CommentModel> Comment { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString,
                options => options.EnableRetryOnFailure());
            // optionsBuilder.LogTo(Console.WriteLine);
            // base.OnConfiguring(optionsBuilder);
        }
    }
}
