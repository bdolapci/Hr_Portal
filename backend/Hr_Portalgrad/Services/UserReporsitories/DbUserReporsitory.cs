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
        public async Task<User> GetByEmailAsync(string email)
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

        public async Task<User> UpdatetoHr(int id, string Passwords, string firstName, string lastName, string userRole, string email)
        {

            var us = new User { Id = id, Passwords = Passwords, firstName = firstName, lastName = lastName, userRole = userRole, email = email };
            _context.Users.Attach(us);
            _context.Entry(us).Property(j => j.Id).IsModified = false;
            _context.Entry(us).Property(j => j.firstName).IsModified = false;
            _context.Entry(us).Property(j => j.lastName).IsModified = false;
            _context.Entry(us).Property(j => j.email).IsModified = false;
            _context.Entry(us).Property(x => x.Passwords).IsModified = false;
            _context.Entry(us).Property(x => x.userRole).IsModified = true;
            await _context.SaveChangesAsync();
            return us;
        }
        public async Task<User> RemoveUser(int id)
        {
            var us=await _context.Users.FindAsync(id);
            var us2 =await _context.Applicants.FirstOrDefaultAsync(u=>u.UserId==id);
           _context.Users.Remove(us);
            if (us2 != null)
            {
                _context.Applicants.Remove(us2);
            }
            
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
            

            await _context.SaveChangesAsync();
            return us;
        }   
        public async Task<IEnumerable> GetUserProfile()
        {
            var us = await (from p in _context.Users
                            join p2 in _context.profiles
                            on p.Id equals p2.Userid
                            select new
                            {
                                p.firstName,
                                p.lastName,
                                p.phoneNumber,
                                p.country,
                                p.gender,
                                p2.Id,
                                p2.Userid
                            }).ToListAsync();
            await _context.SaveChangesAsync();
            return us;
        }
    
        public async Task<User> ChangePassword(int id, string Passwords,string firstName,string lastName,string userRole,string email)
        {
            var us = new User { Id = id, Passwords = Passwords ,firstName=firstName,lastName=lastName,userRole=userRole,email=email };
            _context.Users.Attach(us);
            _context.Entry(us).Property(j => j.Id).IsModified = false;
            _context.Entry(us).Property(j => j.firstName).IsModified = false;
            _context.Entry(us).Property(j => j.lastName).IsModified = false;
            _context.Entry(us).Property(j => j.userRole).IsModified = false;
            _context.Entry(us).Property(j => j.email).IsModified = false;
            _context.Entry(us).Property(x => x.Passwords).IsModified = true;

            await _context.SaveChangesAsync();
            return us;
        }

        public async Task<User> EditUserCountry(int id, string firstName, string lastName, string email, string Passwords, string userRole, string country)
        {
            var user = new User { Id = id, firstName = firstName, lastName = lastName, email = email, Passwords = Passwords, userRole = userRole, country = country };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
         
            _context.Entry(user).Property(j => j.firstName).IsModified = false;
            _context.Entry(user).Property(j => j.lastName).IsModified = false;
            _context.Entry(user).Property(j => j.email).IsModified = false;
            _context.Entry(user).Property(j => j.Passwords).IsModified = false;
            _context.Entry(user).Property(j => j.userRole).IsModified = false;
            _context.Entry(user).Property(j => j.country).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> EditUserPhone(int id, string phone)
        {
            var user = new User { Id = id, phoneNumber = phone };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
            _context.Entry(user).Property(j => j.phoneNumber).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<User> EditUserGender(int id,string firstName,string lastName,string email,string Passwords,string userRole, string gender)
        {
            var user = new User { Id = id,firstName=firstName,lastName=lastName,email=email,Passwords=Passwords,userRole=userRole, gender = gender };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
            _context.Entry(user).Property(j => j.firstName).IsModified = false;
            _context.Entry(user).Property(j => j.lastName).IsModified = false;
            _context.Entry(user).Property(j => j.email).IsModified = false;
            _context.Entry(user).Property(j => j.Passwords).IsModified = false;
            _context.Entry(user).Property(j => j.userRole).IsModified = false;
            _context.Entry(user).Property(j => j.gender).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> EditUserPhone(int id, string firstName, string lastName, string email, string Passwords, string userRole, string phoneNumber)
        {
            var user = new User { Id = id, firstName = firstName, lastName = lastName, email = email, Passwords = Passwords, userRole = userRole, phoneNumber = phoneNumber };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
            _context.Entry(user).Property(j => j.firstName).IsModified = false;
            _context.Entry(user).Property(j => j.lastName).IsModified = false;
            _context.Entry(user).Property(j => j.email).IsModified = false;
            _context.Entry(user).Property(j => j.Passwords).IsModified = false;
            _context.Entry(user).Property(j => j.userRole).IsModified = false;
            _context.Entry(user).Property(j => j.phoneNumber).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> EditEmailValid(int id, string firstName, string lastName, string email, string Passwords, string userRole, string regDate)
        {
            var user = new User { Id = id, firstName = firstName, lastName = lastName, email = email, Passwords = Passwords, userRole = userRole, regDate = regDate };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
            _context.Entry(user).Property(j => j.firstName).IsModified = false;
            _context.Entry(user).Property(j => j.lastName).IsModified = false;
            _context.Entry(user).Property(j => j.email).IsModified = false;
            _context.Entry(user).Property(j => j.Passwords).IsModified = false;
            _context.Entry(user).Property(j => j.userRole).IsModified = false;
            _context.Entry(user).Property(j => j.regDate).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> EditVerifyCompany(int id, string firstName, string lastName, string email, string Passwords, string userRole,bool isCompanyVerified)
        {
            var user = new User { Id = id, firstName = firstName, lastName = lastName, email = email, Passwords = Passwords, userRole = userRole, isCompanyVerified = true };
            _context.Users.Attach(user);
            _context.Entry(user).Property(j => j.Id).IsModified = false;
            _context.Entry(user).Property(j => j.firstName).IsModified = false;
            _context.Entry(user).Property(j => j.lastName).IsModified = false;
            _context.Entry(user).Property(j => j.email).IsModified = false;
            _context.Entry(user).Property(j => j.Passwords).IsModified = false;
            _context.Entry(user).Property(j => j.userRole).IsModified = false;
            _context.Entry(user).Property(j => j.isCompanyVerified).IsModified = true;
            await _context.SaveChangesAsync();
            return user;
        }
    }
}
