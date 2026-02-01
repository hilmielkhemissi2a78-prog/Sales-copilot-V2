'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [stats, setStats] = useState({ artefacts: 0, resumes: 0, opportunities: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://sales-copilot-production-0d9c.up.railway.app/artefacts').then(r => r.json()).catch(() => []),
      fetch('https://sales-copilot-production-0d9c.up.railway.app/resumes').then(r => r.json()).catch(() => []),
      fetch('https://sales-copilot-production-0d9c.up.railway.app/opportunities').then(r => r.json()).catch(() => [])
    ]).then(([artefacts, resumes, opportunities]) => {
      setStats({
        artefacts: artefacts.length || 0,
        resumes: resumes.length || 0,
        opportunities: opportunities.length || 0
      });
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col flex-shrink-0">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-3 rounded bg-blue-600">Dashboard</Link>
          <Link href="/opportunities" className="p-3 rounded hover:bg-slate-700">AO</Link>
          <Link href="/resumes" className="p-3 rounded hover:bg-slate-700">CV</Link>
          <Link href="/matching" className="p-3 rounded hover:bg-slate-700">Matching</Link>
          <Link href="/push" className="p-3 rounded hover:bg-slate-700">Push</Link>
        </nav>
        <button onClick={() => window.location.href = '/login'} className="mt-auto p-3 text-red-400 hover:text-red-300 text-left">Déconnexion</button>
      </aside>
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        {loading ? <p>Chargement...</p> : (
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500">Artefacts</p>
              <p className="text-3xl font-bold">{stats.artefacts}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500">CV</p>
              <p className="text-3xl font-bold">{stats.resumes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-sm text-gray-500">AO</p>
              <p className="text-3xl font-bold">{stats.opportunities}</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
