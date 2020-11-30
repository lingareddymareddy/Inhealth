using DB;

namespace BlogAPI
{
    public interface IUserRepository
    {
        LoginResponse Login(string username, string password);
        Response Signup(User user);
    }
}
