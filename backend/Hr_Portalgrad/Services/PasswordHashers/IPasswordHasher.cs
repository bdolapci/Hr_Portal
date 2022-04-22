using Microsoft.AspNetCore.Mvc;

namespace HR_Portalgrad.Services
{
    public interface IPasswordHasher 
    {
        string hashPassword(string password);
        bool verifyPassword(string password,string passwordHash);
    }
}
