import React, { ReactNode } from 'react';
import { GithubIcon, ListIcon } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ListIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-slate-800">TanStack Virtual</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/TanStack/virtual" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-sm text-slate-600 hover:text-blue-600 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-800 text-slate-300 py-6">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>Built with React and TanStack Virtual. Designed with ❤️ in 2025.</p>
        </div>
      </footer>
    </div>
  );
}