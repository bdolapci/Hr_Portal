//using HR_Portalgrad.Models;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;

//namespace HR_Portalgrad.Services.UserReporsitories
//{
//    public class InMemoryUserReporsitory : IUserReporsitory
//    {
//        private readonly List<User> _users = new List<User>();
//        public Task<User> Create(User user)
//        {
//           // user.Id = int.
//            _users.Add(user);
//            return Task.FromResult(user);
//        }

//        public Task<User> GetByEmail(string email)
//        {
//            return Task.FromResult(_users.FirstOrDefault(u => u.email == email));
//        }

//        public Task<User> GetById(int id)
//        {
//            throw new NotImplementedException();
//        }
//    }
//}
