namespace Portfolio.WebApi.Models.Entities;

/// <summary>
/// Formal academic education background.
/// </summary>
public class Education
{
    public int Id { get; set; }
    public string Institution { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string Specialization { get; set; } = string.Empty;
    public string Score { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public int DisplayOrder { get; set; } = 0;
}
