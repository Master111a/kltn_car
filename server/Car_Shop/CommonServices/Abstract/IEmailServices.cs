using DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace CommonServices.Abstract
{
    public interface IEmailServices
    {
        void AddToCache(string key, string value);
        Task<bool> CanSendMail(string key);
        Task<string> GetValueFromCache(string key);
        Task<string> RandomNumber(int length);
        Task<string> randomPassWord(int length);
        void SendMail(EmailMessageDTO message);
    }
}
