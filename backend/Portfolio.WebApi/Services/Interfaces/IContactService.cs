using Portfolio.WebApi.Models.DTOs;

namespace Portfolio.WebApi.Services.Interfaces;

public interface IContactService
{
    Task<ContactResponseDto> ProcessContactMessageAsync(ContactRequestDto request, string? clientIpAddress);
}
