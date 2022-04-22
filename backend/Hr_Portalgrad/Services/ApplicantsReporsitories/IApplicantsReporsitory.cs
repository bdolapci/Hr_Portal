using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ApplicantsReporsitories
{
    public interface IApplicantsReporsitory
    {
        Task<List<Applicants>> GetAllApplicants();
    }
}
