using Portfolio.WebApi.Models.DTOs;

namespace Portfolio.WebApi.Services.Interfaces;

/// <summary>
/// AI Features service powering the intelligent backend endpoints:
/// - Smart recruiter Q&A assistant (Darshan's avatar)
/// - Job description skill matching algorithm
/// - QueryMind AI SQL generator
/// - AI Code Copilot code review & explanation
/// </summary>
public interface IAiFeatureService
{
    Task<AiAskResponseDto> AnswerQuestionAsync(AiAskRequestDto request);
    Task<AiSkillMatchResponseDto> MatchJobSkillsAsync(AiSkillMatchRequestDto request);
    Task<AiSqlGenerateResponseDto> GenerateSqlQueryAsync(AiSqlGenerateRequestDto request);
    Task<AiCodeReviewResponseDto> ReviewCodeSnippetAsync(AiCodeReviewRequestDto request);
}
