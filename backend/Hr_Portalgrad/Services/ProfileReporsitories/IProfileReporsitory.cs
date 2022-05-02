using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ProfileReporsitories
{
    public interface IProfileReporsitory
    {
        Task<List<Profile>> GetAllProfileInfo();
    }
}
