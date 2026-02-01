const interval = setInterval(() => {
  setStats(prev => ({
    revenue: prev.revenue + Math.floor(Math.random() * 200 - 50),
    leads: prev.leads + Math.floor(Math.random() * 10 - 3),
    conversionRate: Math.max(0, Math.min(100, prev.conversionRate + (Math.random() * 2 - 1))),
    activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10)
  }));
}, 2000);

return () => clearInterval(interval);
