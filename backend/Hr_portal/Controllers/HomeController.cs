using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Hr_portal.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Hr_portal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public ActionResult GetUsers()
        {
            string query = @"select * from dbo.Users";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Connections");
            SqlDataReader myReader;
            using(SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand =new SqlCommand(query,myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return new JsonResult(table);
        }
        [HttpPost]
        public ActionResult Register(User us)
        {
            string query = @"
                           insert into dbo.Users
                           values (@firstName,@lastName,@email,@password)
                            ";
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
           password: us.password,
           salt: salt,
           prf: KeyDerivationPrf.HMACSHA256,
           iterationCount: 100000,
           numBytesRequested: 256 / 8));
            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("Connections");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@firstName", us.firstName);
                    myCommand.Parameters.AddWithValue("@lastName", us.lastName);
                    myCommand.Parameters.AddWithValue("@email", us.email);
                    myCommand.Parameters.AddWithValue("@password", hashed);
                    //myCommand.Parameters.AddWithValue("@country", us.country);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
           

            return new JsonResult("Added Successfully");
        }

    }

}
