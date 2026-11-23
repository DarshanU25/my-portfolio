using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpPost]
    [ProducesResponseType(typeof(ContactResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SubmitContactMessage([FromBody] ContactRequestDto request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString();
        var response = await _contactService.ProcessContactMessageAsync(request, clientIp);
        return Ok(response);
    }
}
