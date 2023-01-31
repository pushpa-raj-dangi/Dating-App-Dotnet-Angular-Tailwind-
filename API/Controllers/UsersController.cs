using API.Interfaces.UserRepository;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{


    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repository;
        public UsersController(IUserRepository repository)
        {
            _repository = repository;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers() => Ok(await _repository.GetUsersAsync());

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id) => Ok(await _repository.GetUserById(id));
        [HttpGet("{userName}")]
        public async Task<ActionResult<AppUser>> GetUserByUserName(string userName) => Ok(await _repository.GetUserByUserName(userName));
    }
}