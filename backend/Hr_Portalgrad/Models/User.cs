using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Portalgrad.Models
{
    public class User 
    {
       
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
       public int Id { get; set; }
       
        [Required]
        [StringLength(250)]
       public string firstName { get; set; }
       
        [Required]
        [StringLength(250)]
        public string lastName { get; set; }
      
        [Required]
        [StringLength(250)]
        public string email { get; set; }
        
        [Required]
        [StringLength(250)]
        public string Passwords { get; set; }
        
        [Required]
        [StringLength(250)]
        public string userRole { get; set; }
        [StringLength(250)]
        public string phoneNumber { get; set; }
        [StringLength(250)]
        public string country { get; set; }
        [StringLength(250)]
        public string gender { get; set; }
        public string regDate { get; set; }
        public bool isCompanyVerified { get; set; }
        public List<Jobs> Jobs { get; set; }   
        public List<Applicants> Applicants { get; set; }
        public List<Files> File { get; set; }
        public List<Profile> Profile { get; set; }

    }
}
