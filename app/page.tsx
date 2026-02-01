'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetch('https://sales-copilot-production-0d9c.up.railway.app/api/v1/opportunities?limit=100', {
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Session expirée');
      }
      return res.json();
    })
    .then(data => {
      if (Array.isArray(data)) {
        setData(data);
      } else if (data && Array.isArray(data.items)) {
        setData(data.items);
      } else {
        setData([]);
      }
      setLoading(false);
    })
    .catch(err => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Chargement...</div>;
  
  if (error) return (
    <div style={{ padding: '20px', color: 'red' }}>
      <h2>Erreur: {error}</h2>
      <button onClick={() => window.location.href = '/login'} style={{ padding: '10px 20px', marginTop: '20px' }}>
        Retour au login
      </button>
    </div>
  );

  const count = data.length;

  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        <Link href="/opportunities" style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', textDecoration: 'none', color: 'black' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>AO Actifs</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>{count}</p>
        </Link>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>CV</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>0</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>Matching</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>0</p>
        </div>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ color: '#6b7280', fontSize: '14px' }}>Push</h3>
          <p style={{ fontSize: '32px', fontWeight: 'bold', marginTop: '10px' }}>0</p>
        </div>
      </div>
      
      <div style={{ marginTop: '30px', background: 'white', padding: '20px', borderRadius: '8px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Derniers AO</h2>
        {data.slice(0, 5).map((ao: any) => (
          <div key={ao.id} style={{ padding: '15px', borderBottom: '1px solid #e5e7eb' }}>
            <h4 style={{ fontWeight: 'bold' }}>{ao.title || `AO #${ao.id}`}</h4>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>{ao.description?.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
