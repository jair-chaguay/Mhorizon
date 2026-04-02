export type ViewClienteID = 
  | 'dashboard-view' 
  | 'biblioteca-view' 
  | 'historial-view' 
  | 'informativos-view' 
  | 'ajustes-view';

export interface DocumentoCliente {
  id: string;
  nombre: string;
  carpeta: string;
  fecha: string;
  subidoPor: string;
  tipo: 'pdf' | 'excel';
}

export interface DeclaracionCliente {
  id: string;
  periodo: string;
  impuesto: string;
  estado: 'Pagada' | 'Borrador' | 'Pendiente';
  fechaPresentacion: string;
  gestionadoPor: string;
}