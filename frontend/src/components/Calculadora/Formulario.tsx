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
        <div className="border mt-10 p-8 rounded-md shadow-sm flex gap-4 items-center">
            <div>
                <TipoPersonaSelector
                    value={data.tipo}
                    onChange={(tipo) => onChange({ ...data, tipo })}
                />

                <div className="grid md:grid-cols-1 gap-6">
                    <InputField styles="w-[350px] ml-2"
                        label="Nombre Completo:"
                        value={data.nombre}
                        onChange={(value) => onChange({ ...data, nombre: value })}
                    />

                    <InputField styles="w-[350px]"
                        label="Correo Corporativo:"
                        type="email"
                        value={data.correo}
                        onChange={(value) => onChange({ ...data, correo: value })}
                    />

                    <InputField styles="w-[190px]"
                        label="Ingresos Gravables Estimados (Anuales):"
                        type="number"
                        value={data.ingresos}
                        onChange={(value) =>
                            onChange({ ...data, ingresos: Number(value) })
                        }
                    />

                    <InputField styles="w-[190px] ml-1"
                        label="Gastos Deducibles Estimados (Anuales): "
                        type="number"
                        value={data.gastos}
                        onChange={(value) =>
                            onChange({ ...data, gastos: Number(value) })
                        }
                    />

                    <div className="flex justify-start pl-[20%]">
                        <button
                            onClick={onSubmit}
                            className="cursor-pointer  bg-orange-500 text-white px-6 py-2 
                                    rounded hover:bg-orange-600 transition-colors duration-300
                                    w-[220px] "
                            >
                            Calcular
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-[40%] flex items-center">
                <img src="images/ICONO3.png" alt="tmp" />
            </div>


        </div>
    );
};