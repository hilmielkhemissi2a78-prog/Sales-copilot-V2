'use client';

import React, { useState, useEffect } from 'react';

// ==========================================
// ICÔNES EN SVG INLINE
// ==========================================
const Icons = {
  Box: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  Clock: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Activity: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>,
  Zap: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  Refresh: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  Shield: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  Database: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>,
  Alert: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
};

// ==========================================
// MOCK DATA (VIRGULE CORRIGÉE ICI)
// ==========================================
const MOCK_DATA = [
  { 
    type: 'artefacts', 
    artefacts: [
      { id: '1', name: 'Pipeline Principal', status: 'active', lastUpdated: new Date().toISOString() },
      { id: '2', name: 'Backup Nocturne', status: 'idle', lastUpdated: new Date().toISOString() },
      { id: '3', name: 'Alert System', status: 'active', lastUpdated: new Date().toISOString() }
    ]
  },
  { 
    type: 'cronJobs', 
    cronJobs: [
      { id: '1', name: 'Daily Cleanup', schedule: '0 0 * * *', status: 'idle' },
      { id: '2', name: 'Health Check', schedule: '*/5 * * * *', status: 'running' }
    ]
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setMounted(true);
    setTimeout(() => {
      setData(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-black" />;

  const artefacts = data.find(d => d.type === 'artefacts')?.artefacts || [];
  const cronJobs = data.find(d => d.type === 'cronJobs')?.cronJobs || [];
  const activeArtefacts = artefacts.filter((a: any) => a.status === 'active').length;

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
      `}</style>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/50 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icons.Zap />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              Sales Copilot
            </h1>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className={`p-2 hover:bg-zinc-800 rounded-lg transition-colors ${loading ? 'animate-[spin_1s_linear_infinite]' : ''}`}
          >
            <Icons.Refresh />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { title: 'Artefacts', value: artefacts.length, icon: Icons.Box, color: 'blue' },
                { title: 'Actifs', value: activeArtefacts, icon: Icons.Check, color: 'green' },
                { title: 'Jobs', value: cronJobs.length, icon: Icons.Clock, color: 'purple' },
                { title: 'Running', value: cronJobs.filter((j: any) => j.status === 'running').length, icon: Icons.Activity, color: 'red' }
              ].map((stat, idx) => (
                <div 
                  key={stat.title}
                  className="opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="bg-zinc-900/50 backdrop-blur border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-all hover:scale-[1.02]">
                    <div className={`p-3 rounded-xl w-fit mb-3 ${
                      stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      stat.color === 'green' ? 'bg-emerald-500/20 text-emerald-400' :
                      stat.color === 'purple' ? 'bg-violet-500/20 text-violet-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      <stat.icon />
                    </div>
                    <h3 className="text-zinc-400 text-sm mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {['overview', 'artefacts', 'cronJobs'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab 
                      ? 'bg-white text-black' 
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              {(activeTab === 'overview' || activeTab === 'artefacts') && artefacts.length > 0 && (
                <section className="opacity-0 animate-[slideUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.2s' }}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-blue-400"><Icons.Box /></span>
                    Artefacts
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {artefacts.map((art: any, idx: number) => (
                      <div 
                        key={art.id}
                        className="group bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-all hover:shadow-2xl hover:shadow-zinc-900/50"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              art.status === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-zinc-700/50 text-zinc-400'
                            }`}>
                              <Icons.Box />
                            </div>
                            <div>
                              <h4 className="font-semibold">{art.name}</h4>
                              <span className="text-xs text-zinc-500">ID: {art.id}</span>
                            </div>
                          </div>
                          {art.status === 'active' && (
                            <span className="relative flex h-3 w-3">
                              <span className="animate-[ping_1s_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-zinc-500">
                          {new Date(art.lastUpdated).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {(activeTab === 'overview' || activeTab === 'cronJobs') && cronJobs.length > 0 && (
                <section className="opacity-0 animate-[slideUp_0.5s_ease-out_forwards]" style={{ animationDelay: '0.3s' }}>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span className="text-purple-400"><Icons.Clock /></span>
                    Jobs Programmés
                  </h2>
                  <div className="space-y-3">
                    {cronJobs.map((job: any, idx: number) => (
                      <div 
                        key={job.id}
                        className="flex items-center justify-between p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-lg ${
                            job.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-zinc-700/50 text-zinc-400'
                          }`}>
                            <Icons.Clock />
                          </div>
                          <div>
                            <h4 className="font-medium">{job.name}</h4>
                            <code className="text-xs text-zinc-500">{job.schedule}</code>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-zinc-700 text-zinc-400'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 flex items-center justify-between text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <span className="text-emerald-500"><Icons.Shield /></span>
                <span>Système opérationnel</span>
              </div>
              <div className="flex items-center gap-2">
                <Icons.Database />
                <span>Sync: {new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
