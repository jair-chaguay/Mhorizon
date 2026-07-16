import { ScrollReveal } from "../ScrollReveal"
import { AuditoriaCard } from "./AuditoriaCard"

interface autProps {
  icon: string,
  title: string,
  content: string,
}

const aut: autProps[] = [
  {
    icon: "/images/Compliance.png",
    title: "Cumplimiento y Revisión",
    content: "Revisamos obligaciones y operaciones frente a la normativa nacional y, cuando corresponde, a reglas de fiscalidad internacional, identificando riesgos y acciones preventivas.",
  },
  {
    icon: "/images/OptimizacionEstrc.png",
    title: "Eficiencia Tributaria",
    content: "Evaluamos alternativas permitidas por la normativa para estructurar operaciones de manera eficiente y coherente con la realidad económica del negocio.",
  }
]

export const AuditoriaPlan = () => {
  return (
    <section className="bg-white py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center, var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

      <ScrollReveal as={"div"} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-10 items-center relative z-10 px-5 sm:px-8 md:px-12">

        <div className="w-full lg:w-[50%] flex flex-col gap-10 reveal-element">
          <div className="border-l-4 border-l-orange-500 px-4 md:px-6">
            <h2 className="text-blue-200 text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] font-extrabold tracking-tight leading-tight">
              EXPERIENCIA EN <br />CONSULTORÍA TRIBUTARIA
            </h2>
            <p className="mt-5 text-gray-700 font-light text-justify md:text-left w-full md:pr-10 leading-relaxed text-[1.05rem]">
              Nuestro enfoque integra conocimiento normativo, comprensión del negocio y experiencia práctica para evaluar los efectos tributarios de operaciones nacionales e internacionales.  
            </p>
          </div>

          <div className="bg-blue-200 border border-white/5 rounded-r-xl py-8 shadow-2xl relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-2 bg-orange-500"></div>
            <p className="text-gray-300 italic font-light px-8 md:px-12 text-[1.1rem] md:text-[1.2rem]">
              "Analizamos el efecto tributario antes de ejecutar operaciones relevantes y formulamos recomendaciones sustentadas para reducir riesgos y mejorar la toma de decisiones."
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 mx-6 md:mx-20 w-auto md:w-[50%]'>
          {
            aut.map((auditoria: autProps) => (
              <AuditoriaCard key={auditoria.title} {...auditoria} />
            ))
          }
        </div>
      </ScrollReveal>
    </section>
  )
}