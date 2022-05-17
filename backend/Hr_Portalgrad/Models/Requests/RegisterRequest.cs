﻿using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Portalgrad.Models.Requests
{
    public class RegisterRequest 
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
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
        public string country { get; set; }
        public string gender { get; set; }
        public string phoneNumber { get; set; }
        public int isEmailValid { get; set; }
    }
}
