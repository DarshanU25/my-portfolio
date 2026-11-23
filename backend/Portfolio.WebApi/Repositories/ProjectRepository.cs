using Microsoft.EntityFrameworkCore;
using Portfolio.WebApi.Data;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;

namespace Portfolio.WebApi.Repositories;

public class ProjectRepository : IProjectRepository
{
    private readonly PortfolioDbContext _dbContext;

    public ProjectRepository(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Project>> GetAllProjectsAsync()
    {
        return await _dbContext.Projects
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();
    }

    public async Task<Project?> GetProjectByIdAsync(int id)
    {
        return await _dbContext.Projects.FindAsync(id);
    }

    public async Task<IEnumerable<Project>> GetFeaturedProjectsAsync()
    {
        return await _dbContext.Projects
            .Where(p => p.IsFeatured)
            .OrderBy(p => p.DisplayOrder)
            .ToListAsync();
    }

    public async Task<Project> AddProjectAsync(Project project)
    {
        _dbContext.Projects.Add(project);
        await _dbContext.SaveChangesAsync();
        return project;
    }
}
