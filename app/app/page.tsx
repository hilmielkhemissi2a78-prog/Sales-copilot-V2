'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Bell, Search, Menu } from 'lucide-react';

interface Stats {
  revenue: number;
  leads: number;
  conversionRate: number;
  activeUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    revenue: 45230,
    leads: 1250,
    conversionRate: 24.8,
    activeUsers: 8920
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  const statsCards = [
    { 
      title: 'Revenus', 
      value: stats.revenue, 
      unit: '€',
      icon: DollarSign, 
      trend: '+12.5%', 
      up: true,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Leads', 
      value: stats.leads, 
      unit: '',
      icon: Users, 
      trend: '+8.2%', 
      up: true,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Conversion', 
      value: Number(stats.conversionRate.toFixed(1)), 
      unit: '%',
      icon: TrendingUp, 
      trend: '-2.4%', 
      up: false,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Utilisateurs', 
      value: stats.activeUsers, 
      unit: '',
      icon: Activity, 
      trend: '+18.7%', 
      up: true,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sales Copilot
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              HE
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Tableau de bord</h2>
          <p className="text-gray-600">Suivez vos performances en temps réel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${card.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {card.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {card.trend}
                  </div>
                </div>
                <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-800">
                    {card.value.toLocaleString()}
                  </span>
                  <span className="text-gray-500 font-medium">{card.unit}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Aperçu des ventes</h3>
              <select className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Cette semaine</option>
                <option>Ce mois</option>
                <option>Cette année</option>
              </select>
            </div>
            
            {/* Simulated Chart with Bars */}
            <div className="h-64 flex items-end justify-between gap-3 px-2">
              {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 70].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative">
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out hover:from-blue-600 hover:to-blue-500 opacity-80 hover:opacity-100"
                      style={{ 
                        height: `${height * 2}px`,
                        animation: `growUp 0.5s ease-out ${i * 0.05}s both`
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 font-medium">
                    {['L', 'M', 'M', 'J', 'V', 'S', 'D'][i % 7]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Activité récente</h3>
            <div className="space-y-4">
              {[
                { name: 'Nouveau lead', desc: 'Marie Dupont vient de s\'inscrire', time: '2 min', color: 'bg-blue-500' },
                { name: 'Conversion', desc: 'Jean Martin a acheté Premium', time: '15 min', color: 'bg-green-500' },
                { name: 'Nouveau lead', desc: 'Alice Bernard a démarré un essai', time: '1h', color: 'bg-blue-500' },
                { name: 'Notification', desc: 'Objectif mensuel atteint à 85%', time: '2h', color: 'bg-purple-500' },
                { name: 'Conversion', desc: 'Pierre Leroy a renouvelé', time: '3h', color: 'bg-green-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full ${item.color} mt-2 flex-shrink-0`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 text-blue-600 font-semibold text-sm hover:bg-blue-50 rounded-xl transition-colors border border-blue-200">
              Voir toute l'activité
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-bold mb-2">Importer des leads</h3>
            <p className="text-blue-100 text-sm mb-4">Uploader un fichier CSV ou Excel</p>
            <div className="bg-white/20 inline-flex px-4 py-2 rounded-lg text-sm font-semibold">
              Importer →
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-bold mb-2">Campagne email</h3>
            <p className="text-purple-100 text-sm mb-4">Créer une nouvelle séquence</p>
            <div className="bg-white/20 inline-flex px-4 py-2 rounded-lg text-sm font-semibold">
              Créer →
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
            <h3 className="text-lg font-bold mb-2">Automations</h3>
            <p className="text-gray-300 text-sm mb-4">Configurer des workflows</p>
            <div className="bg-white/20 inline-flex px-4 py-2 rounded-lg text-sm font-semibold">
              Configurer →
            </div>
          </div>
        </div>
      </main>
      
      <style jsx>{`
        @keyframes growUp {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
