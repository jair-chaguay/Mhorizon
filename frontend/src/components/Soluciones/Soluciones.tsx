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
      "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua.",
    ruta: "/soluciones/consultoria-empresarial",
    delay: "delay-100"
  },
  {
    icon: <Gestion className="w-8 h-8" />,
    title: "GESTIÓN TRIBUTARIA",
    paragraph:
      "Convertimos su carga fiscal en eficiencia operativa, gestionamos la devolución de sus impuestos y le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales.",
    ruta: "/soluciones/gestion-tributaria",
    delay: "delay-200"

  },
  {

    icon: <Maletin className="w-8 h-8" />,
    title: "OUTSOURCING BPO",
    paragraph:
      "Enfoque toda su energía en el core bussines de su negocio mientras nosotros gestionamos su back-office.",
    ruta: "/soluciones/outsourcing",
        delay: "delay-300"

  },
  {
    icon: <GraficoLupa className="w-8 h-8" />,
    title: "AUDITORÍA FINANCIERA",
    paragraph:
      "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa acorde con las Normas Internacionales de Información Financiera (NIIF), detectando oportunidades de mejora.",
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
            Alineamos la estrategia operativa con la eficiencia fiscal y el rigor contable. Nuestras líneas de servicio están diseñadas para mitigar sus riesgos y catalizar el crecimiento de su corporación.
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