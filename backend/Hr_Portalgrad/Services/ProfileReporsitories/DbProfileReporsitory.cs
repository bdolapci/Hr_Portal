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

        public async Task<Profile> EditProfileAbout( int id,int UserID, string about)
        {
            var profile = new Profile { Id=id ,Userid = UserID, about = about };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.about).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilecertification(int id, int UserID, string certification)
        {
            var profile = new Profile { Id = id, Userid = UserID, certification=certification };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.certification).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }
        public async Task<Profile> EditProfiletitle(int id, int UserID, string title)
        {
            var profile = new Profile { Id = id, Userid = UserID, currentTitle = title };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.currentTitle).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfileeducation(int id, int UserID, string education)
        {
            var profile = new Profile { Id = id, Userid = UserID, education = education };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.education).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfileexperience(int id, int UserID, string experience)
        {
            var profile = new Profile { Id = id, Userid = UserID, experience = experience };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.experience).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilefacebook(int id, int UserID, string facebook)
        {
            var profile = new Profile { Id = id, Userid = UserID, Facebook = facebook };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.Facebook).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilefollowers(int id, int UserID, int followers)
        {
            var profile = new Profile { Id = id, Userid = UserID, Followers = followers };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.currentTitle).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilefollowing(int id, int UserID, int following)
        {
            var profile = new Profile { Id = id, Userid = UserID, Following = following };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.Following).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilelinkedin(int id, int UserID, string linkedin)
        {
            var profile = new Profile { Id = id, Userid = UserID, Linkedin = linkedin };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.Linkedin).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfilephoto(int id, int UserID, string photo)
        {
            var profile = new Profile { Id = id, Userid = UserID, photo = photo };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.photo).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfileskills(int id, int UserID, string skills)
        {
            var profile = new Profile { Id = id, Userid = UserID, Skills = skills };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.Skills).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<Profile> EditProfiletwitter(int id, int UserID, string twitter)
        {
            var profile = new Profile { Id = id, Userid = UserID, Twitter = twitter };
            _context.profiles.Attach(profile);
            _context.Entry(profile).Property(j => j.Id).IsModified = false;
            _context.Entry(profile).Property(j => j.Userid).IsModified = false;
            _context.Entry(profile).Property(j => j.Twitter).IsModified = true;
            await _context.SaveChangesAsync();
            return profile;
        }

        //public async Task<Profile> EditAboutInfo(int id, int UserID, string about, string photo, string facebook, string twitter, 
        //    string linkedin, string experience, string certification, string education, int followers, string skills,int following)
        //{
        //    var abouts = new Profile { Id = id, Userid=UserID,about=about,Facebook=facebook,Twitter=twitter,Linkedin=linkedin ,
        //        photo = photo,experience=experience,certification=certification,education=education,Followers=followers,Skills=skills,Following=following };
        //    _context.profiles.Attach(abouts);
        //    _context.Entry(abouts).Property(j => j.Userid).IsModified = false;
        //    _context.Entry(abouts).Property(j => j.about).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Facebook).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Twitter).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Linkedin).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.experience).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.certification).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.education).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Followers).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Skills).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.photo).IsModified = true;
        //    _context.Entry(abouts).Property(j => j.Following).IsModified = true;
        //    await _context.SaveChangesAsync();
        //    return abouts;
        //}

        public async Task<List<Profile>> GetAllProfileInfo()
        {
            return await _context.profiles.ToListAsync();
        }
        public async Task<Profile> GetProfileInfo(int id)
        {
            var result = _context.profiles.FirstOrDefaultAsync(j => j.Id == id);
           
            return await result;
        }

        public async Task<Profile> Create(Profile prof)
        {
            
            _context.profiles.Add(prof);
            await _context.SaveChangesAsync();

            return prof;
        }
    }
}
