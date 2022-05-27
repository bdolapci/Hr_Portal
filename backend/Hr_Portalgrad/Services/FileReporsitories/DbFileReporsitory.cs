using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.FileReporsitories
{
    public class DbFileReporsitory : IFileReportsitory
    {
        private readonly AuthDBContext _context;

        public DbFileReporsitory(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<Files> CreateFile(Files file)
        {
            _context.files.Add(file);
            await _context.SaveChangesAsync();

            return file;
        }

        public async Task<Files> GetFileById(int Jobid)
        {
            return await _context.files.FirstOrDefaultAsync(u => u.Jobid == Jobid);
        }
    }
}
