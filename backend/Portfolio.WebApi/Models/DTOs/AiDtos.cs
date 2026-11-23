namespace Portfolio.WebApi.Models.DTOs;

/// <summary>
/// DTO for the AI Portfolio Assistant (Ask Darshan's AI Avatar).
/// </summary>
public class AiAskRequestDto
{
    public string Prompt { get; set; } = string.Empty;
    public string? ConversationContext { get; set; }
}

public class AiAskResponseDto
{
    public string Answer { get; set; } = string.Empty;
    public string ModelUsed { get; set; } = "DarshanPortfolio-SmallLLM-v1";
    public double LatencyMilliseconds { get; set; }
    public List<string> SuggestedFollowups { get; set; } = new();
}

/// <summary>
/// DTO for the AI Recruiter / Job Description Skill Matcher.
/// </summary>
public class AiSkillMatchRequestDto
{
    public string JobDescription { get; set; } = string.Empty;
    public string TargetRole { get; set; } = "Full Stack / AI Engineer";
}

public class AiSkillMatchResponseDto
{
    public int MatchPercentage { get; set; }
    public string MatchSummary { get; set; } = string.Empty;
    public List<string> MatchingSkillsFound { get; set; } = new();
    public List<string> GrowthOpportunities { get; set; } = new();
    public string WhyHireDarshanPitch { get; set; } = string.Empty;
}

/// <summary>
/// DTO for the QueryMind AI SQL Generator simulation.
/// </summary>
public class AiSqlGenerateRequestDto
{
    public string NaturalLanguageQuery { get; set; } = string.Empty;
    public string TargetDialect { get; set; } = "MySQL / SQL Server";
}

public class AiSqlGenerateResponseDto
{
    public string GeneratedSql { get; set; } = string.Empty;
    public string Explanation { get; set; } = string.Empty;
    public bool IsSafeQuery { get; set; } = true;
    public string SafetyNotes { get; set; } = "Verified: No DROP, TRUNCATE, or dangerous destructive commands.";
}

/// <summary>
/// DTO for the AI Code Copilot code explainer simulation.
/// </summary>
public class AiCodeReviewRequestDto
{
    public string CodeSnippet { get; set; } = string.Empty;
    public string ProgrammingLanguage { get; set; } = "C#";
}

public class AiCodeReviewResponseDto
{
    public string Explanation { get; set; } = string.Empty;
    public string TimeComplexity { get; set; } = string.Empty;
    public List<string> Suggestions { get; set; } = new();
    public string RefactoredCode { get; set; } = string.Empty;
}
