using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SkillsController : ControllerBase
{
    private readonly ISkillService _skillService;

    public SkillsController(ISkillService skillService)
    {
        _skillService = skillService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Skill>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllSkills()
    {
        var skills = await _skillService.GetAllSkillsAsync();
        return Ok(skills);
    }

    [HttpGet("grouped")]
    [ProducesResponseType(typeof(Dictionary<string, List<Skill>>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetGroupedSkills()
    {
        var grouped = await _skillService.GetSkillsGroupedByCategoryAsync();
        return Ok(grouped);
    }
}
