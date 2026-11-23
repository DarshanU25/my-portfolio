import React from 'react';
import { Mail, Heart, Terminal, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { RESUME_DATA } from '../data/resumeData';

export const Footer: React.FC = () => {
  const { personalInfo } = RESUME_DATA;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs">
              DU
            </div>
            <div>
              <span className="font-bold text-white text-sm">Darshan Ubhale</span>
              <p className="text-[11px] text-slate-400">AI & Data Science • .NET 9 • YARP Gateway</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-cyan-400 hover:bg-slate-900 transition"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg hover:text-cyan-400 hover:bg-slate-900 transition"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="p-2 rounded-lg hover:text-cyan-400 hover:bg-slate-900 transition"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800 transition ml-2"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Darshan Ubhale. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            <span>Built with React, .NET 9 WebAPI, YARP Reverse Proxy & Tailwind CSS.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
