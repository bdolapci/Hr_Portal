using Microsoft.AspNetCore.Mvc;
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
        public string regDate { get; set; }
        public string education { get; set; }
        public string experience { get; set; }
        public string linkedin { get; set; }
        public string facebook { get; set; }
        public string website { get; set; }
        public bool isCompanyVerified { get; set; }

    }
}
