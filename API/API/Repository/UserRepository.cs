using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using DB;
using Microsoft.Extensions.Configuration;

namespace BlogAPI
{
    public class UserRepository:IUserRepository
    {
        private readonly BlogContext _context;
        private readonly IConfiguration _configuration;

        public UserRepository(IConfiguration configuration, BlogContext context)
        {
            _configuration = configuration;
            _context = context;
        }
        public LoginResponse Login(string username, string password)
        {
            var user = _context.User.Where(i => i.Name == username && i.Password == password);
            if (user.Any())
            {
                var authuser = user.FirstOrDefault();
                var authsecretKey = (Encoding.UTF8.GetBytes(_configuration["Token:Secret"]));
                UnicodeEncoding ByteConverter = new UnicodeEncoding();
                byte[] dataToEncrypt = ByteConverter.GetBytes($"{authsecretKey}{DateTime.Now.Ticks}");

                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {
                    var tokenbyte=(RSAEncrypt(dataToEncrypt, RSA.ExportParameters(false), false));
                    var signinCredentials=Convert.ToBase64String(tokenbyte);
                    UserSession obj = new UserSession();
                    obj.UserId = authuser.Id;
                    obj.SessionId = signinCredentials;
                    obj.CreatedOn = DateTime.Now;
                    _context.UserSession.Add(obj);
                    _context.SaveChanges();
                    return new LoginResponse { authToken = tokenbyte, userName= authuser.Name,id=authuser.Id,isAdmin=authuser.IsAdmin };
                }
            }
            return null;
        }
        public Response Signup(User user) { return new Response(); }

        private static byte[] RSAEncrypt(byte[] DataToEncrypt, RSAParameters RSAKeyInfo, bool DoOAEPPadding)
        {
            try
            {
                byte[] encryptedData;
                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {
                    RSA.ImportParameters(RSAKeyInfo);
                    encryptedData = RSA.Encrypt(DataToEncrypt, DoOAEPPadding);
                }
                return encryptedData;
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.Message);

                return null;
            }
        }
    }
}
