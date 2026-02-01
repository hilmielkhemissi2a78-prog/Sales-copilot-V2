'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, Zap, Send } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function Dashboard() {
  const [ao, setAo] = useState(0);
  const [aos, setAos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { window.location.href = '/login'; return; }
    
    fetch(`${API_URL}/api/v1/opportunities?limit=100`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      const list = Array.isArray(data) ? data : (data.items || []);
      setAo(list.length);
      setAos(list);
    });
  }, []);

  const cards = [
    { title: 'AO Actifs', value: ao, icon: Briefcase, color: 'bg-blue-500', href: '/opportunities' },
    { title: 'CV', value: 0, icon: FileText, color: 'bg-purple-500', href: '/resumes' },
    { title: 'Matching', value: 0, icon: Zap, color: 'bg-amber-500', href: '/matching' },
    { title: 'Push', value: 0, icon: Send, color: 'bg-green-500', href: '/push' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid grid-cols-4 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.title} href={c.href} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-lg">
              <div className={`p-3 rounded-xl ${c.color} text-white w-fit mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-slate-500 text-sm">{c.title}</h3>
              <p className="text-3xl font-bold">{c.value}</p>
            </Link>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl border shadow-sm">
        <div className="p-6 border-b flex justify-between">
          <h3 className="text-lg font-bold">Appels d'offres ({ao})</h3>
          <Link href="/opportunities" className="text-blue-600">Voir tout →</Link>
        </div>
        <div className="divide-y">
          {aos.slice(0, 5).map((a: any) => (
            <div key={a.id} className="p-4 hover:bg-slate-50 flex justify-between">
              <div>
                <h4 className="font-bold">{a.title || `AO #${a.id}`}</h4>
                <p className="text-sm text-slate-500">{a.description?.substring(0, 100)}...</p>
              </div>
              <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm">Voir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
