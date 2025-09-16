import React, { useState } from 'react';
import { AlertCard } from '@/components/AlertCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, TrendingUp, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Mock data - seria vindo do backend
const mockAlerts = [
  {
    id: '1',
    origin: 'GRU',
    destination: 'MAD',
    dateFrom: '2024-03-01',
    dateTo: '2024-03-10',
    flexDays: 3,
    passengers: 1,
    cabinClass: 'economy',
    maxMiles: 60000,
    maxValueBrl: 3000,
    status: 'active' as const,
    lastOpportunity: {
      miles: 50000,
      taxesBrl: 780.50,
      totalBrl: 3200.75,
      provider: 'LATAM',
      foundAt: '2024-01-15T10:30:00Z'
    }
  },
  {
    id: '2',
    origin: 'GIG',
    destination: 'LIS',
    dateFrom: '2024-04-15',
    dateTo: '2024-04-25',
    flexDays: 7,
    passengers: 2,
    cabinClass: 'business',
    maxMiles: 120000,
    maxValueBrl: 6000,
    status: 'active' as const,
  },
  {
    id: '3',
    origin: 'BSB',
    destination: 'MIA',
    dateFrom: '2024-02-01',
    dateTo: '2024-02-15',
    flexDays: 0,
    passengers: 1,
    cabinClass: 'premium',
    maxMiles: 80000,
    maxValueBrl: 4500,
    status: 'paused' as const,
    lastOpportunity: {
      miles: 75000,
      taxesBrl: 1200.00,
      totalBrl: 4100.00,
      provider: 'Smiles',
      foundAt: '2024-01-12T15:45:00Z'
    }
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleViewDetails = (alertId: string) => {
    toast({
      title: "Detalhes do alerta",
      description: `Visualizando detalhes do alerta ${alertId}`,
    });
  };

  const handlePauseResume = (alertId: string) => {
    const alert = mockAlerts.find(a => a.id === alertId);
    const newStatus = alert?.status === 'active' ? 'paused' : 'active';
    
    toast({
      title: newStatus === 'active' ? "Alerta reativado" : "Alerta pausado",
      description: `O alerta foi ${newStatus === 'active' ? 'reativado' : 'pausado'} com sucesso.`,
    });
  };

  const filteredAlerts = mockAlerts.filter(alert => {
    const matchesSearch = searchTerm === '' || 
      alert.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalAlerts: mockAlerts.length,
    activeAlerts: mockAlerts.filter(a => a.status === 'active').length,
    totalOpportunities: mockAlerts.filter(a => a.lastOpportunity).length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Gerencie seus alertas e acompanhe as melhores ofertas de milhas
          </p>
        </div>
        
        <Button 
          variant="hero" 
          onClick={() => navigate('/')}
          className="w-fit"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Alerta
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-surface/80 p-6 shadow-elegant backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total de Alertas</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalAlerts}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-surface/80 p-6 shadow-elegant backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Alertas Ativos</p>
              <p className="text-3xl font-bold text-foreground">{stats.activeAlerts}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-accent shadow-accent">
              <Clock className="h-6 w-6 text-accent-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-surface/80 p-6 shadow-elegant backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Oportunidades</p>
              <p className="text-3xl font-bold text-foreground">{stats.totalOpportunities}</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary shadow-primary">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por origem ou destino..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-surface border-input focus:border-primary focus:ring-primary"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <div className="flex gap-2">
            <Badge 
              variant={statusFilter === 'all' ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setStatusFilter('all')}
            >
              Todos
            </Badge>
            <Badge 
              variant={statusFilter === 'active' ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setStatusFilter('active')}
            >
              Ativos
            </Badge>
            <Badge 
              variant={statusFilter === 'paused' ? 'default' : 'secondary'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setStatusFilter('paused')}
            >
              Pausados
            </Badge>
          </div>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredAlerts.map((alert) => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onViewDetails={handleViewDetails}
            onPauseResume={handlePauseResume}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredAlerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Target className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {searchTerm || statusFilter !== 'all' ? 'Nenhum alerta encontrado' : 'Nenhum alerta criado'}
          </h3>
          <p className="mb-6 text-muted-foreground">
            {searchTerm || statusFilter !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Crie seu primeiro alerta para começar a receber ofertas.'
            }
          </p>
          {(!searchTerm && statusFilter === 'all') && (
            <Button variant="hero" onClick={() => navigate('/')}>
              <Plus className="mr-2 h-4 w-4" />
              Criar Primeiro Alerta
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;