namespace Portfolio.WebApi.Models.DTOs;

/// <summary>
/// Payload returned by the keep-alive / ping endpoint.
/// Crucial for Render free-tier hosting to prevent cold start spin-down.
/// </summary>
public class PingResponseDto
{
    public string Status { get; set; } = "healthy";
    public string ServiceName { get; set; } = "Darshan Ubhale Portfolio API";
    public string Version { get; set; } = "1.0.0";
    public DateTime ServerTimeUtc { get; set; } = DateTime.UtcNow;
    public double UptimeSeconds { get; set; }
    public string Environment { get; set; } = "Production";
    public string GatewayStatus { get; set; } = "Connected via YARP Reverse Proxy";
    public string KeepAliveMessage { get; set; } = "Backend is alive and ready to process requests!";
}
