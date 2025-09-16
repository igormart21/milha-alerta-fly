import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertForm } from '@/components/AlertForm';
import { ArrowRight, Zap, Smartphone, Globe, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div 
          className="relative min-h-[600px] flex items-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 max-w-4xl px-8 py-16">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-primary">
                <Zap className="h-4 w-4" />
                <span>Alertas Inteligentes de Milhas</span>
              </div>
              
              <h1 className="text-4xl font-bold leading-tight text-foreground md:text-6xl">
                Nunca mais perca uma
                <span className="bg-gradient-accent bg-clip-text text-transparent"> oferta de milhas</span>
              </h1>
              
              <p className="max-w-2xl text-xl text-muted-foreground">
                Configure alertas personalizados e receba notificações no WhatsApp quando encontrarmos 
                as melhores oportunidades de passagens aéreas com milhas.
              </p>
              
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="text-lg"
                  onClick={() => document.getElementById('alert-form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Criar Meu Primeiro Alerta
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg"
                  onClick={() => navigate('/dashboard')}
                >
                  Ver Demonstração
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Como funciona
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Tecnologia avançada para encontrar as melhores ofertas de milhas automaticamente
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl bg-surface/80 p-8 shadow-elegant backdrop-blur-sm transition-smooth hover:shadow-primary">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Configure Alertas
            </h3>
            <p className="text-muted-foreground">
              Defina origem, destino, datas flexíveis e limites de milhas. 
              Nossa IA otimiza suas preferências para encontrar as melhores ofertas.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-surface/80 p-8 shadow-elegant backdrop-blur-sm transition-smooth hover:shadow-primary">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <Globe className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Monitoramento 24/7
            </h3>
            <p className="text-muted-foreground">
              Nosso sistema monitora continuamente programas de fidelidade 
              (LATAM, Smiles, TudoAzul) buscando oportunidades que correspondam aos seus critérios.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-surface/80 p-8 shadow-elegant backdrop-blur-sm transition-smooth hover:shadow-primary">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <Smartphone className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="mb-3 text-xl font-semibold text-foreground">
              Notificação Instantânea
            </h3>
            <p className="text-muted-foreground">
              Receba alertas via WhatsApp com todos os detalhes: milhas, taxas, 
              valor total em reais e instruções para emissão.
            </p>
          </div>
        </div>
      </section>

      {/* Alert Form Section */}
      <section id="alert-form" className="space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Crie seu primeiro alerta
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Comece a economizar hoje mesmo. É grátis e leva menos de 2 minutos.
          </p>
        </div>

        <AlertForm />
      </section>

      {/* Stats Section */}
      <section className="rounded-2xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-elegant md:p-12">
        <div className="space-y-8">
          <h2 className="text-3xl font-bold md:text-4xl">
            Resultados que falam por si
          </h2>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-2">
              <div className="text-4xl font-bold md:text-5xl">85%</div>
              <div className="text-primary-foreground/80">
                Economia média nas passagens encontradas
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold md:text-5xl">2min</div>
              <div className="text-primary-foreground/80">
                Tempo médio de notificação após oferta encontrada
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold md:text-5xl">50k+</div>
              <div className="text-primary-foreground/80">
                Ofertas monitoradas diariamente
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
