import type {TipoPersona} from "../types/calculadora";

interface Params {
  tipo: TipoPersona;
  ingresos: number;
  gastos: number;
}

export const calcularImpuesto = ({
  tipo,
  ingresos,
  gastos,
}: Params): number => {
  if (!tipo) return 0;

  const base = ingresos - gastos;

  if (base <= 0) return 0;

  if (tipo === "natural") return base * 0.1;
  if (tipo === "empresa") return base * 0.25;

  return 0;
};