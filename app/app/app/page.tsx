'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  Bell,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Stats {
  revenue: number;
  leads: number;
  conversionRate: number;
  activeUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    revenue: 12500,
    leads: 420,
    conversionRate: 13.5,
    activeUsers: 2340
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 200 - 50),
        leads: prev.leads + Math.floor(Math.random() * 10 - 3),
        conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() * 2 - 1))),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const cards = [
    { 
      title: 'Revenus', 
      value: stats.revenue, 
      unit: '€',
      icon: DollarSign, 
      trend: '+12.5%', 
      up: true,
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Leads', 
      value: stats.leads, 
      unit: '',
      icon: Users, 
      trend: '+8.2%', 
      up: true,
      color: 'from-purple-500 to-purple-600'
    },
    { 
      title: 'Conversion', 
      value: stats.conversionRate.toFixed(1), 
      unit: '%',
      icon: TrendingUp, 
      trend: '-2.4%', 
      up: false,
      color: 'from-green-500 to-green-600'
    },
    { 
      title: 'Utilisateurs Actifs', 
      value: stats.activeUsers, 
      unit: '',
      icon: Activity, 
      trend: '+18.7%', 
      up: true,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
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
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>
            <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              HE
            </div>
          </div>
        </div>
      </nav>

      <main className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 dark:text-white mb-2"
          >
            Dashboard
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400">
            Vue d'ensemble de tes performances en temps réel
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AnimatePresence>
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, translateY: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <span className={`flex items-center gap-1 text-sm font-semibold ${card.up ? 'text-green-500' : 'text-red-500'}`}>
                    {card.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {card.trend}
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <motion.p 
                  key={card.value}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="text-3xl font-bold text-gray-800 dark:text-white"
                >
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                  <span className="text-lg text-gray-500 ml-1">{card.unit}</span>
                </motion.p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Activité Récente</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map((height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
                >
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {height}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>00:00</span>
              <span>06:00</span>
              <span>12:00</span>
              <span>18:00</span>
              <span>24:00</span>
            </div>
          </motion.div>

          {/* Recent Leads */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Derniers Leads</h3>
              <button className="text-blue-500 hover:text-blue-600 text-sm font-medium">Voir tout</button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Marie Dupont', email: 'marie@entreprise.fr', status: 'Nouveau', color: 'bg-blue-100 text-blue-700' },
                { name: 'Jean Martin', email: 'jean@company.com', status: 'Qualifié', color: 'bg-green-100 text-green-700' },
                { name: 'Alice Bernard', email: 'alice@start.io', status: 'En négociation', color: 'bg-yellow-100 text-yellow-700' },
                { name: 'Pierre Leroy', email: 'pierre@tech.fr', status: 'Converti', color: 'bg-purple-100 text-purple-700' },
              ].map((lead, i) => (
                <motion.div
                  key={lead.email}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + (i * 0.1) }}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-sm">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">{lead.name}</p>
                      <p className="text-sm text-gray-500">{lead.email}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${lead.color}`}>
                    {lead.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
