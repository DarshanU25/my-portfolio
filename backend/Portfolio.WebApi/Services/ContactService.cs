using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

public class ContactService : IContactService
{
    private readonly IContactRepository _contactRepository;

    public ContactService(IContactRepository contactRepository)
    {
        _contactRepository = contactRepository;
    }

    public async Task<ContactResponseDto> ProcessContactMessageAsync(ContactRequestDto request, string? clientIpAddress)
    {
        var messageEntity = new ContactMessage
        {
            SenderName = request.SenderName.Trim(),
            SenderEmail = request.SenderEmail.Trim(),
            Subject = string.IsNullOrWhiteSpace(request.Subject) ? "Portfolio Contact" : request.Subject.Trim(),
            MessageText = request.MessageText.Trim(),
            CreatedAtUtc = DateTime.UtcNow,
            IpAddress = clientIpAddress
        };

        var saved = await _contactRepository.SaveContactMessageAsync(messageEntity);

        return new ContactResponseDto
        {
            Success = true,
            Message = $"Thank you, {saved.SenderName}! Your message has been received by Darshan. He will get back to you shortly.",
            MessageId = saved.Id
        };
    }
}
