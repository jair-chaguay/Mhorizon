import { ScrollReveal } from "../ScrollReveal"
import { SolucionesCard } from "./SolucionesCard"

interface SolucionesProp {
  urlImg: string
  title: string
  paragraph: string
  ruta: string
}

const solucionProp: SolucionesProp[] = [
  {
    urlImg: "images/ICONO1.png",
    title: "CONSULTORÍA EMPRESARIAL",
    paragraph:
      "Transformamos los desafíos de su industria en ventajas competitivas. Evaluamos la estructura de su organización para diseñar estrategias de mejora continua.",
    ruta: "/soluciones/consultoria-empresarial"
  },
  {
    urlImg: "images/ICONO2.png",
    title: "GESTIÓN TRIBUTARIA",
    paragraph:
      "Convertimos su carga fiscal en eficiencia operativa. Le guiamos para cumplir estrictamente con las normativas del SRI, previniendo contingencias legales.",
    ruta: "/soluciones/gestion-tributaria"
  },
  {
    urlImg: "images/ICONO3.png",
    title: "OUTSOURCING",
    paragraph:
      "Enfoque toda su energía en el núcleo de su negocio mientras nosotros gestionamos su back-office.",
    ruta: "/soluciones/outsourcing"
  },
  {
    urlImg: "images/ICONO4.png",
    title: "AUDITORÍA FINANCIERA",
    paragraph:
      "Datos claros, transparentes y confiables. Evaluamos la salud financiera de su empresa con rigurosidad internacional, detectando oportunidades de mejora.",
    ruta: "/soluciones/auditoria"
  },
]

export const Soluciones = () => {
  return (
    <section className="bg-gray-800 py-24 border-b border-gray-200 overflow-hidden">

      <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
        <div className="text-center mb-24 reveal-element">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
            Capacidades Core
          </span>
          <h2 className="text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3.2rem] tracking-tight leading-tight">
            SOLUCIONES INTEGRALES
          </h2>
          <p className="mt-4 text-blue-200/70 font-light text-[1.15rem] leading-relaxed max-w-3xl mx-auto">
            Alineamos la estrategia operativa con la eficiencia fiscal y el rigor contable. Nuestras líneas de servicio están diseñadas para mitigar riesgos y catalizar el crecimiento de su corporación.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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