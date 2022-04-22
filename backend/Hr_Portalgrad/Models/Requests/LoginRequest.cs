using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace HR_Portalgrad.Models.Requests
{
    public class LoginRequest 
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

      
    }
}
