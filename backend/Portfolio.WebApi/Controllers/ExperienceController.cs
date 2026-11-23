using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExperienceController : ControllerBase
{
    private readonly IExperienceService _experienceService;

    public ExperienceController(IExperienceService experienceService)
    {
        _experienceService = experienceService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Experience>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetExperiences()
    {
        var experiences = await _experienceService.GetAllExperiencesAsync();
        return Ok(experiences);
    }

    [HttpGet("education")]
    [ProducesResponseType(typeof(IEnumerable<Education>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetEducations()
    {
        var educations = await _experienceService.GetAllEducationsAsync();
        return Ok(educations);
    }
}
