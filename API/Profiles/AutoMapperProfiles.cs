
using API.Dtos.AccountDtos;
using API.Dtos.PhotoDtos;
using API.Dtos.UserDtos;
using API.Extensions;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, UserReturnDto>()
            .ForMember(dest => dest.PhotoUrl, opt => opt
            .MapFrom(src => src.Photos.FirstOrDefault(x => x.IsMain).Url))
            .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();
            CreateMap<UserUpdateDto, AppUser>();
            CreateMap<RegisterDto, AppUser>();

        }
    }
}