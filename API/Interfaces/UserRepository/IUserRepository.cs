using API.Dtos.UserDtos;
using API.Models;

namespace API.Interfaces.UserRepository
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsersAsync();
        Task<AppUser> GetUserById(int id);
        Task<AppUser> GetUserByUserName(string username);
        Task<IEnumerable<UserReturnDto>> GetMembersAsync();
        Task<UserReturnDto> GetMemberAsync(string username);

    }
}