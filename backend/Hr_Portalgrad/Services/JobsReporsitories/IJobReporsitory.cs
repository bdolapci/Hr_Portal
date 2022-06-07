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
        //Task<Jobs> EditJob(int id, int UserId, string Date,string name, string description, string category, string photo);
        Task<Jobs> EditJobDate(int id,int UserId,string Date);
        Task<Jobs> EditJobName(int id, string name, int UserId);
        Task<Jobs> EditJobDescription(int id, int UserId, string description);
        Task<Jobs> EditJobCategory(int id, int UserId, string category);
        Task<Jobs> EditJobPhoto(int id, int UserId, string photo);
        Task<Jobs> EditJobRemote(int id, int UserId, string remote);
        Task<Jobs> EditJobExpereienceneed(int id, int UserId,string expereienceneed);
        Task<Jobs> EditJobCompanyName(int id, int UserId,string companyName);
        Task<Jobs> EditJobType(int id, int UserId,string type);
        Task<Jobs> GetSingleJob(int id);
        Task<Jobs> GetApplicantsJob(int id);
        Task<List<Jobs>> FilteringJobs(string companyName,string jobType,string isRemote,string experience,string Date);
    }
}
