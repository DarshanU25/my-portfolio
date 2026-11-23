using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PingController : ControllerBase
{
    private readonly IPingService _pingService;

    public PingController(IPingService pingService)
    {
        _pingService = pingService;
    }

    /// <summary>
    /// Ping signal endpoint to verify backend health and prevent Render free tier from sleeping.
    /// Can be pinged by Google Apps Script / external cron every 5-10 minutes.
    /// </summary>
    [HttpGet]
    [HttpGet("/healthz")]
    [HttpGet("/ping")]
    [ProducesResponseType(typeof(PingResponseDto), StatusCodes.Status200OK)]
    public IActionResult GetPing()
    {
        var status = _pingService.GetPingStatus();
        return Ok(status);
    }
}
