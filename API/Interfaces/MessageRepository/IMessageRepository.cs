using API.Dtos.MessageDto;
using API.Helpers;
using API.Models;

namespace API.Interfaces.MessageRepository
{
    public interface IMessageRepository
    {
        void AddMessage(Message message);
        void DeleteMessage(Message message);
        Task<Message> GetMessage(int id);
        Task<PagedList<MessageDto>> GetMessagesForUser();
        Task<IEnumerable<MessageDto>> GetMessageThread(int id, int recepintId);
        Task<bool> SaveAllAsync();

    }
}