'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Sidebar>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p>Chargement...</p>
          </div>
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Artefacts</p>
            <p className="text-2xl font-bold">3</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Actifs</p>
            <p className="text-2xl font-bold text-green-600">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">Jobs</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-500">En cours</p>
            <p className="text-2xl font-bold text-blue-600">1</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Artefacts</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Pipeline Principal</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">active</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded border">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Backup Nocturne</span>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">idle</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Jobs Programmés</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded border flex justify-between items-center">
                <span className="font-semibold">Daily Cleanup</span>
                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">idle</span>
              </div>
              <div className="p-4 bg-gray-50 rounded border flex justify-between items-center">
                <span className="font-semibold">Health Check</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">running</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
