import React from 'react';
import {
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { RESUME_DATA } from '../data/resumeData';

export const Experience: React.FC = () => {
  const { experience, education, achievements } = RESUME_DATA;

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/20">
            Timeline
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Experience & Education Timeline
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Professional internship pod leadership at Cognizant alongside academic achievements in Artificial Intelligence and Data Science.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Work Experience */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
              <Briefcase className="w-5 h-5 text-cyan-400" />
              <span>Professional Experience</span>
            </div>

            <div className="space-y-6">
              {experience.map((exp, idx) => (
                <div
                  key={idx}
                  className="relative glass-panel rounded-2xl p-6 border border-slate-800 space-y-4"
                >
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                    <div>
                      <h3 className="text-xl font-extrabold text-white">{exp.company}</h3>
                      <p className="text-cyan-400 font-semibold text-sm">{exp.position}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <div className="space-y-2 text-xs text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <div key={rIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{resp}</span>
                      </div>
                    ))}
                  </div>

                  {/* Key Project Featured Box */}
                  <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-cyan-400" />
                        Key Project Developed: {exp.keyProject.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {exp.keyProject.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {exp.keyProject.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* Achievements Card */}
            <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Award className="w-5 h-5 text-purple-400" />
                <span>Workshops & Achievements</span>
              </div>
              {achievements.map((ach, idx) => (
                <div key={idx} className="text-xs text-slate-300 space-y-1">
                  <h4 className="font-semibold text-purple-300 text-sm">{ach.title}</h4>
                  <p className="text-slate-400 leading-relaxed">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <span>Education</span>
            </div>

            <div className="space-y-4">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2 relative"
                >
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      {edu.period}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      {edu.score}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white pt-1">{edu.degree}</h3>
                  <p className="text-xs font-medium text-slate-300">{edu.specialization}</p>
                  <p className="text-xs text-slate-400">{edu.institution}</p>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 pt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-3">
              <h4 className="font-bold text-white text-sm">Looking for an Engineer?</h4>
              <p className="text-slate-400 text-xs">
                Darshan is available for immediate hire across Full-Stack .NET, Microservices, and Generative AI roles.
              </p>
              <a
                href="#contact"
                className="inline-block px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold text-xs hover:bg-cyan-400 transition"
              >
                Send Direct Message →
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
