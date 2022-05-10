using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
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
            var us2 =await _context.Applicants.FirstOrDefaultAsync(u=>u.UserId==id);
           _context.Users.Remove(us);
            _context.Applicants.Remove(us2);
            await _context.SaveChangesAsync();
            return us;

        }
        public async Task<IEnumerable> GetApplicantsbyUser()
        {

            var us = await (from p in _context.Users
                            join p2 in _context.Applicants
                            on p.Id equals p2.UserId
                            select new
                            {
                                p.email,
                                p.userRole,
                                p.firstName,
                                p.lastName,
                                p2.isAccepted,
                                p2.Jobsid,
                                p2.Id,
                                p2.UserId,
                                p2.ProfileId
                            }).ToListAsync();
            //var us2 = new Applicants { UserId=id, isAccepted = isAccepted };
            //var us3 = await _context.Jobs.Where(u=>u.UserId == id).FirstOrDefaultAsync();
            //var us = await _context.Users.FindAsync(id);


            //await _context.Applicants.Where(u => u.UserId == id).SingleOrDefaultAsync();
            //_context.Applicants.Attach(us2);
            //_context.Entry(us2).Property(x => x.isAccepted).IsModified = true;

            await _context.SaveChangesAsync();
            return us;
        }   
    
        public async Task<User> ChangePassword(int id, string Passwords,string firstName,string lastName,string userRole,string email)
        {
            var us = new User { Id = id, Passwords = Passwords ,firstName=firstName,lastName=lastName,userRole=userRole,email=email };
            _context.Users.Attach(us);
            _context.Entry(us).Property(j => j.firstName).IsModified = false;
            _context.Entry(us).Property(j => j.lastName).IsModified = false;
            _context.Entry(us).Property(j => j.userRole).IsModified = false;
            _context.Entry(us).Property(j => j.email).IsModified = false;
            _context.Entry(us).Property(x => x.Passwords).IsModified = true;

            await _context.SaveChangesAsync();
            return us;
        }
    }
}
