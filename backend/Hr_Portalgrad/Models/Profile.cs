using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HR_Portalgrad.Models
{
    public class Profile
    {
       
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int Id { get; set; }
        [ForeignKey("FK_User")]
        [Required]
        public int Userid { get; set; }
        [StringLength(250)]
        public string about { get; set; }
        [StringLength(250)]
        public string experience { get; set; }
        [StringLength(250)]
        public string education { get; set; }
        [StringLength(250)]
        public string certification { get; set; }
        [StringLength(250)]
        public string photo { get; set; }
    }
}
