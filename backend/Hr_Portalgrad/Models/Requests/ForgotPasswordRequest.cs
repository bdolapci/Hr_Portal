using System.ComponentModel.DataAnnotations;

namespace HR_Portalgrad.Models.Requests
{
    public class ForgotPasswordRequest
    {

        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
