using API.Dtos.PhotoDtos;

namespace API.Dtos.UserDtos
{
    public class UserReturnDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public int Age { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}