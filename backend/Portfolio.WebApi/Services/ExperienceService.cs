using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

public class ExperienceService : IExperienceService
{
    private readonly IExperienceRepository _experienceRepository;

    public ExperienceService(IExperienceRepository experienceRepository)
    {
        _experienceRepository = experienceRepository;
    }

    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync()
    {
        return await _experienceRepository.GetAllExperiencesAsync();
    }

    public async Task<IEnumerable<Education>> GetAllEducationsAsync()
    {
        return await _experienceRepository.GetAllEducationsAsync();
    }
}
