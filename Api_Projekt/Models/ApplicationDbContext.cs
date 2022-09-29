using Microsoft.EntityFrameworkCore;

namespace Api_Projekt.Models
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Asteroid>? Asteroids { get; set; }
    }
}
