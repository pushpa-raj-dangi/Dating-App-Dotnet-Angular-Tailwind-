using API.Data;
using API.Dtos.UserDtos;
using API.Helpers;
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

        public async Task<PagedList<UserReturnDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDOB = DateTime.Today.AddYears(-userParams.MaxAge - 1);
            var maxDOB = DateTime.Today.AddYears(-userParams.MinAge);

            query = query.Where(u => u.DateOfBirth >= minDOB && u.DateOfBirth <= maxDOB);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.Created),
                _ => query.OrderByDescending(u => u.LastActive)
            };

            return await PagedList<UserReturnDto>.CreateAsync(query.ProjectTo<UserReturnDto>(_mapper.ConfigurationProvider).AsNoTracking(), userParams.PageNumber, userParams.PageSize);

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