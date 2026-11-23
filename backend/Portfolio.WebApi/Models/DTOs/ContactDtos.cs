using System.ComponentModel.DataAnnotations;

namespace Portfolio.WebApi.Models.DTOs;

public class ContactRequestDto
{
    [Required(ErrorMessage = "Name is required")]
    [MaxLength(100)]
    public string SenderName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string SenderEmail { get; set; } = string.Empty;

    [MaxLength(150)]
    public string Subject { get; set; } = "General Inquiry";

    [Required(ErrorMessage = "Message is required")]
    [MinLength(5, ErrorMessage = "Message must be at least 5 characters")]
    [MaxLength(2000)]
    public string MessageText { get; set; } = string.Empty;
}

public class ContactResponseDto
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public int? MessageId { get; set; }
}
