using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Portalgrad.Models
{
    public class Jobs
    {
       
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [Required]
        [ForeignKey("FK_User")]
        public int UserId { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        [StringLength(250)]
        public string Date { get; set; }
        [StringLength(500)]
        public string description { get; set; }
        [StringLength(250)]
        public string category { get; set; }
        [StringLength(500)]
        public string photo { get; set; }
        public List<Applicants> Applicants { get; set; }
        public List<File> File { get; set; }
    }
}
