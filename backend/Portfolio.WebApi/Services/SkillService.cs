using Portfolio.WebApi.Models.Entities;
using Portfolio.WebApi.Repositories.Interfaces;
using Portfolio.WebApi.Services.Interfaces;

namespace Portfolio.WebApi.Services;

public class SkillService : ISkillService
{
    private readonly ISkillRepository _skillRepository;

    public SkillService(ISkillRepository skillRepository)
    {
        _skillRepository = skillRepository;
    }

    public async Task<IEnumerable<Skill>> GetAllSkillsAsync()
    {
        return await _skillRepository.GetAllSkillsAsync();
    }

    public async Task<Dictionary<string, List<Skill>>> GetSkillsGroupedByCategoryAsync()
    {
        var allSkills = await _skillRepository.GetAllSkillsAsync();

        return allSkills
            .GroupBy(s => s.Category)
            .ToDictionary(g => g.Key, g => g.ToList());
    }
}
