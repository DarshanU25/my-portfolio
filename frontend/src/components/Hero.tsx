import React from 'react';
import {
  Mail,
  Phone,
  ArrowRight,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { RESUME_DATA } from '../data/resumeData';

export const Hero: React.FC = () => {
  const { personalInfo } = RESUME_DATA;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background radial glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/10 to-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 blur-[90px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel text-xs font-medium text-cyan-400 border border-cyan-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Available for Full-Time & Engineering Opportunities</span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">{personalInfo.name}</span>
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-semibold text-slate-300">
                {personalInfo.title}
              </p>
            </div>

            {/* Bio summary */}
            <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Specialized in building robust enterprise systems with <span className="text-cyan-300 font-medium">.NET 9 & YARP Gateway</span>, and production-grade Generative AI applications powered by <span className="text-blue-300 font-medium">RAG, FAISS, and Gemini API</span>. Former Scrum Pod Leader during my Cognizant internship.
            </p>

            {/* Social & Contact Quick Links */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg glass-panel hover:border-cyan-400/50 hover:text-cyan-300 transition text-slate-300"
              >
                <GithubIcon className="w-4 h-4 text-slate-200" />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg glass-panel hover:border-cyan-400/50 hover:text-cyan-300 transition text-slate-300"
              >
                <LinkedinIcon className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg glass-panel hover:border-cyan-400/50 hover:text-cyan-300 transition text-slate-300"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{personalInfo.email}</span>
              </a>

              <a
                href={`tel:${personalInfo.phone}`}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg glass-panel hover:border-cyan-400/50 hover:text-cyan-300 transition text-slate-300"
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <span>{personalInfo.phone}</span>
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 hover:from-cyan-400 hover:to-blue-500 transition-all hover:scale-105"
              >
                <span>View Key Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#ai-features"
                className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-cyan-300 font-semibold text-sm border border-cyan-500/40 hover:bg-slate-800/80 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Test Live AI Features</span>
              </a>
            </div>

            {/* Metric pill row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-white font-mono">.NET 9</p>
                <p className="text-xs text-slate-400">YARP & Microservices</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-cyan-400 font-mono">GenAI</p>
                <p className="text-xs text-slate-400">RAG, FAISS & Gemini</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-bold text-blue-400 font-mono">Cognizant</p>
                <p className="text-xs text-slate-400">Agile Pod Leader</p>
              </div>
            </div>

          </div>

          {/* Right Column: Code & Architecture Showcase Terminal */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative gradient border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 opacity-30 blur-lg" />
              
              <div className="relative glass-panel rounded-2xl p-5 border border-slate-700/80 shadow-2xl space-y-4">
                
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    architecture.config.cs
                  </span>
                  <span className="text-[10px] text-cyan-400/80 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50 font-mono">
                    YARP Gateway
                  </span>
                </div>

                {/* Code display */}
                <div className="font-mono text-xs leading-relaxed text-slate-300 space-y-2 overflow-x-auto py-1">
                  <p className="text-slate-500">// Darshan Ubhale Architecture Stack</p>
                  <p>
                    <span className="text-purple-400">public class</span> <span className="text-cyan-300">PortfolioGateway</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-slate-400">[ReverseProxyRoute(</span>
                    <span className="text-amber-300">"/api/v1/wellbeing"</span>
                    <span className="text-slate-400">)]</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-blue-400">public</span> <span className="text-cyan-400">YarpPipeline</span> <span className="text-emerald-400">RouteToMicroservices</span>()
                  </p>
                  <p className="pl-4 text-slate-400">{"{"}</p>
                  <p className="pl-8 text-slate-300">
                    <span className="text-cyan-400">Cluster</span>: <span className="text-amber-300">"4x ASP.NET Microservices"</span>,
                  </p>
                  <p className="pl-8 text-slate-300">
                    <span className="text-cyan-400">Auth</span>: <span className="text-amber-300">"JWT + Role-Based"</span>,
                  </p>
                  <p className="pl-8 text-slate-300">
                    <span className="text-cyan-400">AiRAG</span>: <span className="text-amber-300">"FastAPI + LangChain + FAISS"</span>,
                  </p>
                  <p className="pl-8 text-slate-300">
                    <span className="text-cyan-400">Database</span>: <span className="text-amber-300">"EF Core / SQL Server"</span>
                  </p>
                  <p className="pl-4 text-slate-400">{"}"}</p>
                </div>

                {/* Live Feature Highlights Card inside terminal */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-200 font-semibold">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                      <Cpu className="w-3.5 h-3.5" />
                      Core Engineering Strengths
                    </span>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                      Production Ready
                    </span>
                  </div>
                  <ul className="space-y-1 text-slate-300 text-[11px]">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>ASP.NET Core Web API, YARP Gateway & EF Core</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>RAG Pipelines with LangChain, FAISS & Gemini API</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>React, TypeScript & Tailwind CSS modern interfaces</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>Scrum Project Leader with Jira delivery track record</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
