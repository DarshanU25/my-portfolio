using Microsoft.AspNetCore.Mvc;
using Portfolio.WebApi.Models.DTOs;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Controllers;

[ApiController]
[Route("api/ai")]
public class AiFeaturesController : ControllerBase
{
    private readonly IAiFeatureService _aiFeatureService;

    public AiFeaturesController(IAiFeatureService aiFeatureService)
    {
        _aiFeatureService = aiFeatureService;
    }

    /// <summary>
    /// Ask Darshan's AI Avatar / Copilot about skills, projects, and experience.
    /// </summary>
    [HttpPost("ask")]
    [ProducesResponseType(typeof(AiAskResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> AskAvatar([FromBody] AiAskRequestDto request)
    {
        var result = await _aiFeatureService.AnswerQuestionAsync(request);
        return Ok(result);
    }

    /// <summary>
    /// Analyzes a job description or skill requirements against Darshan's resume.
    /// </summary>
    [HttpPost("skill-match")]
    [ProducesResponseType(typeof(AiSkillMatchResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> MatchSkills([FromBody] AiSkillMatchRequestDto request)
    {
        var result = await _aiFeatureService.MatchJobSkillsAsync(request);
        return Ok(result);
    }

    /// <summary>
    /// Simulates QueryMind AI (translates natural language into SQL with safety guards).
    /// </summary>
    [HttpPost("generate-sql")]
    [ProducesResponseType(typeof(AiSqlGenerateResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> GenerateSql([FromBody] AiSqlGenerateRequestDto request)
    {
        var result = await _aiFeatureService.GenerateSqlQueryAsync(request);
        return Ok(result);
    }

    /// <summary>
    /// Simulates AI Code Copilot (reviews code, calculates time complexity, provides refactor).
    /// </summary>
    [HttpPost("explain-code")]
    [ProducesResponseType(typeof(AiCodeReviewResponseDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> ReviewCode([FromBody] AiCodeReviewRequestDto request)
    {
        var result = await _aiFeatureService.ReviewCodeSnippetAsync(request);
        return Ok(result);
    }
}
