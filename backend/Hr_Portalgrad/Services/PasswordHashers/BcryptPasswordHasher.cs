using Microsoft.AspNetCore.Mvc;

namespace HR_Portalgrad.Services.PasswordHashers
{
    public class BcryptPasswordHasher : IPasswordHasher
    {
        public string hashPassword(string password)
        {
           return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public bool verifyPassword(string password, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, passwordHash);
        }
    }
}
