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
    public class PostsController : ControllerBase
    {
        private readonly BlogContext _context;

        public PostsController(BlogContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Post.ToListAsync();
        }
      
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Post.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }

    

        [HttpPut("{id}")]
        public async Task<IActionResult> PutPost(int id, Post post)
        {
            if (id != post.Id)
            {
                return BadRequest();
            }

            _context.Entry(post).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [CustomAuthorization]
        [HttpPost, Route("add")]
        [Produces("application/json")]
        public async Task<ActionResult<Post>> Add([FromBody] Post post)
        {
            try
            {
                _context.Post.Add(post);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {     
                //logging should be here
                return Ok(new Response { StatusCode = 201, ErrorMessage = "Failed to create, please try after some time!" });}      
            return Ok(new Response { StatusCode = 200, ErrorMessage = "Your post has been created successfully!" });           
        }

        [CustomAuthorization]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeletePost(int id)
        {
            var post = await _context.Post.FindAsync(id);
            if (post == null)
            {
                return Ok(new Response { StatusCode = 201, ErrorMessage = "Post not exists!" });
            }
            _context.Post.Remove(post);
            await _context.SaveChangesAsync();
            return Ok(new Response { StatusCode = 200, ErrorMessage = "Post has been deleted successfully!" });
        }

        private bool PostExists(int id)
        {
            return _context.Post.Any(e => e.Id == id);
        }
    }
}
