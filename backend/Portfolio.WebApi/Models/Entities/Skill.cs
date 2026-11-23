namespace Portfolio.WebApi.Models.Entities;

/// <summary>
/// Represents a technical or domain skill.
/// </summary>
public class Skill
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty; // "Languages", "AI/ML", "Development", "Data/Tools"
    public int ProficiencyLevel { get; set; } = 90; // Percentage 0 - 100
    public string IconName { get; set; } = string.Empty;
    public bool IsHighlight { get; set; } = true;
}
