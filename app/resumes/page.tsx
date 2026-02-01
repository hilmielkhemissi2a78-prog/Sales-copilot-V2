'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Resumes() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-gray-100" />;

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col flex-shrink-0">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className={`p-3 rounded ${pathname === '/' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Dashboard</Link>
          <Link href="/opportunities" className={`p-3 rounded ${pathname === '/opportunities' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>AO</Link>
          <Link href="/resumes" className={`p-3 rounded ${pathname === '/resumes' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>CV</Link>
          <Link href="/matching" className={`p-3 rounded ${pathname === '/matching' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Matching</Link>
          <Link href="/push" className={`p-3 rounded ${pathname === '/push' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Push</Link>
        </nav>
        <button onClick={() => {localStorage.removeItem('token'); window.location.href = '/login';}} className="mt-auto p-3 text-red-400 hover:text-red-300 text-left">Déconnexion</button>
      </aside>
      <main className="flex-1 p-8 overflow-auto bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">CV</h1>
        <p>Contenu CV...</p>
      </main>
    </div>
  );
}
