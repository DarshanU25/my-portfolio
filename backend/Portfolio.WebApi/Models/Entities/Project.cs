namespace Portfolio.WebApi.Models.Entities;

/// <summary>
/// Represents a software project showcased in Darshan Ubhale's portfolio.
/// </summary>
public class Project
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Subtitle { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string TechStack { get; set; } = string.Empty; // Comma separated or JSON
    public string Features { get; set; } = string.Empty; // JSON or newline separated key highlights
    public string? GithubUrl { get; set; }
    public string? LiveDemoUrl { get; set; }
    public string Category { get; set; } = "FullStack"; // FullStack, AI/ML, Enterprise
    public string DatePeriod { get; set; } = string.Empty;
    public bool IsFeatured { get; set; } = true;
    public int DisplayOrder { get; set; } = 0;
}
