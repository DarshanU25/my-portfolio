using Microsoft.EntityFrameworkCore;
using Portfolio.WebApi.Data;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;

namespace Portfolio.WebApi.Repositories;

public class ContactRepository : IContactRepository
{
    private readonly PortfolioDbContext _dbContext;

    public ContactRepository(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ContactMessage> SaveContactMessageAsync(ContactMessage message)
    {
        _dbContext.ContactMessages.Add(message);
        await _dbContext.SaveChangesAsync();
        return message;
    }

    public async Task<IEnumerable<ContactMessage>> GetAllContactMessagesAsync()
    {
        return await _dbContext.ContactMessages
            .OrderByDescending(m => m.CreatedAtUtc)
            .ToListAsync();
    }
}
