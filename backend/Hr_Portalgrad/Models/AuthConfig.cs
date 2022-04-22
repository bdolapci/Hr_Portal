using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HR_Portalgrad.Models
{
    public class AuthConfig 
    {
       public string AccessTokenSecret { get; set; }
        public int AccessTokenExpirationDay { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }

       
        
    }
}
