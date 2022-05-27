using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Portalgrad.Models
{
    public class Files
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [ForeignKey("FK_User")]
        [Required]
        public int Userid { get; set; }
        [ForeignKey("FK_Jobs")]
        [Required]
        public int Jobid { get; set; }
        [StringLength(250)]
        public string Name { get; set; }
        public string FileType { get; set; }
    }
}
