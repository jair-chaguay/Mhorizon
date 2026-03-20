import type { TipoPersona } from "../types/calculadora";
interface Props {
  value: TipoPersona;
  onChange: (tipo: TipoPersona) => void;
}

export const TipoPersonaSelector = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-6 mb-6">
      <span className="font-medium">Soy:</span>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          checked={value === "natural"}
          onChange={() => onChange("natural")}
        />
        Persona natural
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          checked={value === "empresa"}
          onChange={() => onChange("empresa")}
        />
        Empresa
      </label>
    </div>
  );
};