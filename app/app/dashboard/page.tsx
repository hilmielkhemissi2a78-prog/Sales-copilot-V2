'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, Zap, Send, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function DashboardPage() {
  const [aoCount, setAoCount] = useState(0);
  const [aos, setAos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch(`${API_URL}/api/v1/opportunities?limit=100`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (res.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
        return;
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        const list = Array.isArray(data) ? data : (data.items || []);
        setAos(list);
        setAoCount(list.length);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex justify-center p-12">Chargement...</div>;

  const stats = [
    { title: 'AO Actifs', value: aoCount, icon: Briefcase, color: 'bg-blue-500', href: '/dashboard/opportunities' },
    { title: 'CV en base', value: 0, icon: FileText, color: 'bg-purple-500', href: '/dashboard/resumes' },
    { title: 'Matchings', value: 0, icon: Zap, color: 'bg-amber-500', href: '/dashboard/matching' },
    { title: 'Push', value: 0, icon: Send, color: 'bg-green-500', href: '/dashboard/push' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.title} href={card.href} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
              </div>
              <h3 className="text-slate-500 text-sm font-medium">{card.title}</h3>
              <p className="text-3xl font-bold text-slate-800 mt-1">{card.value}</p>
            </Link>
          );
        })}
      </div>

      {/* Liste AO */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Appels d'offres ({aoCount})</h3>
          <Link href="/dashboard/opportunities" className="text-blue-600 hover:underline text-sm">Voir tout →</Link>
        </div>
        <div className="divide-y divide-slate-100">
          {aos.slice(0, 5).map((ao: any) => (
            <div key={ao.id} className="p-4 hover:bg-slate-50 flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-slate-800">{ao.title || `AO #${ao.id}`}</h4>
                <p className="text-sm text-slate-500">{ao.description || 'Pas de description'}</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100">
                Voir
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
