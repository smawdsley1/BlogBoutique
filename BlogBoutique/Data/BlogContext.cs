using Microsoft.EntityFrameworkCore;

namespace BlogBoutique;

public class BlogContext: DbContext
{
    public BlogContext(DbContextOptions<BlogContext> options) : base(options)
    {
    }

}

