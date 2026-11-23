namespace Portfolio.WebApi.Models.Entities;

/// <summary>
/// Professional work experience or internship entry.
/// </summary>
public class Experience
{
    public int Id { get; set; }
    public string Company { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public string Responsibilities { get; set; } = string.Empty; // Newline separated bullet points
    public string KeyProjectTitle { get; set; } = string.Empty;
    public string KeyProjectDescription { get; set; } = string.Empty;
    public string TechnologiesUsed { get; set; } = string.Empty;
}
