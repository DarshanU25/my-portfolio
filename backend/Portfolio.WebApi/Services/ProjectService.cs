using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<Project>> GetAllProjectsAsync()
    {
        return await _projectRepository.GetAllProjectsAsync();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _projectRepository.GetProjectByIdAsync(id);
    }

    public async Task<IEnumerable<Project>> GetFeaturedProjectsAsync()
    {
        return await _projectRepository.GetFeaturedProjectsAsync();
    }
}
