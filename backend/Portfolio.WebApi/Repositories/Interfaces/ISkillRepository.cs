using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Repositories.Interfaces;

public interface ISkillRepository
{
    Task<IEnumerable<Skill>> GetAllSkillsAsync();
    Task<IEnumerable<Skill>> GetSkillsByCategoryAsync(string category);
}
