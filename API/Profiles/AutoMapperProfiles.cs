
using API.Dtos.PhotoDtos;
using API.Dtos.UserDtos;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserReturnDto>();
            CreateMap<Photo, PhotoDto>();
        }
    }
}