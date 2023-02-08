using API.Dtos.LikeDto;
using API.Helpers;
using API.Models;

namespace API.Interfaces.UserLikeRepository
{
    public interface ILikesRepository
    {
        Task<UserLike> GetUserLike(int sourceUserId, int likeUserId);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<PagedList<LikeDto>> GetUserLikes(LikeParams likeParams);

    }
}