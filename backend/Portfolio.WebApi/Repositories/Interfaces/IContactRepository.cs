using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Repositories.Interfaces;

public interface IContactRepository
{
    Task<ContactMessage> SaveContactMessageAsync(ContactMessage message);
    Task<IEnumerable<ContactMessage>> GetAllContactMessagesAsync();
}
