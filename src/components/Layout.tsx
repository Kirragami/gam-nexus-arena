import { ReactNode } from 'react';
import Navigation from './Navigation';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface LayoutProps {
  children: ReactNode;
  showNavigation?: boolean;
  className?: string;
}

const Layout = ({ children, showNavigation = true, className = "" }: LayoutProps) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 ${className}`}>
      {showNavigation && <Navigation />}
      <main className="flex-1">
        {children}
      </main>
      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout; 