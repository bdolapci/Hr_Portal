using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ApplicantsReporsitories
{
    public interface IApplicantsReporsitory
    {
        Task<List<Applicants>> GetAllApplicants();
        Task<Applicants> CreateApplicants(Applicants applicants);

        Task<Applicants> Accept(int id,int isAccepted,int Jobsid);
       
    }
}
