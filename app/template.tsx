'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from './ClientLayout';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  if (pathname === '/login') {
    return <>{children}</>;
  }
  
  return <ClientLayout>{children}</ClientLayout>;
}
