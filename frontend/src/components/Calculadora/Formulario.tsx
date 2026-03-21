import type { FormularioData } from "../types/calculadora";
import { InputField } from "./InputField";
import { TipoPersonaSelector } from "./TipoPersona";

interface Props {
    data: FormularioData;
    onChange: (data: FormularioData) => void;
    onSubmit: () => void;
}

export const Formulario = ({ data, onChange, onSubmit }: Props) => {
    return (
        <div className="bg-[#0f1c2e] text-white p-8 rounded shadow-lg relative">

            {/* Línea naranja lateral */}
            <div className="absolute right-0 top-0 h-full w-1 bg-orange-500"></div>

            <TipoPersonaSelector
                value={data.tipo}
                onChange={(tipo) => onChange({ ...data, tipo })}
            />

            <div className="flex flex-col gap-4">

                <InputField
                    label="Nombre Completo:"
                    value={data.nombre}
                    onChange={(value) => onChange({ ...data, nombre: value })}
                />

                <InputField
                    label="Correo Corporativo:"
                    type="email"
                    value={data.correo}
                    onChange={(value) => onChange({ ...data, correo: value })}
                />

                <InputField
                    label="Ingresos Gravables Estimados (Anuales):"
                    type="number"
                    value={data.ingresos}
                    onChange={(value) =>
                        onChange({ ...data, ingresos: Number(value) })
                    }
                />

                <InputField
                    label="Gastos Deducibles Estimados (Anuales):"
                    type="number"
                    value={data.gastos}
                    onChange={(value) =>
                        onChange({ ...data, gastos: Number(value) })
                    }
                />

                <button
                    onClick={onSubmit}
                    className="bg-orange-500 hover:bg-orange-600  cursor-pointer transition 
                    px-6 py-2 mt-4 w-fit justify-center"
                >
                    Calcular
                </button>

            </div>
        </div>
    );
};