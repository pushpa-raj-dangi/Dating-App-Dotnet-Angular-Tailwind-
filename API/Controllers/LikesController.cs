using API.Dtos.LikeDto;
using API.Extensions;
using API.Helpers;
using API.Interfaces.UserLikeRepository;
using API.Interfaces.UserRepository;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likeRepository;
        public LikesController(
            IUserRepository userRepository, ILikesRepository likRepository)
        {
            _likeRepository = likRepository;

            _userRepository = userRepository;

        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var sourceUserId = User.GetUserId();
            var likedUser = await _userRepository.GetUserByUserName(username);
            var sourceUser = await _likeRepository.GetUserWithLikes(sourceUserId);

            if (likedUser == null)
                return NotFound();

            if (sourceUser.UserName == username) return BadRequest("You can't like yourself!");

            var userlike = await _likeRepository.GetUserLike(sourceUserId, likedUser.Id);
            if (userlike != null) return BadRequest("You already liked this user");

            userlike = new UserLike
            {
                SourceUserId = sourceUserId,
                LikedUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userlike);
            if (await _userRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to like user");




        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUsersLikes([FromQuery] LikeParams likeParams)
        {
            likeParams.UserId = User.GetUserId();

            var users = await _likeRepository.GetUserLikes(likeParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}