'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Matching() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sales-copilot-production-0d9c.up.railway.app/matching')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col flex-shrink-0">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-3 rounded hover:bg-slate-700">Dashboard</Link>
          <Link href="/opportunities" className="p-3 rounded hover:bg-slate-700">AO</Link>
          <Link href="/resumes" className="p-3 rounded hover:bg-slate-700">CV</Link>
          <Link href="/matching" className="p-3 rounded bg-blue-600">Matching</Link>
          <Link href="/push" className="p-3 rounded hover:bg-slate-700">Push</Link>
        </nav>
        <button onClick={() => window.location.href = '/login'} className="mt-auto p-3 text-red-400 hover:text-red-300 text-left">Déconnexion</button>
      </aside>
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Matching</h1>
        {loading ? <p>Chargement...</p> : (
          <div className="grid gap-4">
            {data.map((match: any) => (
              <div key={match.id} className="bg-white p-6 rounded-lg shadow flex justify-between">
                <span>{match.candidate || 'Candidat'}</span>
                <span>{match.score || '0'}%</span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
