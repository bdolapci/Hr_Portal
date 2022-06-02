using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace HR_Portalgrad.Models
{
    public class Applicants
    {
        
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [ForeignKey("FK_User")]
        public int? UserId { get; set; }
        [ForeignKey("FK_Jobs")]
        [Required]
        public int Jobsid { get; set; }
        [ForeignKey("FK_Profile")]
        public int? ProfileId { get; set; }
        public int isAccepted { get; set; }
        public int isExtraDocumentRequested { get; set; }
    }
}
