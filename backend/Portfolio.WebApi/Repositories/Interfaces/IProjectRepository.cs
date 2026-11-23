using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Repositories.Interfaces;

public interface IProjectRepository
{
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<Project?> GetProjectByIdAsync(int id);
    Task<IEnumerable<Project>> GetFeaturedProjectsAsync();
    Task<Project> AddProjectAsync(Project project);
}
