import React from 'react';
import { Button } from '@/components/ui/button';
import { PlaneIcon, Bell, User, Menu } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <PlaneIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">MilesAlert</h1>
              <p className="text-xs text-muted-foreground">Alertas inteligentes de milhas</p>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-6 md:flex">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              Meus Alertas
            </Button>
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              Histórico
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-surface/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                  <PlaneIcon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">MilesAlert</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-md">
                A plataforma mais inteligente para monitorar ofertas de passagens aéreas com milhas. 
                Receba alertas personalizados e economize nas suas viagens.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Produto</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Como funciona</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Preços</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">API</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-3">Suporte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-smooth">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">Contato</a></li>
                <li><a href="#" className="hover:text-primary transition-smooth">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-muted-foreground">
                © 2024 MilesAlert. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-smooth">Privacidade</a>
                <a href="#" className="hover:text-primary transition-smooth">Termos</a>
                <a href="#" className="hover:text-primary transition-smooth">LGPD</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};