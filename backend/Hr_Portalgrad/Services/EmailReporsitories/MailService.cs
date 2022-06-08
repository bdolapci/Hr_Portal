using HR_Portalgrad.Models;
using HR_Portalgrad.Models.Requests;

using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;

using Google.Apis.Auth.OAuth2;
using System.Threading.Tasks;
using System.Threading;

namespace HR_Portalgrad.Services.EmailReporsitories
{
    public class MailService : IMailService
    {
        private readonly AuthDBContext _context;
        private readonly MailSettings _mailSettings;
        public MailService(IOptions<MailSettings> mailSettings, AuthDBContext context)
        {
            _mailSettings = mailSettings.Value;
            _context = context;
           
        }
        public async Task<string> SendEmailSuccess(MailRequest mailRequest, int id, string body)
        {
            var us = new Jobs { Id = id };
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            builder.HtmlBody = body;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return body;
        }
        public async Task<int> SendEmailAsync(MailRequest mailRequest)
        {
            string clientId = _mailSettings.clientId;
            string clientSecret = _mailSettings.clientSecret;
            string fromMail = _mailSettings.Mail;
            string[] scopes = new string[] { "https://mail.google.com/" };
            ClientSecrets clientSecrets = new()
            {
                ClientId = clientId,
                ClientSecret = clientSecret
            };
            UserCredential userCredential = GoogleWebAuthorizationBroker.AuthorizeAsync(clientSecrets, scopes, "user", CancellationToken.None).Result;
            //Authorization granted or not required (if the saved access token already available)
            if (userCredential.Token.IsExpired(userCredential.Flow.Clock))
            {
                //The access token has expired, refreshing it
                if (!userCredential.RefreshTokenAsync(CancellationToken.None).Result)
                {
                    return 0;
                }
            }
            Random rnd = new Random();
            var otpcode =rnd.Next(9001 + 100000);
            var email = new MimeMessage();
           
            email.From.Add(MailboxAddress.Parse(fromMail));
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            string msg = "Your otp code is: " + otpcode;
            builder.HtmlBody = msg;
            email.Body = builder.ToMessageBody();
            using (var client = new SmtpClient())
            {
                client.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                var oauth2 = new SaslMechanismOAuth2(fromMail, userCredential.Token.AccessToken);
                client.Authenticate(oauth2);
                await client.SendAsync(email);
                client.Disconnect(true);
            }
           
            return otpcode;
        }


        public async Task<string> SendMail(MailRequest mailRequest,string body)
        {
            try
            {
                string clientId = _mailSettings.clientId;
                string clientSecret = _mailSettings.clientSecret;
                string fromMail = _mailSettings.Mail;
                string[] scopes = new string[] { "https://mail.google.com/" };
                ClientSecrets clientSecrets = new()
                {
                    ClientId = clientId,
                    ClientSecret = clientSecret
                };
                //Requesting authorization
                UserCredential userCredential = GoogleWebAuthorizationBroker.AuthorizeAsync(clientSecrets, scopes, "user", CancellationToken.None).Result;
                //Authorization granted or not required (if the saved access token already available)
                if (userCredential.Token.IsExpired(userCredential.Flow.Clock))
                {
                    //The access token has expired, refreshing it
                    if (!userCredential.RefreshTokenAsync(CancellationToken.None).Result)
                    {
                        return "error";
                    }
                }
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse(fromMail));
                email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
                email.Subject = mailRequest.Subject;
                var builder = new BodyBuilder();
                builder.HtmlBody = body;
                email.Body = builder.ToMessageBody();
                using (var client = new SmtpClient())
                {
                    client.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
                    var oauth2 = new SaslMechanismOAuth2(fromMail, userCredential.Token.AccessToken);
                    client.Authenticate(oauth2);
                    await client.SendAsync(email);
                    client.Disconnect(true);
                }
                return body;
            }
            catch (Exception ex)
            {
                return "ex";
            }
        }
    }
}
      