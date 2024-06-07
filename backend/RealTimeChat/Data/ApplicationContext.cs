using Microsoft.EntityFrameworkCore;
using RealTimeChat.Models;

namespace RealTimeChat.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }

        public DbSet<UserConnection> UserConnections { get; set; }
    }
}
