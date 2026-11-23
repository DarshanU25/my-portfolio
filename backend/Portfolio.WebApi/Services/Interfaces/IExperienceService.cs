using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Services.Interfaces;

public interface IExperienceService
{
    Task<IEnumerable<Experience>> GetAllExperiencesAsync();
    Task<IEnumerable<Education>> GetAllEducationsAsync();
}
