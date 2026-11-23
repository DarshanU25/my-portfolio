using Microsoft.EntityFrameworkCore;
using Portfolio.WebApi.Data;
using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;

namespace Portfolio.WebApi.Repositories;

public class SkillRepository : ISkillRepository
{
    private readonly PortfolioDbContext _dbContext;

    public SkillRepository(PortfolioDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<IEnumerable<Skill>> GetAllSkillsAsync()
    {
        return await _dbContext.Skills
            .OrderByDescending(s => s.ProficiencyLevel)
            .ToListAsync();
    }

    public async Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(string category)
    {
        return await _dbContext.Skills
            .Where(s => s.Category.ToLower() == category.ToLower())
            .OrderByDescending(s => s.ProficiencyLevel)
            .ToListAsync();
    }
}
