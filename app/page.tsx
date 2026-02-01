'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Bell, Search, Menu } from 'lucide-react';

interface Stats {
  revenue: number;
  leads: number;
  conversionRate: number;
  activeUsers: number;
}

export default function Home() {
  const [stats, setStats] = useState<Stats>({
    revenue: 45230,
    leads: 1250,
    conversionRate: 24.8,
    activeUsers: 8920
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 500 - 100),
        leads: prev.leads + Math.floor(Math.random() * 20 - 5),
        conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() * 1 - 0.5))),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50 - 20)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: 'Revenus', value: stats.revenue, unit: '€', icon: DollarSign, trend: '+12.5%', up: true, color: 'from-blue-500 to-blue-600' },
    { title: 'Leads', value: stats.leads, unit: '', icon: Users, trend: '+8.2%', up: true, color: 'from-purple-500 to-purple-600' },
    { title: 'Conversion', value: stats.conversionRate.toFixed(1), unit: '%', icon: TrendingUp, trend: '-2.4%', up: false, color: 'from-green-500 to-green-600' },
    { title: 'Utilisateurs', value: stats.activeUsers, unit: '', icon: Activity, trend: '+18.7%', up: true, color: 'from-orange-500 to-orange-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Sales Copilot
          </h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Tableau de bord</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div key={card.title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${card.up ? 'text-green-600' : 'text-red-600'}`}>
                    {card.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 text-sm mb-1">{card.title}</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  <span className="text-lg text-gray-500 ml-1">{card.unit}</span>
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
