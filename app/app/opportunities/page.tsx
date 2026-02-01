'use client';

import { useEffect, useState } from 'react';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function Opportunities() {
  const [aos, setAos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/v1/opportunities?limit=100`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(r => r.json())
    .then(data => {
      setAos(Array.isArray(data) ? data : (data.items || []));
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Appels d'offres</h1>
      <div className="grid gap-4">
        {aos.map((ao: any) => (
          <div key={ao.id} className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="font-bold text-lg">{ao.title || `AO #${ao.id}`}</h3>
            <p className="text-gray-600 mt-2">{ao.description}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Voir détails</button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Lancer Matching</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
