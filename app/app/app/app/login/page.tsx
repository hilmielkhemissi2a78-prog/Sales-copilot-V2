'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('https://sales-copilot-production-0d9c.up.railway.app/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        window.location.href = '/';
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } catch (err) {
      setError('Erreur de connexion');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Sales Copilot</h1>
        <p className="text-center text-slate-500 mb-8">Connexion ESN</p>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <input 
          type="password" 
          placeholder="Mot de passe" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-slate-300 rounded-lg mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors">
          Se connecter
        </button>
      </form>
    </div>
  );
}
