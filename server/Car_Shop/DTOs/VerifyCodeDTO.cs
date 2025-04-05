using System;
using System.Text.Json.Serialization;

namespace DTOs
{
    public class VerifyCodeDTO
    {
        [JsonPropertyName("Email")]
        public string Email { get; set; }

        [JsonPropertyName("Code")]
        public string Code { get; set; }
    }
}
