using Microsoft.EntityFrameworkCore;

namespace BlogBoutique.Models
{
    public class MyContext: MySecretContext
    {
        public DbSet<UserModel> User { get; set; }
        public DbSet<BlogModel> Blog { get; set; }
        public DbSet<BlogTypeModel> BlogType { get; set; }  
        public DbSet<BlogBlogTypeModel> BlogBlogType { get; set; }
        

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString,
               options => options.EnableRetryOnFailure());
        }

    }
}
