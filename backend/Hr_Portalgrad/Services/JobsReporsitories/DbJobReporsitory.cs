using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Jobs> EditJob(int id, string name, int UserId, string Date, string description, string category, string photo)
        {
            var job = new Jobs {Id=id,Name=name,UserId=UserId,Date=Date,description=description,category=category,photo=photo};
            _context.Jobs.Attach(job);
            _context.Entry(job).Property(j => j.UserId).IsModified = false;
            _context.Entry(job).Property(j => j.Name).IsModified = true;
            _context.Entry(job).Property(j=>j.Date).IsModified = true;
            _context.Entry(job).Property(j => j.description).IsModified = true;
            _context.Entry(job).Property(j => j.category).IsModified = true;
            _context.Entry(job).Property(j => j.photo).IsModified = true;
            await _context.SaveChangesAsync();
            return job;
         
        }

        public async Task<List<Jobs>> GetAllJobs()
        {
            return await _context.Jobs.ToListAsync();
        }

        public async Task<Jobs> GetApplicantsJob(int id)
        {
            var us = await _context.Jobs.FindAsync(id);
            var us2 = await _context.Applicants.Where(u => u.Jobsid == id).ToListAsync();

            await _context.SaveChangesAsync();
            return us;
        }

        public async Task<Jobs> GetSingleJob(int id)
        {
            var result = _context.Jobs.SingleOrDefaultAsync(j => j.Id == id);

            return await result;
        }

        public async Task<Jobs> PostJob(Jobs job)
        {
           _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            return job;
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
