export type TipoPersona = "natural" | "empresa" | null;

export interface FormularioData {
  tipo: TipoPersona;
  nombre: string;
  correo: string;
  ingresos: number;
  gastos: number;
}