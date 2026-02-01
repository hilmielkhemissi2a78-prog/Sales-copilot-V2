'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function useLiveStats() {
  const [stats, setStats] = useState({ revenue: 45231, leads: 2345, conversion: 24.8 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 200 - 50),
        leads
