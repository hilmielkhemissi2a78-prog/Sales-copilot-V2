'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Sales Copilot</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/" className="block p-3 rounded hover:bg-slate-800">Dashboard</Link>
          <Link href="/opportunities" className="block p-3 rounded hover:bg-slate-800">AO</Link>
          <Link href="/resumes" className="block p-3 rounded hover:bg-slate-800">CV</Link>
          <Link href="/matching" className="block p-3 rounded hover:bg-slate-800">Matching</Link>
          <Link href="/push" className="block p-3 rounded hover:bg-slate-800">Push</Link>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }} className="flex items-center gap-2 text-red-400">
            <LogOut className="w-5 h-5" /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  );
}
