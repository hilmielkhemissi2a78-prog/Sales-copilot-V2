'use client';

import { 
  Briefcase, 
  FileText, 
  Zap, 
  Send, 
  LayoutDashboard, 
  LogOut,
  User
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Appels d\'offres', href: '/opportunities', icon: Briefcase },
    { name: 'CVthèque', href: '/resumes', icon: FileText },
    { name: 'Matching IA', href: '/matching', icon: Zap },
    { name: 'Push CV', href: '/push', icon: Send },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Zap className="w-6 h-6 text-blue-400" />
            Sales Copilot
          </h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
