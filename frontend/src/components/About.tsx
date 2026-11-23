import React from 'react';
import {
  GraduationCap,
  Briefcase,
  Award,
  Terminal,
  Layers,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const About: React.FC = () => {
  const { personalInfo, education, achievements } = RESUME_DATA;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/20">
            About Me
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Bridging Enterprise Architecture with Applied Artificial Intelligence
          </h2>
          <p className="mt-4 text-slate-400 text-base leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Education */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Academic Journey</h3>
            
            <div className="space-y-4 text-xs">
              {education.map((edu, idx) => (
                <div key={idx} className="pb-3 border-b border-slate-800/80 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-semibold text-slate-200">{edu.degree}</h4>
                    <span className="text-[10px] font-mono text-cyan-400 shrink-0">{edu.period}</span>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">{edu.specialization}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{edu.institution}</p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                    {edu.score}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Cognizant Internship & Leadership */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Industry Experience</h3>
            
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm">Cognizant</h4>
                  <p className="text-cyan-400 font-medium">Intern & Project Leader</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Apr 16 – Aug 15</span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed">
                Led a 5-member Agile/Scrum pod, managing sprint deliverables on Jira while engineering the WellBeing360 employee wellness ecosystem.
              </p>

              <ul className="space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Enterprise application training & clean software delivery.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Sprint planning, task tracking, and pod coordination.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                  <span>Integrated YARP Gateway, .NET 9 microservices, & React.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: Cyber Security & Certifications */}
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Certifications & Honors</h3>

            <div className="space-y-3">
              {achievements.map((ach, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <div className="flex items-center justify-between text-purple-300 font-semibold mb-1">
                    <span>{ach.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-2">
                    Issuer: <span className="text-slate-200">{ach.issuer}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-cyan-400 block">Core Philosophy:</span>
                <p className="text-[11px] text-slate-400">
                  "Writing clear, humanized, maintainable code with robust interfaces, defensive error boundaries, and scalable cloud-native architectures."
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
