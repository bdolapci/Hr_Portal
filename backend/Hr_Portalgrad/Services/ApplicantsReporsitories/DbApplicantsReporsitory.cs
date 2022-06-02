using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ApplicantsReporsitories
{
    public class DbApplicantsReporsitory : IApplicantsReporsitory
    {
        private readonly AuthDBContext _context;

        public DbApplicantsReporsitory(AuthDBContext context)
        {
            _context = context;
        }



        public async Task<Applicants> CreateApplicants(Applicants applicants)
        {
            _context.Applicants.Add(applicants);
            await _context.SaveChangesAsync();

            return applicants;
        }

        public async Task<List<Applicants>> GetAllApplicants()
        {
            return await _context.Applicants.ToListAsync();
        }
       
        public async Task<Applicants> Accept(int id,int isAccepted,int Jobsid)
        {
            var us = new Applicants { Id = id, isAccepted = isAccepted ,Jobsid=Jobsid};
            _context.Applicants.Attach(us);
            _context.Entry(us).Property(x => x.isAccepted).IsModified = true;
            await _context.SaveChangesAsync();
            return us;
        }
        public async Task<Applicants> ExtraDocumentReq(int id, int isExtraDocumentRequested, int Jobsid)
        {
            var us = new Applicants { Id = id, isExtraDocumentRequested = isExtraDocumentRequested, Jobsid = Jobsid };
            _context.Applicants.Attach(us);
            _context.Entry(us).Property(x => x.isExtraDocumentRequested).IsModified = true;
            await _context.SaveChangesAsync();
            return us;
        }

        public async Task<IEnumerable> GetAppliedJobs()
        {
            var us = await(from p in _context.Jobs
                           join p2 in _context.Applicants
                           on p.Id equals p2.Jobsid
                           select new
                           {
                               p.Name,
                               p.category,
                               p2.isAccepted,
                               p2.Jobsid,
                               p2.Id,
                               p2.UserId,
                               p2.ProfileId,
                               p2.isExtraDocumentRequested
                           }).ToListAsync();
            await _context.SaveChangesAsync();
            return us;
        }
    }
}
