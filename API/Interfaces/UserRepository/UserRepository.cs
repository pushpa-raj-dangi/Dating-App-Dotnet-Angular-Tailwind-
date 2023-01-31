using API.Data;
using API.Dtos.UserDtos;
using API.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Interfaces.UserRepository
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;
        public UserRepository(AppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<UserReturnDto> GetMemberAsync(string username)
        {
            return await _context.Users.Where(x => x.UserName == username).ProjectTo<UserReturnDto>(_mapper.ConfigurationProvider).SingleOrDefaultAsync();
        }

        public async Task<IEnumerable<UserReturnDto>> GetMembersAsync()
        {
            return await _context.Users.ProjectTo<UserReturnDto>(_mapper.ConfigurationProvider).ToListAsync();

        }

        public async Task<AppUser> GetUserById(int id)
        {
            return await _context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AppUser> GetUserByUserName(string username)
        {
            return await _context.Users.Include(x => x.Photos).SingleOrDefaultAsync(x => x.UserName == username);
        }

        public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
            return await _context.Users.Include(x => x.Photos).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}