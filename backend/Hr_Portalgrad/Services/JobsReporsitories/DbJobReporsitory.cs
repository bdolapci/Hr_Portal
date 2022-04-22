using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.JobsReporsitories
{
    public class DbJobReporsitory :IJobReporsitory
    {
        private readonly AuthDBContext _context;

        public DbJobReporsitory(AuthDBContext context)
        {
            _context = context;
        }

        public async Task<List<Jobs>> GetAllJobs()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<Jobs> RemoveJob(int id)
        {
            var us = await _context.Jobs.FindAsync(id);
            _context.Jobs.Remove(us);
            await _context.SaveChangesAsync();
            return us;
        }
    }
}
