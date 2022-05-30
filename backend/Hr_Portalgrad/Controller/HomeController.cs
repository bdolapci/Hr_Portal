using HR_Portalgrad.Models;
using HR_Portalgrad.Models.Requests;
using HR_Portalgrad.Models.Responses;
using HR_Portalgrad.Services;
using HR_Portalgrad.Services.ApplicantsReporsitories;
using HR_Portalgrad.Services.JobsReporsitories;
using HR_Portalgrad.Services.ProfileReporsitories;
using HR_Portalgrad.Services.TokenGenerators;
using HR_Portalgrad.Services.UserReporsitories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using System.Net.Mail;

using System.Collections;
using Azure.Storage.Blobs.Models;
using Microsoft.AspNetCore.Identity;
using System.Net;
using HR_Portalgrad.Services.EmailReporsitories;
using HR_Portalgrad.Services.FileReporsitories;

namespace HR_Portalgrad.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IUserReporsitory _userReporsitory;
        private readonly IPasswordHasher _passwordHasher;
        private readonly AccessTokenGenerator _accessTokenGenerator;
        private readonly IJobReporsitory _jobReporsitory;
        private readonly IApplicantsReporsitory _applicantsReporsitory;
        private readonly IProfileReporsitory _profileReporsitory;
        private readonly string _azureConnectionString;
        private readonly IMailService _mailService;
        private readonly IFileReportsitory _filereporsitory;
        public HomeController(IUserReporsitory userReporsitory,
            IPasswordHasher passwordHasher,
            AccessTokenGenerator accessTokenGenerator,
            IJobReporsitory jobReporsitory,
            IApplicantsReporsitory applicantsReporsitory,
            IProfileReporsitory profileReporsitory,
            IConfiguration configuration,
            IMailService mailService,
            IFileReportsitory fileReporsitory

            )
        {
            _userReporsitory = userReporsitory;
            _passwordHasher = passwordHasher;
            _accessTokenGenerator = accessTokenGenerator;
            _jobReporsitory = jobReporsitory;
            _applicantsReporsitory = applicantsReporsitory;
            _profileReporsitory = profileReporsitory;
            _azureConnectionString = configuration.GetConnectionString("AzureConnectionString");
            _mailService = mailService;
            _filereporsitory= fileReporsitory;
        
        }


        [HttpPost("register")]
        //RegisterRequest Model object
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (registerRequest.Passwords != registerRequest.confirmPassword)
            {
                return BadRequest(new ErrorResponse("Password not match"));
            }
            User emailExists = await _userReporsitory.GetByEmail(registerRequest.Email);
            if (emailExists != null)
            {
                return Conflict(new ErrorResponse("Email already Exists"));
            }
            string passwordHash = _passwordHasher.hashPassword(registerRequest.Passwords);
            User regUser = new User()
            {
                firstName = registerRequest.firstName,
                lastName = registerRequest.lastName,
                email = registerRequest.Email,
                Passwords = passwordHash,
                userRole = registerRequest.userRole,
                country = registerRequest.country,
                gender = registerRequest.gender,
                phoneNumber = registerRequest.phoneNumber,
                regDate = registerRequest.regDate,
                isCompanyVerified = false,
            };
          

            await _userReporsitory.Create(regUser);
            Profile profile = new Profile()
            {
                Userid = regUser.Id,
                education= registerRequest.education,
                experience= registerRequest.experience,
                Linkedin=registerRequest.linkedin,
                Facebook=registerRequest.facebook,
                website=registerRequest.website,
                photo="banner.jpg",
            };
            await _profileReporsitory.Create(profile);
 


            return Ok();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            User user = await _userReporsitory.GetByEmail(loginRequest.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            bool isCorrectpass = _passwordHasher.verifyPassword(loginRequest.Password, user.Passwords);
            if (!isCorrectpass)
            {
                return Unauthorized();
            }
            string accessToken = _accessTokenGenerator.GenerateToken(user);
            if (user.isCompanyVerified==false && user.userRole=="hr")
            {
                return NotFound();
            }
            return Ok(new AuthenticatedUserResponse()
            {
                AccessToken = accessToken,
            });
        }
        [HttpGet]
        public async Task<List<User>> GetUsers()
        {
            return await _userReporsitory.GetAllUser();


        }
        [HttpGet("User/{id?}")]
        public async Task<User> GetSingleUser(int id)
        {
            return await _userReporsitory.GetById(id);
        }
        [HttpGet("Useremail/{email?}")]
        public async Task<User> GetSingleEmail([FromHeader] ForgotPasswordRequest forgot)
        {
            User user = await _userReporsitory.GetByEmailAsync(forgot.Email);
            return user;


        }

        //[HttpPost("logout")]
        //public  ActionResult Logout()
        //{

        //    string id = HttpContext.User.FindFirstValue("Id");

        //    if (!Guid.TryParse(id, out Guid userID))
        //    {
        //        return new JsonResult("Error");
        //    }
        //    return new JsonResult("Logged Out");
        //}
        [HttpPost("HR/{id?}")]
        public async Task<User> UpdatetoCompanyHr(User user)
        {
            return await _userReporsitory.UpdatetoHr(user.Id, user.Passwords, user.firstName, user.lastName, user.userRole, user.email);
        }
        [HttpGet("UserApplicantJoin")]
        public async Task<IEnumerable> UserApplicantJoin()
        {

            return await _userReporsitory.GetApplicantsbyUser();
        }
        [HttpGet("ProfileUserJoin")]
        public async Task<IEnumerable> ProfileUserJoin()
        {
            return await _userReporsitory.GetUserProfile();
        }
        [HttpGet("JobsApplicantJoin")]
        public async Task<IEnumerable> ApplicantJobsJoin()
        {

            return await _applicantsReporsitory.GetAppliedJobs();
        }
      
        //[HttpPost("user/{id?}")]
        //public async Task<User> UpdatetoUser([FromBody] User user)
        //{
        //    return await _userReporsitory.UpdateUser(user.Id, user.userRole);
        //}
        [HttpDelete("{id?}")]
        public async Task<User> DeleteUser(int id)
        {
            return await _userReporsitory.RemoveUser(id);
        }
        [HttpGet("Jobs")]
        public async Task<List<Jobs>> GetJobs()
        {
            return await _jobReporsitory.GetAllJobs();
        }
        [HttpDelete("Jobs/{id?}")]
        public async Task<Jobs> DeleteJobs(int id)
        {
            return await _jobReporsitory.RemoveJob(id);
        }
        [HttpGet("Applicants")]
        public async Task<List<Applicants>> GetApplicants()
        {
            return await _applicantsReporsitory.GetAllApplicants();
        }
        [HttpPost("Jobs")]
        public async Task<Jobs> AddJob([FromBody] Jobs job)
        {
            Jobs newJob = new Jobs()
            {
                UserId = job.UserId,
                Name = job.Name,
                Date = job.Date,
                description = job.description,
                category = job.category,
                photo = job.photo,
            };
            await _jobReporsitory.PostJob(newJob);
            return newJob;
        }
        [HttpPost("CreateFile")]
        public async Task<Files> AddFile([FromBody] Files file)
        {
            Files newFile=new Files()
            {
                Userid = file.Userid,
                Name = file.Name,
                Jobid = file.Jobid,
            };
            await _filereporsitory.CreateFile(file);
            return file;
        }
        //[HttpPatch("Jobs/EditJob")]
        //public async Task<Jobs> EditJob(Jobs job)
        //{
        //    return await _jobReporsitory.EditJob(job.Id,job.UserId, job.Date, job.Name, job.description, job.category, job.photo);
        //}
        [HttpPost("changePassword")]
        public async Task<User> changePassword(User user)
        {
            string passwordHash = _passwordHasher.hashPassword(user.Passwords);
            return await _userReporsitory.ChangePassword(user.Id, passwordHash, user.firstName, user.lastName, user.userRole, user.email);
        }
        [HttpPost("regDate")]
        public async Task<User> registerDate(User user)
        {
            return await _userReporsitory.EditEmailValid(user.Id,  user.firstName, user.lastName,user.Passwords, user.userRole, user.email,user.regDate);
        }
    
        [HttpPost("Jobs/EditJobName")]
        public async Task<Jobs> EditJobsName(Jobs job)
        {
            return await _jobReporsitory.EditJobName(job.Id, job.Name, job.UserId);
        }
        [HttpPost("Jobs/EditJobdate")]
        public async Task<Jobs> EditJobsDate(Jobs job)
        {
            return await _jobReporsitory.EditJobDate(job.Id,job.UserId ,job.Date );
        }
        [HttpPost("Jobs/EditJobDescription")]
        public async Task<Jobs> EditJobsDescription(Jobs job)
        {
            return await _jobReporsitory.EditJobDescription(job.Id, job.UserId, job.description );
        }
        [HttpPost("Jobs/EditJobCategory")]
        public async Task<Jobs> EditJobsCategory(Jobs job)
        {
            return await _jobReporsitory.EditJobCategory(job.Id, job.UserId, job.category);
        }
        [HttpPost("Jobs/EditJobPhoto")]
        public async Task<Jobs> EditJobsPhoto(Jobs job)
        {
            return await _jobReporsitory.EditJobPhoto(job.Id, job.UserId, job.photo);
        }

        //[HttpPost("EditProfile")]
        //public async Task<Profile> EditAboutSection(Profile profile)
        //{
        //    return await _profileReporsitory.EditAboutInfo(profile.Id, profile.Userid, profile.Linkedin, profile.Twitter, 
        //        profile.Facebook, profile.photo,profile.about,profile.certification,profile.education,profile.Skills,
        //        profile.Followers,profile.experience,profile.Following);

        [HttpPost("Profile/EditProfileAbout")]
        public async Task<Profile> EditAboutSection(Profile profile)
        {
            return await _profileReporsitory.EditProfileAbout( profile.Id, profile.Userid, profile.about);
        }
        [HttpPost("Profile/EditProfileLinkedin")]
        public async Task<Profile> EditProfileLinkedin(Profile profile)
        {
            return await _profileReporsitory.EditProfilelinkedin(profile.Id, profile.Userid, profile.Linkedin);
        }
        [HttpPost("Profile/EditProfileTitle")]
        public async Task<Profile> EditProfiletitle(Profile profile)
        {
            return await _profileReporsitory.EditProfiletitle(profile.Id, profile.Userid, profile.currentTitle);
        }
        [HttpPost("Profile/EditProfileTwitter")]
        public async Task<Profile> EditProfiletwitter(Profile profile)
        {
            return await _profileReporsitory.EditProfiletwitter(profile.Id, profile.Userid, profile.Twitter);
        }
        [HttpPost("Profile/EditProfilegithub")]
        public async Task<Profile> EditProfilefacebook(Profile profile)
        {
            return await _profileReporsitory.EditProfilefacebook(profile.Id, profile.Userid, profile.Facebook);
        }
        [HttpPost("Profile/EditProfilephoto")]
        public async Task<Profile> EditProfilephoto(Profile profile)
        {
            return await _profileReporsitory.EditProfilephoto(profile.Id, profile.Userid, profile.photo);
        }
        [HttpPost("Profile/EditProfilecertification")]
        public async Task<Profile> EditProfilecertification(Profile profile)
        {
            return await _profileReporsitory.EditProfilecertification(profile.Id, profile.Userid, profile.certification);
        }
        [HttpPost("Profile/EditProfileeducation")]
        public async Task<Profile> EditProfileeducation(Profile profile)
        {
            return await _profileReporsitory.EditProfileeducation(profile.Id, profile.Userid, profile.education);
        }
        [HttpPost("Profile/EditProfileskills")]
        public async Task<Profile> EditProfileskills(Profile profile)
        {
            return await _profileReporsitory.EditProfileskills(profile.Id, profile.Userid, profile.Skills);
        }
        [HttpPost("Profile/EditProfileexperience")]
        public async Task<Profile> EditProfileexperience(Profile profile)
        {
            return await _profileReporsitory.EditProfileexperience(profile.Id, profile.Userid, profile.experience);
        }

        [HttpPost("Profile/EditProfileCountry")]
        public async Task<User> EditProfileCountry(User user)
        {
            return await _userReporsitory.EditUserCountry( user.Id, user.firstName, user.lastName, user.email, user.Passwords, user.userRole, user.country);
        }
        [HttpPost("Profile/EditProfileGender")]
        public async Task<User> EditProfileGender(User user)
        {
            return await _userReporsitory.EditUserGender(user.Id,user.firstName,user.lastName,user.email,user.Passwords, user.userRole, user.gender);
        }
        [HttpPost("Profile/EditUserPhone")]
        public async Task<User> EditProfilePhone(User user)
        {
            return await _userReporsitory.EditUserPhone(user.Id,user.firstName,user.lastName,user.email,user.Passwords, user.userRole, user.phoneNumber);
        }
        [HttpPost("VerifyCompany")]
        public async Task<User> VerifyCompany(User user)
        {
            return await _userReporsitory.EditVerifyCompany(user.Id, user.firstName, user.lastName, user.email, user.Passwords, user.userRole, user.isCompanyVerified);
        }
       [HttpGet("Jobs/{id?}")]
        public async Task<Jobs> GetSingleJob(int id)
        {
            return await _jobReporsitory.GetSingleJob(id);
        }

        [HttpGet("Profile/{id?}")]
        public async Task<Profile> GetSingleProfile(int id)
        {
            return await _profileReporsitory.GetProfileInfo(id);
        }
        [HttpGet("ProfileSingle/{id?}")]
        public async Task<Profile> GetSingleProfile2(int id)
        {
            return await _profileReporsitory.GetProfile2(id);
        }
        [HttpGet("Profile")]
        public async Task<List<Profile>> GetProfile()
        {
            return await _profileReporsitory.GetAllProfileInfo();
        }
        [HttpPost("Applicants")]
        public async Task<Applicants> AddApplicants([FromBody] Applicants applicants)
        {
            Applicants newApplicant = new Applicants()
            {
                UserId = applicants.UserId,
                Jobsid = applicants.Jobsid,
                isAccepted = applicants.isAccepted,
                ProfileId = applicants.ProfileId,
            };
            await _applicantsReporsitory.CreateApplicants(newApplicant);
           
            return newApplicant;
        }
        [HttpGet("JobApplicants/{id?}")]
            public async Task<Jobs> GetJobApplicants(int id)
        {
            return await _jobReporsitory.GetApplicantsJob(id);
        }
        [HttpPut("AcceptApplicants/{id?}")]
            
            public async Task<Applicants> AcceptApplicant(Applicants applicants)
        {
            return await _applicantsReporsitory.Accept(applicants.Id, applicants.isAccepted, applicants.Jobsid);

        }
        [HttpPost("UploadFile")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var file = formCollection.Files.First();
                if (file.Length > 0)
                {
                    var container = new BlobContainerClient(_azureConnectionString, "uploadfile");
                    var createResponse = await container.CreateIfNotExistsAsync();
                    if (createResponse != null && createResponse.GetRawResponse().Status == 201)
                        await container.SetAccessPolicyAsync(Azure.Storage.Blobs.Models.PublicAccessType.Blob);
                    var blob = container.GetBlobClient(file.FileName);
                    await blob.DeleteIfExistsAsync(DeleteSnapshotsOption.IncludeSnapshots);
                    using (var fileStream = file.OpenReadStream())
                    {
                        await blob.UploadAsync(fileStream, new BlobHttpHeaders { ContentType = file.ContentType });
                    }
                    return Ok(blob.Uri.ToString());
                }
                return BadRequest();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
        [HttpPost("sendotp")]
        public async Task<int> SendMail([FromBody] MailRequest request)
        {
            try
            {
                
                return await _mailService.SendEmailAsync(request);
            }
            catch (Exception ex)
            {
                throw;
            }

        }
        [HttpPost("SendSuccess")]
        public async Task<string> SendSuccessMail([FromBody] MailRequest request,int id)
        {
            return await _mailService.SendEmailSuccess(request, id);
        }

        [HttpGet("downloadFile/{name?}")]
        public async Task<IActionResult> Download(string name)
        {
            var container = new BlobContainerClient(_azureConnectionString, "uploadfile");
            var blob = container.GetBlobClient(name);
            if (await blob.ExistsAsync())
            {
                var a = await blob.DownloadAsync();
                return File(a.Value.Content, a.Value.ContentType, name);
            }
            return BadRequest();
        }
        [HttpGet("GetFiles")]
        public async Task<IActionResult> Get()
        {
            var blobs = new List<BlobDto>();
            var container = new BlobContainerClient(_azureConnectionString, "uploadfile");
            await foreach (var blobItem in container.GetBlobsAsync())
            {
                var uri = container.Uri.AbsoluteUri;
                var name = blobItem.Name;
                var fullUri = uri + "/" + name;
                blobs.Add(new BlobDto { Name = name, Uri = fullUri, ContentType = blobItem.Properties.ContentType });
            }
            return Ok(blobs);
        }
       
    }
}
