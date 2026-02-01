'use client'

import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Menu,
  Bell,
  Search,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react'

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    revenue: 54230,
    leads: 1420,
    conversion: 24.8,
    activeUsers: 3240
  })

  // Animation des stats en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 200),
        leads: prev.leads + Math.floor(Math.random() * 15 - 3),
        conversion: Math.max(0, Math.min(100, prev.conversion + (Math.random() * 1 - 0.3))),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 30 - 10)
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const menuItems = [
    { name: 'Dashboard', active: true, icon: '📊' },
    { name: 'Leads', active: false, icon: '🎯' },
    { name: 'Campagnes', active: false, icon: '📧' },
    { name: 'Analytics', active: false, icon: '📈' },
    { name: 'Équipe', active: false, icon: '👥' },
  ]

  const statsCards = [
    { 
      title: 'Revenus Totaux', 
      value: stats.revenue.toLocaleString(), 
      unit: '€',
      trend: '+12.5%', 
      up: true,
      icon: DollarSign,
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50'
    },
    { 
      title: 'Nouveaux Leads', 
      value: stats.leads.toLocaleString(), 
      unit: '',
      trend: '+8.2%', 
      up: true,
      icon: Users,
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50'
    },
    { 
      title: 'Taux Conversion', 
      value: stats.conversion.toFixed(1), 
      unit: '%',
      trend: '-2.1%', 
      up: false,
      icon: TrendingUp,
      color: 'bg-green-500',
      bgColor: 'bg-green-50'
    },
    { 
      title: 'Utilisateurs Actifs', 
      value: stats.activeUsers.toLocaleString(), 
      unit: '',
      trend: '+18.7%', 
      up: true,
      icon: Activity,
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50'
    }
  ]

  const recentLeads = [
    { name: 'Marie Dupont', company: 'TechCorp', status: 'Nouveau', value: '5,400€', time: '2 min ago' },
    { name: 'Jean Martin', company: 'StartupXYZ', status: 'Qualifié', value: '12,200€', time: '15 min ago' },
    { name: 'Alice Bernard', company: 'AgenceWeb', status: 'Négociation', value: '8,900€', time: '1h ago' },
    { name: 'Pierre Leroy', company: 'ConsultingPro', status: 'Converti', value: '24,500€', time: '3h ago' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className={`font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${!sidebarOpen && 'hidden'}`}>
            SalesCopilot
          </h1>
          {!sidebarOpen && <span className="text-2xl">🚀</span>}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 font-semibold shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
            <span className="text-xl">⚙️</span>
            {sidebarOpen && <span>Paramètres</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Rechercher..." 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform">
              HE
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Tableau de bord</h2>
                <p className="text-gray-500 mt-1">Vue d'ensemble de vos performances</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700 shadow-sm">
                  <Filter className="w-4 h-4" />
                  Filtrer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg shadow-blue-200">
                  <Download className="w-4 h-4" />
                  Exporter
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${card.bgColor} ${card.color.replace('bg-', 'text-')}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded-full ${
                        card.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {card.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {card.trend}
                      </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{card.title}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {card.value}
                      </span>
                      <span className="text-gray-500 font-medium">{card.unit}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Charts & Tables Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Évolution des ventes</h3>
                  <select className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Cette semaine</option>
                    <option>Ce mois</option>
                    <option>Cette année</option>
                  </select>
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 70].map((height, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="w-full relative">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-500 opacity-80 group-hover:opacity-100"
                          style={{ height: `${height * 2}px` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-400 px-2">
                  <span>Lun</span>
                  <span>Mar</span>
                  <span>Mer</span>
                  <span>Jeu</span>
                  <span>Ven</span>
                  <span>Sam</span>
                  <span>Dim</span>
                </div>
              </div>

              {/* Recent Leads */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Derniers Leads</h3>
                  <button className="text-blue-600 text-sm font-medium hover:text-blue-700">Voir tout</button>
                </div>
                <div className="space-y-4">
                  {recentLeads.map((lead, i) => (
                    <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800 text-sm">{lead.value}</p>
                        <p className="text-xs text-gray-400">{lead.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Importer des leads</h3>
                    <p className="text-blue-100 text-sm mb-4">Uploader un fichier CSV ou Excel</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Download className="w-5 h-5" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  Importer maintenant →
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-2">Nouvelle campagne</h3>
                    <p className="text-purple-100 text-sm mb-4">Créer une séquence d'emails</p>
                  </div>
                  <div className="bg-white/20 p-2 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-sm font-semibold bg-white/20 px-4 py-2 rounded-lg group-hover:bg-white/30 transition-colors">
                  Créer →
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Objectifs du mois</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Revenus</span>
                      <span className="font-semibold text-gray-800">85%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Leads</span>
                      <span className="font-semibold text-gray-800">62%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: '62%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
