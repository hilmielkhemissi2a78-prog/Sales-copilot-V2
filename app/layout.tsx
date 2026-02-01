'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Pas de sidebar sur login
  if (pathname === '/login') {
    return <div>{children}</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '250px', background: '#1e293b', color: 'white', padding: '20px' }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>Sales Copilot</h1>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link href="/" style={{ padding: '10px', background: pathname === '/' ? '#3b82f6' : 'transparent', borderRadius: '5px', color: 'white', textDecoration: 'none' }}>Dashboard</Link>
          <Link href="/opportunities" style={{ padding: '10px', background: pathname === '/opportunities' ? '#3b82f6' : 'transparent', borderRadius: '5px', color: 'white', textDecoration: 'none' }}>AO</Link>
          <Link href="/resumes" style={{ padding: '10px', background: pathname === '/resumes' ? '#3b82f6' : 'transparent', borderRadius: '5px', color: 'white', textDecoration: 'none' }}>CV</Link>
          <Link href="/matching" style={{ padding: '10px', background: pathname === '/matching' ? '#3b82f6' : 'transparent', borderRadius: '5px', color: 'white', textDecoration: 'none' }}>Matching</Link>
          <Link href="/push" style={{ padding: '10px', background: pathname === '/push' ? '#3b82f6' : 'transparent', borderRadius: '5px', color: 'white', textDecoration: 'none' }}>Push</Link>
        </nav>
        <button 
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('token');
              window.location.href = '/login';
            }
          }}
          style={{ marginTop: '30px', padding: '10px', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
        >
          Déconnexion
        </button>
      </div>
      <div style={{ flex: 1, padding: '30px', background: '#f3f4f6', overflow: 'auto' }}>
        {children}
      </div>
    </div>
  );
}
