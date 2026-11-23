using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly IProjectService _projectService;

    public ProjectsController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Project>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllProjects([FromQuery] bool featuredOnly = false)
    {
        var projects = featuredOnly
            ? await _projectService.GetFeaturedProjectsAsync()
            : await _projectService.GetAllProjectsAsync();

        return Ok(projects);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(Project), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetProjectById(int id)
    {
        var project = await _projectService.GetProjectByIdAsync(id);
        if (project == null)
        {
            return NotFound(new { message = $"Project with ID {id} not found." });
        }

        return Ok(project);
    }
}
