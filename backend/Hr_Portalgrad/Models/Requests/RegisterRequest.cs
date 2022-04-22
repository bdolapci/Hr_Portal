using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace HR_Portalgrad.Models.Requests
{
    public class RegisterRequest 
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Passwords { get; set; }
        
        [Required]
        public string confirmPassword { get; set; }

        public string userRole { get; set; }
        public bool isApplicant { get; set; }
    }
}
