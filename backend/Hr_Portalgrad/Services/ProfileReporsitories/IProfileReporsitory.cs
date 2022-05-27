using HR_Portalgrad.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.ProfileReporsitories
{
    public interface IProfileReporsitory
    {
        Task<List<Profile>> GetAllProfileInfo();
        Task<Profile> GetProfileInfo(int id);
        //Task<Profile> EditAboutInfo(int id, int UserID, string about, string photo, string facebook, string twitter,
        //    string linkedin, string experience, string certification, string education, int followers, string skills, int following);
        Task<Profile> EditProfileAbout(int id, int UserID, string about);
        Task<Profile> EditProfilephoto(int id, int UserID, string photo);
        Task<Profile> EditProfilefacebook(int id, int UserID, string facebook);
        Task<Profile> EditProfiletwitter(int id, int UserID, string twitter);
        Task<Profile> EditProfilelinkedin(int id, int UserID, string linkedin);
        Task<Profile> EditProfileexperience(int id, int UserID, string experience);
        Task<Profile> EditProfilecertification(int id, int UserID, string certification);
        Task<Profile> EditProfileeducation(int id, int UserID, string education);
        Task<Profile> EditProfilefollowers(int id, int UserID, int followers);
        Task<Profile> EditProfileskills(int id, int UserID, string skills);
        Task<Profile> EditProfilefollowing(int id, int UserID, int following);

        Task<Profile> EditProfiletitle(int id, int UserID, string title);
        Task<Profile> Create(Profile prof);
        Task<Profile> GetProfile2(int id);
      
    }
}
