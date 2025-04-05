using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Entities.CarSalesApp.Models;

namespace Database
{
    public class CarShopDBContext : DbContext
    {
        public CarShopDBContext()
        {
        }

        public CarShopDBContext(DbContextOptions options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<UserJwtToken> UserJwtTokens { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Enable indexing for faster queries
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
                
            modelBuilder.Entity<UserJwtToken>()
                .HasIndex(t => t.UserId);
        }

    }
}
