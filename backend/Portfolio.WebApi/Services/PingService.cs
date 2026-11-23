using System.Diagnostics;
using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

public class PingService : IPingService
{
    private static readonly DateTime ServiceStartTimeUtc = DateTime.UtcNow;

    public PingResponseDto GetPingStatus()
    {
        var uptimeSpan = DateTime.UtcNow - ServiceStartTimeUtc;

        return new PingResponseDto
        {
            Status = "healthy",
            ServiceName = "Darshan Ubhale Portfolio WebAPI & Gateway",
            Version = "1.0.0",
            ServerTimeUtc = DateTime.UtcNow,
            UptimeSeconds = Math.Round(uptimeSpan.TotalSeconds, 2),
            Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            GatewayStatus = "Active YARP Gateway",
            KeepAliveMessage = $"Service is warm and running for {uptimeSpan.Hours}h {uptimeSpan.Minutes}m {uptimeSpan.Seconds}s. Ready for requests."
        };
    }
}
