using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Services.Interfaces;

public interface IProjectService
{
    Task<IEnumerable<Project>> GetAllProjectsAsync();
    Task<Project?> GetProjectByIdAsync(int id);
    Task<IEnumerable<Project>> GetFeaturedProjectsAsync();
}
