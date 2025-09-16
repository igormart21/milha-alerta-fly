import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, PlaneIcon, Users, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AlertFormData {
  origin: string;
  destination: string;
  dateFrom: string;
  dateTo: string;
  flexDays: number;
  passengers: number;
  cabinClass: string;
  maxMiles: number;
  maxValueBrl: number;
}

export const AlertForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AlertFormData>({
    origin: '',
    destination: '',
    dateFrom: '',
    dateTo: '',
    flexDays: 3,
    passengers: 1,
    cabinClass: 'economy',
    maxMiles: 60000,
    maxValueBrl: 3000,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.origin || !formData.destination) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha origem e destino.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Alerta criado com sucesso! ✈️",
      description: `Monitorando ${formData.origin} → ${formData.destination}. Você receberá notificações via WhatsApp.`
    });

    console.log('Alert created:', formData);
  };

  const updateFormData = (field: keyof AlertFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="mx-auto w-full max-w-2xl bg-surface/80 backdrop-blur-sm border-border shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-foreground">
          <PlaneIcon className="h-6 w-6 text-primary" />
          Criar Alerta de Passagem
        </CardTitle>
        <p className="text-muted-foreground">
          Configure seu alerta e receba as melhores ofertas de milhas no WhatsApp
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Origem e Destino */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin" className="text-sm font-medium">
                Origem *
              </Label>
              <Input
                id="origin"
                placeholder="Ex: GRU, São Paulo"
                value={formData.origin}
                onChange={(e) => updateFormData('origin', e.target.value)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="text-sm font-medium">
                Destino *
              </Label>
              <Input
                id="destination"
                placeholder="Ex: MAD, Madrid"
                value={formData.destination}
                onChange={(e) => updateFormData('destination', e.target.value)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="dateFrom" className="text-sm font-medium flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Data Inicial
              </Label>
              <Input
                id="dateFrom"
                type="date"
                value={formData.dateFrom}
                onChange={(e) => updateFormData('dateFrom', e.target.value)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo" className="text-sm font-medium">
                Data Final
              </Label>
              <Input
                id="dateTo"
                type="date"
                value={formData.dateTo}
                onChange={(e) => updateFormData('dateTo', e.target.value)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Flexibilidade e Passageiros */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="flexDays" className="text-sm font-medium">
                Flexibilidade (dias)
              </Label>
              <Select value={formData.flexDays.toString()} onValueChange={(value) => updateFormData('flexDays', parseInt(value))}>
                <SelectTrigger className="bg-surface border-input focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-input">
                  <SelectItem value="0">Datas exatas</SelectItem>
                  <SelectItem value="3">± 3 dias</SelectItem>
                  <SelectItem value="7">± 7 dias</SelectItem>
                  <SelectItem value="14">± 14 dias</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" />
                Passageiros
              </Label>
              <Select value={formData.passengers.toString()} onValueChange={(value) => updateFormData('passengers', parseInt(value))}>
                <SelectTrigger className="bg-surface border-input focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-input">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'passageiro' : 'passageiros'}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cabinClass" className="text-sm font-medium">
                Classe
              </Label>
              <Select value={formData.cabinClass} onValueChange={(value) => updateFormData('cabinClass', value)}>
                <SelectTrigger className="bg-surface border-input focus:border-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface border-input">
                  <SelectItem value="economy">Econômica</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Executiva</SelectItem>
                  <SelectItem value="first">Primeira Classe</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Limites */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="maxMiles" className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Máximo de Milhas
              </Label>
              <Input
                id="maxMiles"
                type="number"
                placeholder="60000"
                value={formData.maxMiles}
                onChange={(e) => updateFormData('maxMiles', parseInt(e.target.value) || 0)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxValueBrl" className="text-sm font-medium">
                Valor Máximo (R$)
              </Label>
              <Input
                id="maxValueBrl"
                type="number"
                placeholder="3000"
                value={formData.maxValueBrl}
                onChange={(e) => updateFormData('maxValueBrl', parseInt(e.target.value) || 0)}
                className="bg-surface border-input focus:border-primary focus:ring-primary"
              />
            </div>
          </div>

          {/* Botão de Submit */}
          <div className="pt-4">
            <Button 
              type="submit" 
              variant="hero" 
              className="w-full text-lg font-semibold"
              size="lg"
            >
              🚀 Criar Alerta
            </Button>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Você receberá notificações via WhatsApp quando encontrarmos ofertas
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};