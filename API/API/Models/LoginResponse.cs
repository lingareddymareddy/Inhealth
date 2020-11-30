using System;

namespace BlogAPI
{
    public class LoginResponse
    {
        public int id { get; set; }
        public string userName { get; set; }
        public bool ?isAdmin { get; set; }
        public byte[] authToken { get; set; }
        public string errorMessage { get; set; }        
        public DateTime expires { get; set; } = DateTime.Now.AddMinutes(30);

    } 
}
