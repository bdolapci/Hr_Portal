using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
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

    }
}
