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
    public class PostCommentsController : ControllerBase
    {
        private readonly BlogContext _context;

        public PostCommentsController(BlogContext context)
        {
            _context = context;
        }
        [HttpGet,Route("getpostcomments")]
        public async Task<ActionResult<IEnumerable<PostComment>>> GetPostComments(int PostId)
        {
            return await _context.PostComment.Where(i => i.PostId == PostId).ToListAsync();
        }
        
        [HttpPost, Route("add")]
        [Produces("application/json")]
        public async Task<ActionResult<PostComment>> Add([FromBody] PostComment postComment)
        {
            try
            {
                _context.PostComment.Add(postComment);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                //logging should be here
                return Ok(new Response { StatusCode = 201, ErrorMessage = "Failed to create, please try after some time!" });
            }
            return Ok(new Response { StatusCode = 200, ErrorMessage = "Your comment has been submitted!" });
        }

        [HttpGet, Route("comments")]
        public async Task<ActionResult<IEnumerable<PostComment>>> GetComments()
        {
            return await _context.PostComment.ToListAsync();
        }
    }
}
