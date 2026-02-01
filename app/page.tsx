'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState({ artefacts: [], cronJobs: [] });

  useEffect(() => {
    setData({
      artefacts: [
        { id: '1', name: 'Test', status: 'active' }
      ],
      cronJobs: [
        { id: '1', name: 'Test', status: 'running' }
      ]
    });
  }, []);

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className="p-3 rounded bg-blue-600">Dashboard</Link>
          <Link href="/opportunities" className="p-3 rounded hover:bg-slate-700">AO</Link>
          <Link href="/resumes" className="p-3 rounded hover:bg-slate-700">CV</Link>
          <Link href="/matching" className="p-3 rounded hover:bg-slate-700">Matching</Link>
          <Link href="/push" className="p-3 rounded hover:bg-slate-700">Push</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p>Artefacts: {data.artefacts.length}</p>
      </main>
    </div>
  );
}
