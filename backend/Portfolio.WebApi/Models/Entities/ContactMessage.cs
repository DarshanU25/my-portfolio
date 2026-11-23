namespace Portfolio.WebApi.Models.Entities;

/// <summary>
/// Represents a message left by a visitor or recruiter through the contact form.
/// </summary>
public class ContactMessage
{
    public int Id { get; set; }
    public string SenderName { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string MessageText { get; set; } = string.Empty;
    public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
    public string? IpAddress { get; set; }
    public bool IsRead { get; set; } = false;
}
