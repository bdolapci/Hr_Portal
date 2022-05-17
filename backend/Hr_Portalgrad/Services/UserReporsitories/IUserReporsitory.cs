using HR_Portalgrad.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.UserReporsitories
{
    public interface IUserReporsitory
    {
        Task<User> GetByEmail(string email);
        Task<User> GetByEmailAsync(string email);
        Task<User> Create(User user);

        Task<User> GetById(int id);

        Task<List<User>> GetAllUser();

        Task<User> UpdatetoHr(int id,string userRole);

        Task<User> RemoveUser(int id);

        Task <IEnumerable> GetApplicantsbyUser();
        Task<User> ChangePassword(int id, string Passwords, string firstName, string lastName, string userRole, string email);
        
      
    }
}
