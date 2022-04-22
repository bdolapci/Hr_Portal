using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.JobsReporsitories
{
    public interface IJobReporsitory
    {
        Task<List<Jobs>> GetAllJobs();
        Task<Jobs> RemoveJob(int id);
    }
}
