using HR_Portalgrad.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace HR_Portalgrad.Services.TokenGenerators
{
    public class AccessTokenGenerator 
    {
        private readonly AuthConfig _authConfig;

        public AccessTokenGenerator(AuthConfig config)
        {
            _authConfig = config;
        }

        public string GenerateToken(User user)
        {
            SecurityKey key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authConfig.AccessTokenSecret));
            SigningCredentials credentials = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);
            
            List<Claim> claims = new List<Claim>()
            {
                new Claim("id",user.Id.ToString()),
                new Claim(ClaimTypes.Email,user.email),
                new Claim("userRole", user.userRole),
               // new Claim("isApplicant",user.isApplicant),
            };

            JwtSecurityToken token = 
                new JwtSecurityToken(
                _authConfig.Issuer,
                _authConfig.Audience,
                claims,
                DateTime.UtcNow,
                DateTime.UtcNow.AddMinutes(_authConfig.AccessTokenExpirationDay),
                credentials
                );
           return  new JwtSecurityTokenHandler().WriteToken(token);
        }
       

    }}
