using HR_Portalgrad.Models;
using HR_Portalgrad.Models.Requests;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.EmailReporsitories
{
    public interface IMailService
    {
        Task<int> SendEmailAsync(MailRequest mailRequest);
        Task<string> SendEmailSuccess(MailRequest mailRequest, int id,string body);

      
    }
}
