'use client';

import { useEffect, useState } from 'react';
import { Briefcase, FileText, Zap, Send } from 'lucide-react';
import Link from 'next/link';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function Dashboard() {
  const [ao, setAo] = useState(0);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('token');
    setToken(t);
    
    if (t) {
      fetch(`${API_URL}/api/v1/opportunities?limit=100`, {
        headers: { 'Authorization': `Bearer ${t}` }
      })
      .then(r => r.json())
      .then(data => {
        const list = Array.isArray(data) ? data : (data.items || []);
        setAo(list.length);
      });
    }
  }, []);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl mb-4">Non connecté</h1>
        <Link href="/login" className="px-6 py-3 bg-blue-600 text-white rounded-lg">
          Aller à la page de connexion
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-4 gap-6">
        <Link href="/opportunities" className="bg-white rounded-2xl p-6 border shadow-sm">
          <Briefcase className="w-8 h-8 text-blue-600 mb-4" />
          <h3 className="text-slate-500">AO Actifs</h3>
          <p className="text-3xl font-bold">{ao}</p>
        </Link>
        <Link href="/resumes" className="bg-white rounded-2xl p-6 border shadow-sm">
          <FileText className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-slate-500">CV</h3>
          <p className="text-3xl font-bold">0</p>
        </Link>
        <Link href="/matching" className="bg-white rounded-2xl p-6 border shadow-sm">
          <Zap className="w-8 h-8 text-amber-600 mb-4" />
          <h3 className="text-slate-500">Matching</h3>
          <p className="text-3xl font-bold">0</p>
        </Link>
        <Link href="/push" className="bg-white rounded-2xl p-6 border shadow-sm">
          <Send className="w-8 h-8 text-green-600 mb-4" />
          <h3 className="text-slate-500">Push</h3>
          <p className="text-3xl font-bold">0</p>
        </Link>
      </div>
    </div>
  );
}
