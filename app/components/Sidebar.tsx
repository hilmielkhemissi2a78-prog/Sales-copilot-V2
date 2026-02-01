'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-slate-800 text-white p-5 flex flex-col">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className={`p-3 rounded ${pathname === '/' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Dashboard</Link>
          <Link href="/opportunities" className={`p-3 rounded ${pathname === '/opportunities' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>AO</Link>
          <Link href="/resumes" className={`p-3 rounded ${pathname === '/resumes' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>CV</Link>
          <Link href="/matching" className={`p-3 rounded ${pathname === '/matching' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Matching</Link>
          <Link href="/push" className={`p-3 rounded ${pathname === '/push' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>Push</Link>
        </nav>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="mt-auto p-3 text-red-400 hover:text-red-300 text-left"
        >
          Déconnexion
        </button>
      </div>
      <div className="flex-1 p-8 bg-gray-100 text-black overflow-auto">
        {children}
      </div>
    </div>
  );
}
