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
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-
