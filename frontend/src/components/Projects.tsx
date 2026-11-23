import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Layers,
  Sparkles,
  Shield,
  Bot,
  Database,
  Server,
  ArrowUpRight,
  CheckCircle,
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { apiService } from '../services/apiService';
import { RESUME_DATA, ProjectItem } from '../data/resumeData';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(RESUME_DATA.projects);
  const [activeFilter, setActiveFilter] = useState<'all' | 'Enterprise' | 'AI/ML'>('all');

  useEffect(() => {
    apiService.getProjects().then((data) => {
      if (data && data.length > 0) {
        setProjects(data as ProjectItem[]);
      }
    });
  }, []);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-20 relative bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/20">
              Featured Work
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Production Projects & Systems
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl">
              Architected with .NET 9 microservices, YARP reverse proxy gateway, and enterprise-grade Generative AI pipelines.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1 rounded-xl glass-panel self-start md:self-auto">
            {(['all', 'Enterprise', 'AI/ML'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === filter
                    ? 'bg-cyan-500 text-white shadow-md shadow-cyan-500/25'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {filter === 'all' ? 'All Projects' : filter === 'Enterprise' ? 'Enterprise & .NET' : 'Generative AI'}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isEnterprise = project.category === 'Enterprise';
            const isAi = project.category === 'AI/ML';

            return (
              <div
                key={project.id}
                className="group relative rounded-2xl glass-panel glass-panel-hover p-6 border border-slate-800 flex flex-col justify-between"
              >
                {/* Top Badge & Date */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                        isEnterprise
                          ? 'bg-cyan-950/60 text-cyan-300 border-cyan-800/60'
                          : 'bg-purple-950/60 text-purple-300 border-purple-800/60'
                      }`}
                    >
                      {isEnterprise ? <Server className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                      {project.category}
                    </span>

                    <span className="font-mono text-slate-400 text-[11px]">
                      {project.datePeriod}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400/90 mt-1 mb-3">
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 mb-6">
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat.replace(/^[•-]\s*/, '')}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Tech Tags & GitHub Link */}
                <div className="pt-4 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-400 transition"
                    >
                      <GithubIcon className="w-4 h-4" />
                      <span>Source Code</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                    </a>

                    <a
                      href="#ai-features"
                      className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
                    >
                      Interactive Test →
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
