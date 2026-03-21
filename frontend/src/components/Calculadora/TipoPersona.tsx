import type { TipoPersona } from "../types/calculadora";
interface Props {
  value: TipoPersona;
  onChange: (tipo: TipoPersona) => void;
}

export const TipoPersonaSelector = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-4 mb-6">
  <span className="font-medium">Soy:</span>

  <label className="flex items-center gap-2">
    Persona natural
    <input
      type="checkbox"
      checked={value === "natural"}
      onChange={() => onChange("natural")}
    />
  </label>

  <label className="flex items-center gap-2">
    Empresa
    <input
      type="checkbox"
      checked={value === "empresa"}
      onChange={() => onChange("empresa")}
    />
  </label>
</div>
  );
};