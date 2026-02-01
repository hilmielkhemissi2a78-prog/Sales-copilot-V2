'use client';

import { useEffect, useState } from 'react';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function Dashboard() {
  const [aos, setAos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      console.log('Token lu:', token); // Debug
      
      if (!token) {
        setError('Pas de token - veuillez vous reconnecter');
        setLoading(false);
        // Redirection vers login après 2 secondes
        setTimeout(() => window.location.href = '/login', 2000);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/api/v1/opportunities?limit=100`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Status:', res.status); // Debug
        
        if (res.status === 401) {
          setError('Session expirée - reconnexion nécessaire');
          localStorage.removeItem('token');
          setTimeout(() => window.location.href = '/login', 2000);
          return;
        }
        
        if (!res.ok) throw new Error('Erreur API');
        
        const data = await res.json();
        console.log('Data reçue:', data); // Debug
        
        // Adaptation selon la structure de ton backend
        // Si data est un tableau direct ou data.items ou data.data
        setAos(Array.isArray(data) ? data : (data.items || data.data || []));
        
      } catch (err) {
        setError('Erreur de chargement des données');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      <span className="ml-3">Chargement...</span>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-red-500">
      <p className="text-xl mb-4">{error}</p>
      <button 
        onClick={() => window.location.href = '/login'}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Aller au login
      </button>
    </div>
  );

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Sales Copilot Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Déconnexion
        </button>
      </div>

      <div className="bg-white rounded-xl shadow border p-6">
        <h2 className="text-xl font-bold mb-4">Appels d'offres ({aos.length})</h2>
        
        {aos.length === 0 ? (
          <p className="text-gray-500">Aucun AO trouvé</p>
        ) : (
          <div className="space-y-3">
            {aos.map((ao: any, i: number) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{ao.title || `AO #${ao.id}`}</h3>
                  <p className="text-sm text-gray-600">{ao.description || 'Pas de description'}</p>
                </div>
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm">
                  Voir
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
