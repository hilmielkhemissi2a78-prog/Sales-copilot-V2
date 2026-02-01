'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (pathname === '/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-slate-800 text-white p-5 flex flex-col flex-shrink-0">
        <h1 className="text-xl font-bold mb-8">Sales Copilot</h1>
        <nav className="flex flex-col gap-2">
          <Link href="/" className={`p-3 rounded transition-colors ${pathname === '/' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            Dashboard
          </Link>
          <Link href="/opportunities" className={`p-3 rounded transition-colors ${pathname === '/opportunities' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            AO
          </Link>
          <Link href="/resumes" className={`p-3 rounded transition-colors ${pathname === '/resumes' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            CV
          </Link>
          <Link href="/matching" className={`p-3 rounded transition-colors ${pathname === '/matching' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            Matching
          </Link>
          <Link href="/push" className={`p-3 rounded transition-colors ${pathname === '/push' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            Push
          </Link>
        </nav>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="mt-auto p-3 text-red-400 hover:text-red-300 text-left font-medium"
        >
          Déconnexion
        </button>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
