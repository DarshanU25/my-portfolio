import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Briefcase,
  Database,
  Code2,
  Send,
  Loader2,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Terminal,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import {
  apiService,
  AiAskResponse,
  AiSkillMatchResponse,
  AiSqlResponse,
  AiCodeReviewResponse,
} from '../services/apiService';

export const AiPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'avatar' | 'matcher' | 'querymind' | 'copilot'>('avatar');

  // Tab 1: AI Avatar Chat State
  const [avatarPrompt, setAvatarPrompt] = useState('');
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarResponse, setAvatarResponse] = useState<AiAskResponse | null>({
    answer:
      "Hello! I am Darshan's AI Portfolio Assistant. Ask me about his WellBeing360 platform (.NET 9 & YARP), his Cognizant internship pod leadership, or his AI Code Copilot project!",
    modelUsed: 'Darshan-Assistant-SmallModel',
    latencyMilliseconds: 12,
    suggestedFollowups: [
      'Tell me about WellBeing360 and YARP Gateway',
      'What are Darshan’s top technical skills?',
      'How was his experience as a Scrum Leader at Cognizant?',
    ],
  });

  const handleAskAvatar = async (promptToUse?: string) => {
    const text = promptToUse || avatarPrompt;
    if (!text.trim()) return;
    setAvatarLoading(true);
    try {
      const res = await apiService.askAi(text);
      setAvatarResponse(res);
      setAvatarPrompt('');
    } catch (err) {
      console.error(err);
    } finally {
      setAvatarLoading(false);
    }
  };

  // Tab 2: Skill Matcher State
  const [jobDescription, setJobDescription] = useState(
    'Looking for a Full Stack / AI Engineer skilled in .NET Core or C#, Python, React, REST microservices, and Generative AI (RAG, vector databases). Experience with Agile/Scrum is preferred.'
  );
  const [matchLoading, setMatchLoading] = useState(false);
  const [matchResponse, setMatchResponse] = useState<AiSkillMatchResponse | null>(null);

  const handleMatchSkills = async () => {
    if (!jobDescription.trim()) return;
    setMatchLoading(true);
    try {
      const res = await apiService.matchSkills(jobDescription);
      setMatchResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setMatchLoading(false);
    }
  };

  // Tab 3: QueryMind SQL State
  const [sqlPrompt, setSqlPrompt] = useState('Show top 10 employees by total wellness points accrued in the last 30 days');
  const [sqlLoading, setSqlLoading] = useState(false);
  const [sqlResponse, setSqlResponse] = useState<AiSqlResponse | null>(null);

  const handleGenerateSql = async (sample?: string) => {
    const query = sample || sqlPrompt;
    if (!query.trim()) return;
    setSqlLoading(true);
    try {
      const res = await apiService.generateSql(query);
      setSqlResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSqlLoading(false);
    }
  };

  // Tab 4: AI Code Copilot State
  const [codeSnippet, setCodeSnippet] = useState(
`// Check for duplicate user emails
public bool HasDuplicateEmails(List<string> emails) {
    for (int i = 0; i < emails.Count; i++) {
        for (int j = i + 1; j < emails.Count; j++) {
            if (emails[i] == emails[j]) {
                return true;
            }
        }
    }
    return false;
}`
  );
  const [codeLang, setCodeLang] = useState('C#');
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeResponse, setCodeResponse] = useState<AiCodeReviewResponse | null>(null);

  const handleReviewCode = async () => {
    if (!codeSnippet.trim()) return;
    setCodeLoading(true);
    try {
      const res = await apiService.reviewCode(codeSnippet, codeLang);
      setCodeResponse(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCodeLoading(false);
    }
  };

  return (
    <section id="ai-features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-semibold text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Backend AI Micro-Features</span>
          </div>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white tracking-tight">
            AI Engineering in Action
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Test the small, high-throughput AI feature models running directly on Darshan's backend. Fast, deterministic, and easily maintainable.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-8">
          <button
            onClick={() => setActiveTab('avatar')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'avatar'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-4 h-4 text-cyan-300" />
            <span>Darshan's AI Avatar</span>
          </button>

          <button
            onClick={() => setActiveTab('matcher')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'matcher'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-slate-400 hover:text-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4 text-emerald-300" />
            <span>Job Skill Matcher</span>
          </button>

          <button
            onClick={() => setActiveTab('querymind')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'querymind'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4 text-amber-300" />
            <span>QueryMind SQL Generator</span>
          </button>

          <button
            onClick={() => setActiveTab('copilot')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'copilot'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-4 h-4 text-purple-300" />
            <span>AI Code Copilot Reviewer</span>
          </button>
        </div>

        {/* Tab 1: AI Avatar */}
        {activeTab === 'avatar' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Ask Darshan's AI Avatar</h3>
                  <p className="text-xs text-slate-400">Powered by RAG context & lightweight backend inference</p>
                </div>
              </div>

              {avatarResponse && (
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800/60">
                  {avatarResponse.modelUsed} ({avatarResponse.latencyMilliseconds}ms)
                </span>
              )}
            </div>

            {/* Answer Box */}
            {avatarResponse && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {avatarResponse.answer}
                </p>

                {avatarResponse.suggestedFollowups.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 block mb-2">Suggested Follow-ups:</span>
                    <div className="flex flex-wrap gap-2">
                      {avatarResponse.suggestedFollowups.map((sug, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAskAvatar(sug)}
                          className="text-[11px] px-3 py-1 rounded-full glass-panel text-cyan-300 hover:border-cyan-400 transition flex items-center gap-1"
                        >
                          <span>{sug}</span>
                          <ChevronRight className="w-3 h-3 opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskAvatar();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={avatarPrompt}
                onChange={(e) => setAvatarPrompt(e.target.value)}
                placeholder="Ask about WellBeing360, YARP, Cognizant pod, or his technical skills..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                type="submit"
                disabled={avatarLoading || !avatarPrompt.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 transition shadow-lg shadow-cyan-500/20"
              >
                {avatarLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Ask</span>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Recruiter Skill Matcher */}
        {activeTab === 'matcher' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-400" />
                Recruiter Skill & Job Description Matcher
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Paste any job description or list of required skills to calculate instant alignment with Darshan's verified resume.
              </p>
            </div>

            <textarea
              rows={4}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste Job Description here..."
              className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />

            <div className="flex justify-end">
              <button
                onClick={handleMatchSkills}
                disabled={matchLoading || !jobDescription.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:from-emerald-400 hover:to-teal-500 transition shadow-lg shadow-emerald-500/20"
              >
                {matchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Calculate Match Score</span>
              </button>
            </div>

            {matchResponse && (
              <div className="p-5 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                      {matchResponse.matchPercentage}%
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block">Overall Match Alignment</span>
                      <span className="text-[11px] text-slate-400">{matchResponse.matchSummary}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-2">Matched Competencies:</span>
                  <div className="flex flex-wrap gap-2">
                    {matchResponse.matchingSkillsFound.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-1 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 flex items-center gap-1.5"
                      >
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-xs font-semibold text-cyan-400 block mb-1">Tailored Candidate Pitch:</span>
                  <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{matchResponse.whyHireDarshanPitch}"
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: QueryMind SQL Sandbox */}
        {activeTab === 'querymind' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-amber-400" />
                  QueryMind AI – SQL Generator & Safeguards
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Translates natural language to SQL with strict anti-destructive security filters (Project: Jan 2026).
                </p>
              </div>
              <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60">
                Gemini SQL Engine
              </span>
            </div>

            {/* Quick test prompt chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleGenerateSql('Show top 10 employees by wellness points')}
                className="text-[11px] px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 transition"
              >
                Top 10 Employees
              </button>
              <button
                onClick={() => handleGenerateSql('Count active tasks grouped by status')}
                className="text-[11px] px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-amber-300 border border-slate-700 transition"
              >
                Group Tasks by Status
              </button>
              <button
                onClick={() => handleGenerateSql('DROP TABLE users;')}
                className="text-[11px] px-3 py-1 rounded-lg bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-rose-800/60 transition"
                title="Test anti-destructive safeguard"
              >
                Test Dangerous Query (DROP)
              </button>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={sqlPrompt}
                onChange={(e) => setSqlPrompt(e.target.value)}
                placeholder="Ask in natural language e.g. Find all active projects..."
                className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                onClick={() => handleGenerateSql()}
                disabled={sqlLoading || !sqlPrompt.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:from-amber-400 hover:to-orange-500 transition shadow-lg shadow-amber-500/20"
              >
                {sqlLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Terminal className="w-4 h-4" />}
                <span>Generate SQL</span>
              </button>
            </div>

            {sqlResponse && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800">
                  <span className="text-slate-400 font-semibold">Generated SQL Output:</span>
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded ${
                      sqlResponse.isSafeQuery
                        ? 'text-emerald-400 bg-emerald-950/60 border border-emerald-800/60'
                        : 'text-rose-400 bg-rose-950/60 border border-rose-800/60'
                    }`}
                  >
                    {sqlResponse.isSafeQuery ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {sqlResponse.isSafeQuery ? 'Safeguard Passed' : 'Blocked Violation'}
                  </span>
                </div>

                <pre className="text-xs text-amber-300 overflow-x-auto p-3 rounded bg-slate-950 border border-slate-800 leading-relaxed">
                  {sqlResponse.generatedSql}
                </pre>

                <p className="text-xs text-slate-300 font-sans">
                  <strong className="text-slate-100">Explanation: </strong>
                  {sqlResponse.explanation}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: AI Code Copilot Sandbox */}
        {activeTab === 'copilot' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 max-w-4xl mx-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-400" />
                  AI Code Copilot – Code Review & Complexity Analyzer
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Repository-aware AI assistant simulating FAISS/LangChain RAG code analysis (Project: Mar 2026).
                </p>
              </div>
              <select
                value={codeLang}
                onChange={(e) => setCodeLang(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs text-purple-300 rounded-lg px-2.5 py-1.5 focus:outline-none"
              >
                <option value="C#">C#</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
              </select>
            </div>

            <textarea
              rows={8}
              value={codeSnippet}
              onChange={(e) => setCodeSnippet(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl bg-slate-950 border border-slate-800 text-purple-200 placeholder-slate-600 focus:outline-none focus:border-purple-400 font-mono leading-relaxed"
            />

            <div className="flex justify-end">
              <button
                onClick={handleReviewCode}
                disabled={codeLoading || !codeSnippet.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 hover:from-purple-400 hover:to-indigo-500 transition shadow-lg shadow-purple-500/20"
              >
                {codeLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                <span>Analyze Code Snippet</span>
              </button>
            </div>

            {codeResponse && (
              <div className="p-4 rounded-xl bg-slate-900/90 border border-purple-500/30 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                  <span className="text-slate-300">
                    Estimated Complexity: <strong className="text-purple-400 font-mono">{codeResponse.timeComplexity}</strong>
                  </span>
                  <span className="text-[11px] text-slate-400">{codeResponse.explanation}</span>
                </div>

                <div>
                  <span className="text-xs font-semibold text-slate-300 block mb-1">Copilot Suggestions:</span>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {codeResponse.suggestions.map((sug, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{sug}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t border-slate-800 font-mono">
                  <span className="text-[11px] text-slate-400 block mb-1">Refactored Preview:</span>
                  <pre className="text-xs text-slate-200 p-2.5 rounded bg-slate-950 border border-slate-800 overflow-x-auto">
                    {codeResponse.refactoredCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
