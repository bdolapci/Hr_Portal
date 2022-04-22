using HR_Portalgrad.Models;
using HR_Portalgrad.Models.Requests;
using HR_Portalgrad.Models.Responses;
using HR_Portalgrad.Services;
using HR_Portalgrad.Services.ApplicantsReporsitories;
using HR_Portalgrad.Services.JobsReporsitories;
using HR_Portalgrad.Services.TokenGenerators;
using HR_Portalgrad.Services.UserReporsitories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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


        public HomeController(IUserReporsitory userReporsitory,
            IPasswordHasher passwordHasher,
            AccessTokenGenerator accessTokenGenerator,
            IJobReporsitory jobReporsitory,
            IApplicantsReporsitory applicantsReporsitory)
        {
            _userReporsitory = userReporsitory;
            _passwordHasher = passwordHasher;
            _accessTokenGenerator = accessTokenGenerator;
            _jobReporsitory = jobReporsitory;
            _applicantsReporsitory= applicantsReporsitory;
        }


        [HttpPost("register")]
        //RegisterRequest Model object
      public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(registerRequest.Passwords != registerRequest.confirmPassword)
            {
                return BadRequest(new ErrorResponse("Password not match"));
            }
            User emailExists = await _userReporsitory.GetByEmail(registerRequest.Email);
            if(emailExists != null)
            {
                return Conflict(new ErrorResponse("Email already Exists"));
            }
            string passwordHash =_passwordHasher.hashPassword(registerRequest.Passwords);
            User regUser = new User()
            {
                firstName = registerRequest.firstName,
                lastName = registerRequest.lastName,
                email = registerRequest.Email,
                Passwords = passwordHash,
                userRole = registerRequest.userRole,
            };
            await _userReporsitory.Create(regUser);
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
            if(user == null)
            {
                return Unauthorized();
            }
            bool isCorrectpass = _passwordHasher.verifyPassword(loginRequest.Password, user.Passwords);
            if (!isCorrectpass)
            {
                return Unauthorized();
            }
            string accessToken = _accessTokenGenerator.GenerateToken(user);

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
           return await _userReporsitory.UpdatetoHr(user.Id,user.userRole);
        }
        //[HttpPost("user/{id?}")]
        //public async Task<User> UpdatetoUser([FromBody] User user)
        //{
        //    return await _userReporsitory.UpdateUser(user.Id, user.userRole);
        //}
        [HttpDelete]
        public async Task<User> DeleteUser([FromHeader]int id)
        {
            return await _userReporsitory.RemoveUser(id);
        }
        [HttpGet("Jobs")]
        public async Task<List<Jobs>> GetJobs()
        {
            return await _jobReporsitory.GetAllJobs();
        }
        [HttpDelete("Jobs")]
        public async Task<Jobs> DeleteJobs([FromHeader]int id)
        {
            return await _jobReporsitory.RemoveJob(id);
        }
        [HttpGet("Applicants")]
        public async Task<List<Applicants>> GetApplicants()
        {
            return await _applicantsReporsitory.GetAllApplicants();
        } 
    }
}
