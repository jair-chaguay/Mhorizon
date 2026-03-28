import { Link } from "react-router-dom"
import { CalculadoraProps } from "./CalculadoraProps"

interface CalculadoraItem {
  image: string
  title: string
  subtitle: string
}

const calculadora: CalculadoraItem[] = [
  {
    image: "images/Recurso10.png",
    title: "Análisis Predictivo",
    subtitle: "Proyecte sus obligaciones fiscales antes del cierre del ejercicio.",
  },
  {
    image: "images/Recurso10.png",
    title: "Cumplimiento Legal",
    subtitle: "Basado en las normativas vigentes del SRI para el período actual.",
  },
]

export const Calculadora = () => {
  return (
    <div
      id="calculadora"
      className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 px-5 sm:px-8 md:px-12 lg:px-20 py-14 md:py-16"
    >
      {/* Texto izquierda */}
      <div className="w-full max-w-[760px] md:w-190">
        <h2 className="text-white font-bold text-[1.9rem] sm:text-[2.1rem] md:text-[1.563rem] leading-tight text-center md:text-left">
          CALCULADORA DE <span className="text-orange-500">IMPUESTO A LA RENTA</span>
        </h2>

        <p className="text-white font-light text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] mt-3 text-center md:text-left">
          ¿Conoce el impacto real de su Impuesto a la Renta de este año?
        </p>

        <div className="mt-8 flex flex-col gap-5">
          {calculadora.map((props: CalculadoraItem) => (
            <CalculadoraProps key={props.title} {...props} />
          ))}
        </div>
      </div>

      {/* Card derecha */}
      <div className="w-full flex justify-center">
        <div className="bg-white py-8 px-6 sm:px-8 md:px-15 rounded-lg w-full max-w-[550px] md:w-[550px] shadow-xl">
          <h3 className="font-bold text-center text-[1.15rem] sm:text-[1.2rem] md:text-[1.24rem]">
            ANTICIPE SU FUTURO FINANCIERO
          </h3>

          <p className="mt-3 font-light text-center md:text-left text-[0.98rem] sm:text-[1rem]">
            Utilice nuestro simulador interactivo para obtener claridad sobre sus
            deducciones y proyecciones de pago.
          </p>

          <p className="font-light mb-5 text-center md:text-left text-[0.98rem] sm:text-[1rem]">
            Tome el control de sus finanzas corporativas hoy mismo.
          </p>

          <Link
            to={"/calculadora"}
            className="block w-full bg-orange-500 text-white rounded-sm text-[1rem] py-3 hover:bg-blue-200 transition-colors text-center duration-300 cursor-pointer"
          >
            ACCEDER AL SIMULADOR
          </Link>

          <p className="text-center italic mt-5 font-light text-[0.72rem] sm:text-[0.78rem]">
            Herramienta de uso gratuito para clientes y aliados estratégicos
          </p>
        </div>
      </div>
    </div>
  )
}