using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SSBOL;
using System;

namespace SSDAL
{
    public class SSDbContext : IdentityDbContext
    {
        //public SSDbContext(DbContextOptions<SSDbContext> options) : base(options)
        //{
        //    Database.Migrate();
        //}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server=DESKTOP-2HQVQT3\\SQLEXPRESS;Database=SSDb;Trusted_Connection=True;");
        }
        public DbSet<Story> Stories { get; set; }
    }

}