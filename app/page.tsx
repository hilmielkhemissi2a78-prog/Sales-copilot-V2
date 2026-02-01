'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    // Simulation chargement données
    setTimeout(() => {
      setData([
        {
          type: 'artefacts',
          artefacts: [
            { id: '1', name: 'Pipeline Principal', status: 'active' },
            { id: '2', name: 'Backup Nocturne', status: 'idle' },
            { id: '3', name: 'Alert System', status: 'active' }
          ]
        },
        {
          type: 'cronJobs',
          cronJobs: [
            { id: '1', name: 'Daily Cleanup', status: 'idle' },
            { id: '2', name: 'Health Check', status: 'running' }
          ]
        }
      ]);
    }, 500);
  }, []);

  // PROTECTION HYDRATION: Affichage simple si pas encore monté
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Chargement...</p>
        </div>
      </div>
    );
  }

  const artefacts = data.find(d => d.type === 'artefacts')?.artefacts || [];
  const cronJobs = data.find(d => d.type === 'cronJobs')?.cronJobs || [];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header simple */}
      <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold">Sales Copilot</h1>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 text-sm"
        >
          Actualiser
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-400 text-sm">Artefacts</p>
          <p className="text-2xl font-bold">{artefacts.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-400 text-sm">Actifs</p>
          <p className="text-2xl font-bold text-emerald-400">
            {artefacts.filter((a: any) => a.status === 'active').length}
          </p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-400 text-sm">Jobs Total</p>
          <p className="text-2xl font-bold">{cronJobs.length}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
          <p className="text-zinc-400 text-sm">En cours</p>
          <p className="text-2xl font-bold text-blue-400">
            {cronJobs.filter((j: any) => j.status === 'running').length}
          </p>
        </div>
      </div>

      {/* Liste Artefacts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-400">Artefacts</h2>
        {artefacts.length === 0 ? (
          <p className="text-zinc-500">Aucun artefact</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {artefacts.map((art: any) => (
              <div key={art.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{art.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    art.status === 'active' ? 'bg-emerald-900 text-emerald-400' : 'bg-zinc-800 text-zinc-400'
                  }`}>
                    {art.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500">ID: {art.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Liste Jobs */}
      <div>
        <h2 className="text-xl font-bold mb-4 text-purple-400">Jobs Programmés</h2>
        {cronJobs.length === 0 ? (
          <p className="text-zinc-500">Aucun job</p>
        ) : (
          <div className="space-y-2">
            {cronJobs.map((job: any) => (
              <div key={job.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{job.name}</h3>
                </div>
                <span className={`text-xs px-2 py-1 rounded ${
                  job.status === 'running' ? 'bg-blue-900 text-blue-400' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-zinc-800 text-sm text-zinc-500 flex justify-between">
        <span>System OK</span>
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}
