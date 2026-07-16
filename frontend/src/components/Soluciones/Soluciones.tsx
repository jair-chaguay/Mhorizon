import { ScrollReveal } from "../ScrollReveal"
import { SolucionesCard } from "./SolucionesCard"
import { Consultoria, Gestion, Maletin, GraficoLupa } from "../IconosSVG"

interface SolucionesProp {
  icon: React.ReactNode
  title: string
  paragraph: string
  ruta: string
  delay: string
}

const solucionProp: SolucionesProp[] = [
  {
    icon: <Consultoria className="w-8 h-8" />,
    title: "CONSULTORÍA EMPRESARIAL",
    paragraph:
      "Analizamos la información financiera, los procesos y los controles de su empresa para identificar riesgos, mejorar la gestión de caja y respaldar decisiones de crecimiento.",
    ruta: "/soluciones/consultoria-empresarial",
    delay: "delay-100"
  },
  {
    icon: <Gestion className="w-8 h-8" />,
    title: "ESTRATEGIA Y DEFENSA TRIBUTARIA",
    paragraph:
      "Prevenimos contingencias, resolvemos consultas, gestionamos devoluciones de impuestos y acompañamos a su empresa en procesos administrativos y controversias tributarias.",
    ruta: "/soluciones/gestion-tributaria",
    delay: "delay-200"

  },
  {

    icon: <Maletin className="w-8 h-8" />,
    title: "OUTSOURCING BPO",
    paragraph:
      "Permita que su equipo se concentre en el negocio mientras MHORIZON gestiona sus procesos contables, tributarios y de nómina con controles, supervisión y reportes oportunos. ",
    ruta: "/soluciones/outsourcing",
        delay: "delay-300"

  },
  {
    icon: <GraficoLupa className="w-8 h-8" />,
    title: "AUDITORÍA FINANCIERA",
    paragraph:
      "Auditamos estados financieros bajo Normas Internacionales de Auditoría y evaluamos su presentación conforme a NIIF, fortaleciendo la confianza en la información de la empresa.",
    ruta: "/soluciones/auditoria",
        delay: "delay-400"

  },
]

export const Soluciones = () => {
  return (
    <section className="bg-gray-800 py-24 border-b border-gray-200 overflow-hidden">

      <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
        <div className="text-center mb-24 reveal-element">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
            Capacidades Básicas
          </span>
          <h2 className="relative inline-block text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] tracking-tight leading-tight pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-500 after:rounded-full">
            SOLUCIONES INTEGRALES
          </h2>
          <p className="mt-4 text-blue-200/70 font-light text-[1.1rem] leading-relaxed max-w-3xl mx-auto">
            Combinamos experiencia tributaria, financiera, contable y de control para resolver problemas concretos, reducir riesgos y acompañar las decisiones de su empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {solucionProp.map((solucion) => (
            <SolucionesCard
              key={solucion.title}
              {...solucion}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}