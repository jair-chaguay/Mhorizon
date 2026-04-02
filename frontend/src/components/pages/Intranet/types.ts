export type ViewID = 'view-directorio' | 'view-repositorio-root' | 'view-informativos'| 'view-noticias';

export interface Cliente {
  id: string
  nombre: string;
  ruc: string;
  score: number;
  vencimiento: string;
}