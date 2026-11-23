using Portfolio.WebApi.Models.DTOs;

namespace Portfolio.WebApi.Services.Interfaces;

public interface IPingService
{
    PingResponseDto GetPingStatus();
}
