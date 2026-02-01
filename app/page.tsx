'use client';

import { useEffect, useState } from 'react';
import { 
  Briefcase, 
  FileText, 
  Zap, 
  Send, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [stats, setStats] = useState({
    activeAO: 12,
    totalCV: 458,
    matchingsToday: 8,
    pushSent: 24
  });

  const [recentMatchings, setRecentMatchings] = useState([
    { ao: 'Développeur React Senior', candidate: 'Thomas D.', score: 94, date: '2 min ago', status: 'high' },
    { ao: 'Architecte Cloud AWS', candidate: 'Marie L.', score: 87, date: '15 min ago', status: 'high' },
    { ao: 'Lead Tech Python', candidate: 'Jean P.', score: 82, date: '1h ago', status: 'medium' },
    { ao: 'DevOps Kubernetes', candidate: 'Alice B.', score: 91, date: '2h ago', status: 'high' },
  ]);

  const quickActions = [
    { name: 'Uploader un AO', href: '/opportunities', icon: Briefcase, color: 'bg-blue-500', desc: 'Nouvel appel d\'offres' },
    { name: 'Ajouter des CV', href: '/resumes', icon: FileText, color: 'bg-purple-500', desc: 'CVthèque' },
    { name: 'Lancer Matching', href: '/matching', icon: Zap, color: 'bg-amber-500', desc: 'IA Analysis' },
    { name: 'Push Candidats', href: '/push', icon: Send, color: 'bg-green-500', desc: 'Envoi client' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">AO Actifs</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.activeAO}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+3 cette semaine</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">CV en base</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.totalCV}</p>
            </div>
            <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            <span>+12 nouveaux aujourd'hui</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Matchings IA</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.matchingsToday}</p>
            </div>
            <div className="w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-500">
            <span>En attente d'analyse</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Push envoyés</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{stats.pushSent}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            <CheckCircle className="w-4 h-4 inline mr-1" />
            <span>85% ouverts</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              href={action.href}
              className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{action.name}</h3>
                <p className="text-sm text-slate-500">{action.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Matchings */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            Derniers Matchings IA
          </h3>
          <Link href="/matching" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Voir tout →
          </Link>
        </div>
        
        <div className="divide-y divide-slate-100">
          {recentMatchings.map((match, idx) => (
            <div key={idx} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  match.score >= 90 ? 'bg-green-100 text-green-700' : 
                  match.score >= 80 ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  <span className="font-bold text-sm">{match.score}%</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800">{match.ao}</h4>
                  <p className="text-sm text-slate-500">Matched avec {match.candidate}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right hidden md:block">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <Clock className="w-4 h-4" />
                    {match.date}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                    Voir détails
                  </button>
                  <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
                    Push CV
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">5 nouveaux CV matchés à plus de 90%</h3>
            <p className="text-blue-100">Prêts à être pushés sur vos AO actifs</p>
          </div>
        </div>
        <Link 
          href="/matching" 
          className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
        >
          Voir les matching
        </Link>
      </div>
    </div>
  );
}
