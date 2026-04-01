import { Link } from "react-router-dom"
import { CalculadoraProps } from "./CalculadoraProps"
import { ScrollReveal } from "../ScrollReveal"

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
    <section id="calculadora" className="bg-blue-200 py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      <ScrollReveal className="max-w-350 mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-5 sm:px-8 md:px-12 relative z-10">


        <div className="w-full lg:w-[55%] reveal-element">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
            Herramienta Analítica
          </span>
          <h2 className="text-white font-extrabold text-[2.2rem] sm:text-[2.5rem] md:text-[2.8rem] leading-tight text-center lg:text-left">
            INTELIGENCIA FISCAL: <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">PROYECCIÓN DE RENTA</span>
          </h2>

          <p className="text-gray-300 text-[1.1rem] sm:text-[1.2rem] mt-6 text-center lg:text-left max-w-2xl leading-relaxed">
            ¿Conoce el impacto real de su Impuesto a la Renta de este año?
          </p>

          <div className="mt-10 flex flex-col gap-8">
            {calculadora.map((props: CalculadoraItem) => (
              <CalculadoraProps key={props.title} {...props} />
            ))}
          </div>
        </div>

        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end reveal-element delay-200">
          <div className="bg-white py-12 px-8 sm:px-10 rounded-2xl w-full max-w-125 shadow-2xl relative">

            <div className="absolute -top-6 -right-6 bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-blue-200">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
            </div>

            <h3 className="font-bold text-blue-200 text-center text-[1.3rem] md:text-[1.4rem] tracking-tight">
              ANTICIPE SU FUTURO FINANCIERO
            </h3>
            <div className="w-16 h-1 bg-orange-500 mx-auto mt-4 mb-6"></div>
            <p className="text-gray-600 text-center text-[1.05rem] leading-relaxed mb-8">
              Acceda a nuestra plataforma analítica exclusiva y tome el control estratégico de sus finanzas corporativas hoy mismo.
            </p>

            <Link
              to={"/calculadora"}
              className="block w-full bg-orange-500 text-white font-bold tracking-wider uppercase rounded-md text-[1.05rem] py-4 hover:bg-blue-200 transition-colors text-center shadow-md hover:shadow-xl duration-300"
            >
              ACCEDER AL SIMULADOR
            </Link>

            <p className="text-center text-gray-400 mt-6 font-medium text-[0.75rem] uppercase tracking-wider">
              ✓ Herramienta de uso gratuito para aliados estratégicos
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}