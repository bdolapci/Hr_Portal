using Microsoft.AspNetCore.Mvc;
using System;

namespace HR_Portalgrad.Models
{
    public class User
    {
       public int Id { get; set; }
       public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string Passwords { get; set; }
        public string userRole { get; set; }
      //  public string country { get; set; }
      // public string phoneNumber { get; set; }

    }
}
