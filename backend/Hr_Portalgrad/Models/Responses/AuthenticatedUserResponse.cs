using Microsoft.AspNetCore.Mvc;

namespace HR_Portalgrad.Models.Responses
{
    public class AuthenticatedUserResponse 
    {
       public string AccessToken { get; set; }  
    }
}
