using HR_Portalgrad.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ProfileReporsitories
{
    public class DbProfileReporsitory : IProfileReporsitory
    {
        private readonly AuthDBContext _context;

        public DbProfileReporsitory(AuthDBContext context)
        {
            _context = context;
        }
        public async Task<List<Profile>> GetAllProfileInfo()
        {
            return await _context.profiles.ToListAsync();
        }
    }
}
