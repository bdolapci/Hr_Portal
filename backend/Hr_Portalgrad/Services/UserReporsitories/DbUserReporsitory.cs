using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.UserReporsitories
{
    public class DbUserReporsitory : IUserReporsitory
    {
        private readonly AuthDBContext _context;

        public DbUserReporsitory(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<User> Create(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.email == email);
        }

        public async Task<User> GetById(int id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<List<User>> GetAllUser()
        {
          
            return await _context.Users.ToListAsync();
        }

        public async Task<User> UpdatetoHr(int id,string userRole)
        {
            var us=new User { Id=id,userRole = userRole };
            _context.Users.Attach(us);
            _context.Entry(us).Property(x => x.userRole).IsModified = true;
            await _context.SaveChangesAsync();
            return us;
        }
        public async Task<User> RemoveUser(int id)
        {
            var us=await _context.Users.FindAsync(id);
           _context.Users.Remove(us);
            await _context.SaveChangesAsync();
            return us;

        }
    }
}
