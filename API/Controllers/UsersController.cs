using System.Security.Claims;
using API.Dtos.UserDtos;
using API.Interfaces.UserRepository;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{


    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repository;
        public readonly IMapper _mapper;
        public UsersController(IUserRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReturnDto>>> GetUsers()
        {
            var users = await _repository.GetUsersAsync();
            return Ok(_mapper.Map<IEnumerable<UserReturnDto>>(users));
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id)
        {
            var user = await _repository.GetUserById(id);
            return Ok(_mapper.Map<UserReturnDto>(user));
        }

        [HttpGet("{userName}")]
        public async Task<ActionResult<UserReturnDto>> GetUserByUserName(string userName)
        {
            return await _repository.GetMemberAsync(userName);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDto memberUpdateDto)
        {
            var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var user = await _repository.GetUserByUserName(username);
            _mapper.Map(memberUpdateDto, user);
            _repository.Update(user);

            if (await _repository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");

        }
    }
}