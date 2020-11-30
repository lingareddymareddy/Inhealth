using DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlogAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly BlogContext _context;
        private readonly IUserRepository _userService;

        public AuthController(BlogContext context, IUserRepository userRepository)
        {
            _context = context;
            _userService = userRepository;
        }

        [HttpPost, Route("login")]
        [Produces("application/json")]
        public IActionResult Login([FromBody] Login user)
        {
            //Login user = new Login();
            if (user == null)
            {
                return BadRequest("Invalid request");
            }
            if (user != null)
            {
                return Ok(_userService.Login(user.loginId, user.password));
            }
            else
            {
                return Unauthorized();
            }
        }


        [CustomAuthorization]
        [HttpPost,Route("updateuser")]
        [Produces("application/json")]
        public IActionResult UpdateUser([FromBody] UserRequest userRequest)
        {
            if (userRequest.Id==null)
            {
                return BadRequest();
            }
            var user = _context.User.Find(userRequest.Id);
            if (userRequest.IsAdmin != null)
            {
                user.IsAdmin = userRequest.IsAdmin;
            }
            if (userRequest.IsDeleted != null)
            {
                user.IsDeleted = userRequest.IsDeleted;
            }
            user.UpdatedBy = userRequest.UpdatedBy;
            user.UpdatedOn = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userRequest.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new Response { StatusCode = 200, ErrorMessage = "User details has been updated successfully!" });
        }

        [CustomAuthorization]
        [HttpPost, Route("deleteuser")]
        [Produces("application/json")]
        public IActionResult DeleteUser([FromBody] UserRequest userRequest)
        {
            if (userRequest.Id == null)
            {
                return BadRequest();
            }
            var user = _context.User.Find(userRequest.Id);
            user.IsDeleted = userRequest.IsDeleted;
            user.UpdatedBy = userRequest.UpdatedBy;
            user.UpdatedOn = DateTime.Now;
            _context.Entry(user).State = EntityState.Modified;
            try
            {
                _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userRequest.Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(new Response { StatusCode = 200, ErrorMessage = "User have been deleted successfully!" });
        }


      
        [HttpPost, Route("register")]
        [Produces("application/json")]
        public async Task<ActionResult<User>> Register([FromBody] User user)
        {
            if (!_context.User.Where(x => x.IsAdmin == true).Any())
            {
                user.IsAdmin = true;
            }
            _context.User.Add(user);
            await _context.SaveChangesAsync();
            
            return Ok(new Response { StatusCode=200, ErrorMessage = "Your account has been registered successfully!" });
        }

        // DELETE: api/Auth/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        // GET: api/Auth
        [CustomAuthorization]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Auth/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost("[action]")]
        public IActionResult TradLogin(string loginId, string password)
        {
            if (loginId == null || password == null)
            {
                return BadRequest("Invalid request");
            }
            if (loginId != null && password != null)
            {
                return Ok(_userService.Login(loginId, password));
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
