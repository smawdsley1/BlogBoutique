using Microsoft.EntityFrameworkCore;

namespace BlogBoutique.Models
{
    public class MySecretContext : DbContext
    {
        protected readonly string _connectionString = @"server=54.144.115.72;Initial Catalog = comp280_casey; User ID = casey; Password = C46$eyQAa; TrustServerCertificate=True";
    }
}
