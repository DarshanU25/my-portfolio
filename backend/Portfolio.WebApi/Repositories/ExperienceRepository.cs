using Microsoft.EntityFrameworkCore;
using Portfolio.WebApi.Data;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;

namespace Portfolio.WebApi.Repositories;

public class ExperienceRepository : IExperienceRepository
{
    private readonly PortfolioDbContext _dbContext;

    public ExperienceRepository(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Experience>> GetAllExperiencesAsync()
    {
        return await _dbContext.Experiences.ToListAsync();
    }

    public async Task<IEnumerable<Education>> GetAllEducationsAsync()
    {
        return await _dbContext.Educations
            .OrderBy(e => e.DisplayOrder)
            .ToListAsync();
    }
}
