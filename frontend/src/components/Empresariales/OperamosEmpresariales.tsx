import { IconosSVG, Recurso70, Recurso71, Recurso72 } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"
import { OperamosCard } from "./OperamosCard"

interface operamosProps {
  icon: React.ElementType,
  title: string,
  content: string,
  list1: string,
  list2: string
}

const operamosP: operamosProps[] = [
  {
    icon: Recurso70,
    title: "Consultoría y Estructuración Corporativa",
    content: "Acompañamos el crecimiento de su empresa B2B diseñando modelos de negocio eficientes y estrategias de mitigación de riesgos financieros.",
    list1: "Asesoría en fusiones y adquisiciones",
    list2: "Reestructuración societaria"
  },
  {
    icon: Recurso71,
    title: "Cumplimiento Normativo y Prevención",
    content: "Blindamos su patrimonio asegurando que sus reportes, estatutos y obligaciones tributarias estén perfectamente alineados con el SRI y la SCVS.",
    list1: "Auditoría de estados financieros",
    list2: "Control de riesgos regulatorios"
  }

]

export const OperamosEmpresariales = () => {
  return (
    <section className="py-24 bg-gray-800 overflow-hidden border-b border-gray-200">
      <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

        <div className="mb-16 reveal-element text-center lg:text-left ">
          <div className="          border-l-6 border-l-orange-500 pl-3">
            <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
              Metodología de Acción
            </span>
            <h2 className="text-blue-200 font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
              CÓMO OPERAMOS
            </h2>
          </div>
          <p className="mt-4 text-gray-600 text-[1.05rem] leading-relaxed max-w-3xl lg:mx-0 mx-auto">
            Integramos asesoría corporativa, estructuración fiscal y outsourcing integral para que su empresa de servicios escale con seguridad jurídica y eficiencia operativa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {
            operamosP.map((prop: operamosProps) => (
              <OperamosCard key={prop.title} {...prop} />
            ))
          }


          <div className="bg-blue-200 pt-20 pb-10 px-8 shadow-lg rounded-xl relative border border-gray-100 reveal-element delay-200 hover:shadow-2xl transition-shadow group">
            <div className="absolute -top-6 left-8 bg-orange-500 w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 group-hover:bg-white transition-all duration-300">
              <Recurso72 className="w-7 h-7 text-white group-hover:text-orange-500 transition-colors duration-300" />
            </div>

            <div className="mt-2 relative z-10">
              <h3 className="font-bold text-white text-[1.2rem] md:text-[1.3rem] leading-tight">
                Outsourcing BPO & Contabilidad
              </h3>
              <p className="mt-4 text-white/90 text-[0.95rem] leading-relaxed mb-8">
                Asumimos el control integral de su back-office, gestión de nómina patronal y contabilidad bajo normas NIIF, permitiendo a su equipo enfocarse al 100% en captar clientes y brindar servicios.
              </p>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 text-white">
              <IconosSVG className="w-40" />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
