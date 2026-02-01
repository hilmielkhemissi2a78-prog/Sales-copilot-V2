'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Menu, Bell, Search, Filter, Download } from 'lucide-react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [stats, setStats] = useState({
    revenue: 54230,
    leads: 1420,
    conversion: 24.8,
    activeUsers: 3240
  })

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
    { title: 'Revenus', value: stats.revenue.toLocaleString(), unit: '€', trend: '+12.5%', up: true, icon: DollarSign, color: 'bg-blue-500', bgColor: 'bg-blue-50' },
    { title: 'Leads', value: stats.leads.toLocaleString(), unit: '', trend: '+8.2%', up: true, icon: Users, color: 'bg-purple-500', bgColor: 'bg-purple-50' },
    { title: 'Conversion', value: stats.conversion.toFixed(1), unit: '%', trend: '-2.1%', up: false, icon: TrendingUp, color: 'bg-green-500', bgColor: 'bg-green-50' },
    { title: 'Utilisateurs', value: stats.activeUsers.toLocaleString(), unit: '', trend: '+18.7%', up: true, icon: Activity, color: 'bg-orange-500', bgColor: 'bg-orange-50' }
  ]

  const recentLeads = [
    { name: 'Marie Dupont', company: 'TechCorp', value: '5,400€', time: '2 min' },
    { name: 'Jean Martin', company: 'StartupXYZ', value: '12,200€', time: '15 min' },
    { name: 'Alice Bernard', company: 'AgenceWeb', value: '8,900€', time: '1h' },
    { name: 'Pierre Leroy', company: 'ConsultingPro', value: '24,500€', time: '3h' },
  ]

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className={`font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${!sidebarOpen && 'hidden'}`}>
            SalesCopilot
          </h1>
          {!sidebarOpen && <span className="text-2xl">🚀</span>}
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span>{item.name}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Rechercher..." className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">HE</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Tableau de bord</h2>
                <p className="text-gray-500 mt-1">Vue d&apos;ensemble</p>
              </div>
              <div className="flex gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm font-medium">
                  <Filter className="w-4 h-4" /> Filtrer
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
                  <Download className="w-4 h-4" /> Exporter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsCards.map((card, index) => {
                const Icon = card.icon
                return (
                  <div key={index} className="bg-white rounded-2xl p-6 border shadow-sm hover:shadow-xl transition-all">
                    <div className="flex justify-between mb-4">
                      <div className={`p-3 rounded-xl ${card.bgColor}`}>
                        <Icon className={`w-6 h-6 ${card.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className={`flex items-center gap-1 text-sm px-2 py-1 rounded-full ${card.up ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {card.up ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {card.trend}
                      </span>
                    </div>
                    <h3 className="text-gray-500 text-sm">{card.title}</h3>
                    <div className="flex gap-1">
                      <span className="text-2xl font-bold">{card.value}</span>
                      <span className="text-gray-500">{card.unit}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl p-6 border shadow-sm">
                <h3 className="text-lg font-bold mb-6">Évolution</h3>
                <div className="h-64 flex items-end gap-2">
                  {[65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95, 70].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-500 rounded-t-lg opacity-80 hover:opacity-100" style={{ height: `${h}%` }}></div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border shadow-sm">
                <h3 className="text-lg font-bold mb-6">Derniers Leads</h3>
                <div className="space-y-4">
                  {recentLeads.map((lead, i) => (
                    <div key={i} className="flex justify-between p-3 hover:bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-sm">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{lead.name}</p>
                          <p className="text-xs text-gray-500">{lead.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{lead.value}</p>
                        <p className="text-xs text-gray-400">{lead.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
