
using Microsoft.EntityFrameworkCore;

namespace HR_Portalgrad.Models
{
    public class AuthDBContext :DbContext
    {


        public AuthDBContext(DbContextOptions<AuthDBContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }  
        public DbSet<Jobs> Jobs { get; set; }
        public DbSet<Applicants> Applicants { get; set; }
        public DbSet<Profile> profiles { get; set; }
        public DbSet<Files> files { get; set; }

        //public DbSet<Jobs> Jobs { get; set; }
    }
}
