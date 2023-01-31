using API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    public class TestController : BaseApiController
    {
        private readonly AppDbContext _context;

        public TestController(AppDbContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }


        [HttpGet("not-found")]
        public ActionResult<string> GetNotFound()
        {
            var things = _context.Users.Find(-1);
            if (things == null) return NotFound();

            return Ok(things);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {

            var things = _context.Users.Find(-1);

            var thingsToReturn = things.ToString();

            return thingsToReturn;


        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {

            return BadRequest("This was not a good request");
        }
    }
}