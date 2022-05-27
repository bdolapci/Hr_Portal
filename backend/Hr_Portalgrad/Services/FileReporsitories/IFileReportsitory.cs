using HR_Portalgrad.Models;
using System.IO;
using System.Threading.Tasks;


namespace HR_Portalgrad.Services.FileReporsitories
{
    public interface IFileReportsitory
    {
        Task<Files> CreateFile(Files file);
        Task<Files> GetFileById(int Jobid);
    }
}
