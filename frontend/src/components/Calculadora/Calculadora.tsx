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
    <section className="max-w-5xl mx-auto py-16 px-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-[1.563rem] underline underline-offset-8 decoration-orange-500 font-bold text-center">
          CALCULADORA DE IMPUESTO A LA RENTA
        </h1>

        <p className="text-center text-[1.313rem] text-orange-500 font-semibold mt-4">
          HERRAMIENTA GRATUITA
        </p>

        <p className="text-center text-[1rem]  text-gray-600">
          ¿Conoce el impacto real de su Impuesto a la Renta de este año?
        </p>

        <p className="text-[1rem]  text-justify">No deje las finanzas de su empresa al azar. Anticípese a sus obligaciones fiscales con nuestra Calculadora Tributaria preliminar. Ingrese sus datos básicos y obtenga una proyección instantánea para planificar su flujo de caja con seguridad jurídica.</p>

      </div>

      <Formulario
        data={data}
        onChange={setData}
        onSubmit={handleCalcular}
      />

      <Resultado resultado={resultado} />
    </section>
  );
};