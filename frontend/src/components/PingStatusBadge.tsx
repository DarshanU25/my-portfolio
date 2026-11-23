import React, { useState, useEffect } from 'react';
import { Activity, RefreshCw, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-react';
import { apiService, PingResponse } from '../services/apiService';

export const PingStatusBadge: React.FC = () => {
  const [pingData, setPingData] = useState<PingResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const performPing = async () => {
    setLoading(true);
    try {
      const result = await apiService.ping();
      setPingData(result);
    } catch (e) {
      console.error('Ping check error', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performPing();
    // Auto-ping every 4 minutes (240s) while user is browsing to keep Render warm
    const interval = setInterval(performPing, 240000);
    return () => clearInterval(interval);
  }, []);

  const isHealthy = pingData?.status === 'healthy';

  return (
    <div className="relative">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full glass-panel hover:border-cyan-500/50 transition-all text-slate-300"
        title="Backend Health & Render Keep-Alive Status"
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isHealthy ? 'bg-emerald-400' : 'bg-cyan-400'
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isHealthy ? 'bg-emerald-500' : 'bg-cyan-500'
            }`}
          />
        </span>
        <span className="hidden sm:inline">
          {isHealthy ? 'Backend Active' : 'API Standby'}
        </span>
        {pingData?.latencyMs !== undefined && (
          <span className="text-slate-400 text-[10px]">({pingData.latencyMs}ms)</span>
        )}
      </button>

      {/* Expanded status card dropdown */}
      {isExpanded && (
        <div className="absolute right-0 mt-2 w-80 glass-panel p-4 rounded-xl shadow-2xl z-50 text-xs border border-cyan-500/30">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700/60 mb-2">
            <span className="font-semibold text-slate-100 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              YARP & WebAPI Keep-Alive
            </span>
            <button
              onClick={performPing}
              disabled={loading}
              className="text-cyan-400 hover:text-cyan-300 p-1 hover:bg-slate-800 rounded transition"
              title="Ping Backend Now"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Gateway:</span>
              <span className="text-cyan-400 font-mono">YARP Reverse Proxy</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Architecture:</span>
              <span className="text-slate-200">Controller • Service • Repo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Render Host:</span>
              <span className="text-emerald-400 font-mono">
                {isHealthy ? 'Live (Keep-Alive Active)' : 'Warmup / Standby'}
              </span>
            </div>
            {pingData?.uptimeSeconds !== undefined && (
              <div className="flex justify-between">
                <span className="text-slate-400">Uptime:</span>
                <span className="font-mono text-slate-300">{Math.round(pingData.uptimeSeconds)}s</span>
              </div>
            )}
            <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-start gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>
                Render free tier is kept awake via automated Google Apps Script timer pinging <code className="text-cyan-300">/api/ping</code> every 5 mins.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
