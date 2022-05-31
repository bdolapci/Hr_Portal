﻿using HR_Portalgrad.Models;
using HR_Portalgrad.Models.Requests;
using HR_Portalgrad.Services.UserReporsitories;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using System;
using System.IO;
using System.Linq;

using System.Threading.Tasks;

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
        public async Task<int> SendEmailAsync(MailRequest mailRequest)
        {
            Random rnd = new Random();
            var otpcode =rnd.Next(9001 + 100000);
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            email.To.Add(MailboxAddress.Parse(mailRequest.ToEmail));
            email.Subject = mailRequest.Subject;
            var builder = new BodyBuilder();
            string msg = "Your otp code is: " + otpcode;
            builder.HtmlBody = msg;
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(email);
            smtp.Disconnect(true);
            return otpcode;
        }

        public async Task<string> SendEmailSuccess(MailRequest mailRequest,int id,string body)
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

       
    }

}
