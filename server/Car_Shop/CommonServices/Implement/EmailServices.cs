using CommonServices.Abstract;
using DTOs;
using Microsoft.Extensions.Caching.Memory;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MailKit;
using MailKit.Net.Smtp;

namespace CommonServices.Implement
{
    public class EmailServices : IEmailServices
    {
        static IMemoryCache cache = new MemoryCache(new MemoryCacheOptions());
        private readonly EmailConfigurationDTO _emailConfig;
        public EmailServices(EmailConfigurationDTO emailConfig)
        {
            _emailConfig = emailConfig;
        }

        public void SendMail(EmailMessageDTO message)
        {
            var emailMessage = CreateEmailMessage(message);
            Send(emailMessage);
        }

        private MimeMessage CreateEmailMessage(EmailMessageDTO message)
        {
            var emailMessage = new MimeMessage();
            emailMessage.From.Add(new MailboxAddress("email", "thanhqazsx@gmail.com"));
            emailMessage.To.AddRange(message.To);
            emailMessage.Subject = message.Subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) { Text = message.Content };
            return emailMessage;
        }
        private void Send(MimeMessage message)
        {
            using var client = new SmtpClient();

            try
            {

                client.Connect(_emailConfig.SmtpServer, _emailConfig.Port, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("thanhqazsx@gmail.com", "iktr bkoh ugfm elwy");
                client.Send(message);
            }
            catch (Exception)
            {

                throw new Exception();
            }
            finally
            {
                client.Disconnect(true);
                client.Dispose();
            }
        }

        public async Task<string> RandomNumber(int length)
        {
            Random random = new Random();
            string chars = "0123456789";
            char[] randomArray = new char[length];

            for (int i = 0; i < length; i++)
            {
                randomArray[i] = chars[random.Next(chars.Length)];
            }

        return new string(randomArray);
        }

        public void AddToCache(string key, string value)
        {
            Console.WriteLine($"[CACHE] Saving code {value} for email {key}");
            cache.Set(key, value, TimeSpan.FromMinutes(10));
        }

        public async Task<bool> CanSendMail(string key)
        {
            var value = await GetValueFromCache(key);
            if (value == null)
            {
                return true;
            }
            return false;
        }
        public async Task<string> GetValueFromCache(string key)
        {
            var value = cache.Get(key);
            if (value == null)
            {
                return null;
            }
            return value.ToString();
        }

        public async Task<string> randomPassWord(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
            StringBuilder sb = new StringBuilder();

            Random random = new Random();
            for (int i = 0; i < length; i++)
            {
                int index = random.Next(chars.Length);
                sb.Append(chars[index]);
            }

            return sb.ToString();
        }
    }
}
