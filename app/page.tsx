'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = 'https://sales-copilot-production-0d9c.up.railway.app';

export default function Dashboard() {
  const [aos, setAos] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Si pas de token, va sur login
    if (!token) {
      router.push('/login');
      return;
    }

    // Récupère les données avec le token
    fetch(`${API_URL}/api/v1/opportunities`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setAos(data))
    .catch(() => {
      localStorage.removeItem('token');
      router.push('/login');
    });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-4">AO chargés : {aos.length}</p>
      <button 
        onClick={() => {
          localStorage.removeItem('token');
          router.push('/login');
        }}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Déconnexion
      </button>
    </div>
  );
}
