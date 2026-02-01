'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

function useLiveStats() {
  const [stats, setStats] = useState({ revenue: 45231, leads: 2345, conversion: 24.8 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 200 - 50),
        leads: prev.leads + (Math.random() > 0.8 ? 1 : 0),
        conversion: Math.min(100, Math.max(0, prev.conversion + (Math.random() * 0.4 - 0.2))),
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return stats;
}

export default function Dashboard() {
  const stats = useLiveStats();
  const [apiStatus, setApiStatus] = useState('Clique pour tester');

  const testApi = async () => {
    setApiStatus('Test...');
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      setApiStatus('✅ Connecté: ' + JSON.stringify(data));
    } catch (e) {
      setApiStatus('❌ Erreur - vérifie NEXT_PUBLIC_API_URL sur Vercel');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-slate-900">Sales Copilot V2</h1>
          <button onClick={testApi} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Tester Railway
          </button>
        </div>

        <div className="bg-white p-4 rounded-lg border text-sm text-slate-600">
          Status: {apiStatus}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-slate-500">Revenus</p>
                <h3 className="text-3xl font-bold">€{stats.revenue.toLocaleString()}</h3>
                <span className="text-emerald-600 text-sm">● Live</span>
              </div>
              <DollarSign className="w-8 h-8 text-emerald-600 bg-emerald-100 p-2 rounded-lg" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-slate-500">Prospects</p>
                <h3 className="text-3xl font-bold">{stats.leads.toLocaleString()}</h3>
                <span className="text-blue-600 text-sm">● Live</span>
              </div>
              <Users className="w-8 h-8 text-blue-600 bg-blue-100 p-2 rounded-lg" />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-white p-6 rounded-2xl shadow-sm border">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-slate-500">Conversion</p>
                <h3 className="text-3xl font-bold">{stats.conversion.toFixed(1)}%</h3>
              </div>
              <Activity className="w-8 h-8 text-purple-600 bg-purple-100 p-2 rounded-lg" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
