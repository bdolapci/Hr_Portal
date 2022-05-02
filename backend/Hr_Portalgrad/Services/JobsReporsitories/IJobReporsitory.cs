using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.JobsReporsitories
{
    public interface IJobReporsitory
    {
        Task<List<Jobs>> GetAllJobs();
        Task<Jobs> RemoveJob(int id);

        Task<Jobs> PostJob(Jobs job);
        Task<Jobs> EditJob(int id,string name,int UserId,string Date,string description,string category,string photo);
        Task<Jobs> GetSingleJob(int id);
        Task<Jobs> GetApplicantsJob(int id);
    }
}
