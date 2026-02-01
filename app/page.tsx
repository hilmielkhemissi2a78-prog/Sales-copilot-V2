'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [artefacts, setArtefacts] = useState<any[]>([]);
  const [cronJobs, setCronJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation data (remplace par ton vrai fetch si besoin)
    setArtefacts([
      { id: '1', name: 'Pipeline Principal', status: 'active' },
      { id: '2', name: 'Backup Nocturne', status: 'idle' },
      { id: '3', name: 'Alert System', status: 'active' }
    ]);
    setCronJobs([
      { id: '1', name: 'Daily Cleanup', status: 'idle' },
      { id: '2', name: 'Health Check', status: 'running' }
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="flex h-screen">
      {/* SIDEBAR INLINE */}
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col flex-shrink-0">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-3 rounded bg-blue-600">Dashboard</Link>
          <Link href="/opportunities" className="p-3 rounded hover:bg-slate-700">AO</Link>
          <Link href="/resumes" className="p-3 rounded hover:bg-slate-700">CV</Link>
          <Link href="/matching" className="p-3 rounded hover:bg-slate-700">Matching</Link>
          <Link href="/push" className="p-3 rounded hover:bg-slate-700">Push</Link>
        </nav>
        <button onClick={() => window.location.href = '/login'} className="mt-auto p-3 text-red-400 hover:text-red-300 text-left">
          Déconnexion
        </button>
      </aside>

      {/* CONTENU DASHBOARD */}
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500 mb-1">Artefacts</p>
                  <p className="text-3xl font-bold text-gray-900">{artefacts.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500 mb-1">Actifs</p>
                  <p className="text-3xl font-bold text-green-600">
                    {artefacts.filter((a) => a.status === 'active').length}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500 mb-1">Jobs Total</p>
                  <p className="text-3xl font-bold text-gray-900">{cronJobs.length}</p>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <p className="text-sm text-gray-500 mb-1">En cours</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {cronJobs.filter((j) => j.status === 'running').length}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Artefacts</h2>
                  <div className="space-y-3">
                    {artefacts.map((art) => (
                      <div key={art.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                          <h3 className="font-semibold text-gray-900">{art.name}</h3>
                          <p className="text-xs text-gray-500">ID: {art.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          art.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {art.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Jobs Programmés</h2>
                  <div className="space-y-3">
                    {cronJobs.map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                          <h3 className="font-semibold text-gray-900">{job.name}</h3>
                          <p className="text-xs text-gray-500">ID: {job.id}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          job.status === 'running' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
