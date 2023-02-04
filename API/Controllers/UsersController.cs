using API.Dtos.PhotoDtos;
using API.Dtos.UserDtos;
using API.Extensions;
using API.Helpers;
using API.Interfaces.UserRepository;
using API.Models;
using API.Services.Photos;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{


    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _repository;
        public readonly IMapper _mapper;
        private readonly IPhotoService _photoService;
        public UsersController(IUserRepository repository, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _repository = repository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserReturnDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var user = await _repository.GetUserByUserName(User.GetUserName());
            userParams.CurrentUsername = user.UserName;
            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = user.Gender == "male" ? "female" : "male";
            }

            var users = await _repository.GetMembersAsync(userParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id)
        {
            var user = await _repository.GetUserById(id);
            return Ok(_mapper.Map<UserReturnDto>(user));
        }

        [HttpGet("{userName}", Name = "GetUser")]
        public async Task<ActionResult<UserReturnDto>> GetUserByUserName(string userName)
        {
            return await _repository.GetMemberAsync(userName);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(UserUpdateDto memberUpdateDto)
        {
            var username = User.GetUserName();
            var user = await _repository.GetUserByUserName(username);
            _mapper.Map(memberUpdateDto, user);
            _repository.Update(user);

            if (await _repository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update user");

        }
        [HttpPost("upload-photo")]
        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
        {
            var username = User.GetUserName();
            var user = await _repository.GetUserByUserName(username);

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null) BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }
            user.Photos.Add(photo);

            if (await _repository.SaveAllAsync())
                return CreatedAtRoute("GetUser", new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));



            return BadRequest("Problem to upload photo");

        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainImage(int photoId)
        {
            var user = await _repository.GetUserByUserName(User.GetUserName());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo.IsMain) return BadRequest("This photo is already set as main photo");
            var currentMainPhoto = user.Photos.FirstOrDefault(x => x.IsMain);

            if (currentMainPhoto != null) currentMainPhoto.IsMain = false;

            photo.IsMain = true;
            if (await _repository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to set main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeleteImage(int photoId)
        {
            var user = await _repository.GetUserByUserName(User.GetUserName());
            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();
            if (photo.IsMain) return BadRequest("Cannot delete main photo.");
            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error.Message);

            }

            user.Photos.Remove(photo);

            if (await _repository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete photo");


        }
    }
}