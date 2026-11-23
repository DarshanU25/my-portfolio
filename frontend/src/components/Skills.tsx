import React, { useState } from 'react';
import {
  Code2,
  Brain,
  Server,
  Database,
  Cpu,
  Layers,
  Sparkles,
  GitBranch,
  Shield,
  Zap,
} from 'lucide-react';
import { RESUME_DATA, SkillItem } from '../data/resumeData';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { skills } = RESUME_DATA;

  const categories = ['All', 'Languages', 'AI/ML', 'Development', 'Data/Tools'];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 relative bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/20">
            Technical Stack
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Technical Proficiencies
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            From low-level data structures & algorithms to cloud microservices and generative AI orchestration.
          </p>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                    : 'glass-panel text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-4 rounded-xl border border-slate-800 space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                  {skill.category}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-700"
                  style={{ width: `${skill.proficiencyLevel}%` }}
                />
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>Proficiency</span>
                <span>{skill.proficiencyLevel}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Core Architecture highlights bottom banner */}
        <div className="mt-12 p-6 rounded-2xl glass-panel border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">YARP & Microservices</h4>
              <p className="text-[11px] text-slate-400">High-throughput reverse proxy routing with JWT & RBAC</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">RAG & Vector Embeddings</h4>
              <p className="text-[11px] text-slate-400">FAISS, LangChain, semantic search, and prompt engineering</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <GitBranch className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Scrum Agile Leadership</h4>
              <p className="text-[11px] text-slate-400">Pod leadership, Jira velocity tracking, and sprint planning</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
