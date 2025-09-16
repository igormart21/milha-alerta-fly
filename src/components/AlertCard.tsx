import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlaneIcon, CalendarIcon, Users, Target, Clock, ExternalLink } from 'lucide-react';

interface Alert {
  id: string;
  origin: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  flexDays: number;
  passengers: number;
  cabinClass: string;
  maxMiles: number;
  maxValueBrl: number;
  status: 'active' | 'paused' | 'expired';
  lastOpportunity?: {
    miles: number;
    taxesBrl: number;
    totalBrl: number;
    provider: string;
    foundAt: string;
  };
}

interface AlertCardProps {
  alert: Alert;
  onViewDetails?: (alertId: string) => void;
  onPauseResume?: (alertId: string) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ 
  alert, 
  onViewDetails, 
  onPauseResume 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-primary text-primary-foreground';
      case 'paused': return 'bg-secondary text-secondary-foreground';
      case 'expired': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'paused': return 'Pausado';
      case 'expired': return 'Expirado';
      default: return 'Desconhecido';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}h atrás`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d atrás`;
    }
  };

  return (
    <Card className="bg-surface/80 backdrop-blur-sm border-border shadow-lg hover:shadow-primary transition-smooth">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-lg font-bold">
              <PlaneIcon className="h-5 w-5 text-primary" />
              <span className="text-foreground">{alert.origin}</span>
              <span className="text-muted-foreground">→</span>
              <span className="text-foreground">{alert.destination}</span>
            </div>
          </div>
          <Badge className={getStatusColor(alert.status)}>
            {getStatusText(alert.status)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Informações do Alerta */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>{formatDate(alert.dateFrom)} - {formatDate(alert.dateTo)}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{alert.passengers} {alert.passengers === 1 ? 'passageiro' : 'passageiros'}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>±{alert.flexDays} dias flexível</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Target className="h-4 w-4" />
            <span>Até {formatCurrency(alert.maxValueBrl)}</span>
          </div>
        </div>

        {/* Última Oportunidade */}
        {alert.lastOpportunity && (
          <div className="rounded-lg bg-gradient-primary p-4 text-primary-foreground">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium opacity-90">Última Oportunidade</span>
              <Badge variant="outline" className="border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground">
                {alert.lastOpportunity.provider}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="font-bold">{alert.lastOpportunity.miles.toLocaleString()}</div>
                <div className="opacity-75">milhas</div>
              </div>
              <div>
                <div className="font-bold">{formatCurrency(alert.lastOpportunity.taxesBrl)}</div>
                <div className="opacity-75">taxas</div>
              </div>
              <div>
                <div className="font-bold">{formatCurrency(alert.lastOpportunity.totalBrl)}</div>
                <div className="opacity-75">total</div>
              </div>
            </div>
            <div className="mt-2 text-xs opacity-75">
              Encontrada {formatRelativeTime(alert.lastOpportunity.foundAt)}
            </div>
          </div>
        )}

        {!alert.lastOpportunity && (
          <div className="rounded-lg bg-muted/50 p-4 text-center text-muted-foreground">
            <Target className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">Monitorando... Você será notificado quando encontrarmos ofertas!</p>
          </div>
        )}

        {/* Ações */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewDetails?.(alert.id)}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Ver Detalhes
          </Button>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={() => onPauseResume?.(alert.id)}
          >
            {alert.status === 'active' ? 'Pausar' : 'Reativar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};