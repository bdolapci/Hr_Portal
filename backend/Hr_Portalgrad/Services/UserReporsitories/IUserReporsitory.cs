using HR_Portalgrad.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using HR_Portalgrad.Models.Requests;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
namespace HR_Portalgrad.Services.UserReporsitories
{
    public interface IUserReporsitory
    {
        Task<User> GetByEmail(string email);
        Task<User> GetByEmailAsync(string email);
        Task<User> Create(User user);

        Task<User> GetById(int id);

        Task<List<User>> GetAllUser();

        Task<User> UpdatetoHr(int id, string Passwords, string firstName, string lastName, string userRole, string email);

        Task<User> RemoveUser(int id);

        Task <IEnumerable> GetApplicantsbyUser();
        Task<IEnumerable> GetUserProfile();
        Task<User> ChangePassword(int id, string Passwords, string firstName, string lastName, string userRole, string email);
        Task<User> EditUserCountry(int id, string firstName, string lastName, string email, string Passwords, string userRole, string country);
        Task<User> EditUserPhone(int id, string firstName, string lastName, string email, string Passwords, string userRole,string phone);
        Task<User> EditUserGender(int id,string firstName,string lastName,string email,string Passwords,string userRole,string gender);
        Task<User> EditEmailValid(int id, string firstName, string lastName, string email, string Passwords, string userRole, string regDate);
        Task<User> EditVerifyCompany(int id, string firstName, string lastName, string email, string Passwords, string userRole, bool verifyCompany);
    }
}
