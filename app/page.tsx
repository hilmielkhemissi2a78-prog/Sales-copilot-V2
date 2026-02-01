'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [stats, setStats] = useState({
    revenue: 45230,
    leads: 1250,
    conversion: 24.8,
    users: 8920
  })

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 200),
        leads: prev.leads + Math.floor(Math.random() * 10 - 2),
        conversion: Math.max(0, Math.min(100, prev.conversion + (Math.random() * 2 - 1))),
        users: prev.users + Math.floor(Math.random() * 50 - 20)
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  if (!mounted) return null

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
    },
    header: {
      maxWidth: '1200px',
      margin: '0 auto 40px auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      margin: 0,
      background: 'linear-gradient(to right, #fff, #e0e7ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    grid: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderRadius: '16px',
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    },
    cardTitle: {
      fontSize: '0.875rem',
      opacity: 0.8,
      marginBottom: '8px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.05em',
    },
    cardValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      margin: 0,
    },
    trend: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.875rem',
      marginTop: '8px',
      padding: '4px 8px',
      background: 'rgba(255,255,255,0.2)',
      borderRadius: '20px',
    }
  }

  const cards = [
    { title: 'Revenus', value: `${stats.revenue.toLocaleString()} €`, trend: '+12.5%', good: true },
    { title: 'Leads', value: stats.leads.toLocaleString(), trend: '+8.2%', good: true },
    { title: 'Conversion', value: `${stats.conversion.toFixed(1)}%`, trend: '-2.1%', good: false },
    { title: 'Utilisateurs', value: stats.users.toLocaleString(), trend: '+18.7%', good: true },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🔥 Sales Copilot</h1>
        <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>
          {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      <div style={styles.grid}>
        {cards.map((card, i) => (
          <div key={i} style={styles.card}>
            <div style={styles.cardTitle}>{card.title}</div>
            <div style={styles.cardValue}>{card.value}</div>
            <div style={{
              ...styles.trend,
              color: card.good ? '#86efac' : '#fca5a5',
              background: card.good ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'
            }}>
              {card.good ? '↑' : '↓'} {card.trend}
            </div>
          </div>
        ))}
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '40px auto', 
        background: 'rgba(255,255,255,0.05)', 
        borderRadius: '16px',
        padding: '24px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '16px' }}>Activité en temps réel</h2>
        <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '8px' }}>
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
            <div 
              key={i} 
              style={{ 
                flex: 1, 
                height: `${h}%`, 
                background: 'linear-gradient(to top, #3b82f6, #8b5cf6)', 
                borderRadius: '4px 4px 0 0',
                opacity: 0.8
              }} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}
