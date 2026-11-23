using Portfolio.WebApi.Models.Entities;

namespace Portfolio.WebApi.Services.Interfaces;

public interface ISkillService
{
    Task<IEnumerable<Skill>> GetAllSkillsAsync();
    Task<Dictionary<string, List<Skill>>> GetSkillsGroupedByCategoryAsync();
}
