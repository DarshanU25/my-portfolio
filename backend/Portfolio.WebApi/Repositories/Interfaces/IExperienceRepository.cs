using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Repositories.Interfaces;

public interface IExperienceRepository
{
    Task<IEnumerable<Experience>> GetAllExperiencesAsync();
    Task<IEnumerable<Education>> GetAllEducationsAsync();
}
