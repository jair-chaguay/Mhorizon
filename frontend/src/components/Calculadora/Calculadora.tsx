import { useState } from "react";
import { Formulario } from "./Formulario";
import { Resultado } from "./Resultado";
import { calcularImpuesto } from "../utils/calculadora";
import type { FormularioData } from "../types/calculadora";

export const Calculadora = () => {
  const [data, setData] = useState<FormularioData>({
    tipo: null,
    nombre: "",
    correo: "",
    ingresos: 0,
    gastos: 0,
  });

  const [resultado, setResultado] = useState<number | null>(null);

  const handleCalcular = () => {
    const result = calcularImpuesto(data);
    setResultado(result);
  };

  return (
    <section
      id="calculadora"
      className=" mt-16  relative"
    >
      <div className="top-10 w-0 h-0 border-t-40 border-t-transparent absolute 
        border-b-40 border-b-transparent border-l-40 border-l-orange-500 ">
      </div>

      <div className=" max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">


        <div className="md:w-1/2 space-y-4">
          <h1 className="text-[1.625rem] font-bold text-blue-200 leading-tight">
            CALCULADORA <br /> DE IMPUESTO A LA RENTA.
          </h1>

          <p className="text-orange-500 font-bold text-[1.313rem]">
            HERRAMIENTA GRATUITA
          </p>

          <p className="text-blue-200 font-light text-lg">
            ¿Conoce el impacto real de su Impuesto a la Renta de este año?
          </p>
        </div>


        {/* DERECHA */}
        <div className="md:w-1/2 relative">
          <Formulario
            data={data}
            onChange={setData}
            onSubmit={handleCalcular}
          />
        </div>

      </div>

      <Resultado resultado={resultado} />
    </section>
  );
};