using CountryDemo.Server.Entities;
using Microsoft.EntityFrameworkCore;

namespace CountryDemo.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Country> Countries { get; set; }
        public DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Country>()
                .HasMany(c => c.States)
                .WithOne(s => s.Country)
                .HasForeignKey(s => s.CountryId);
        }
    }
}
