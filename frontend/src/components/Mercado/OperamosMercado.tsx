import { IconosSVG, Recurso70, Recurso71, Recurso72, Recurso75 } from "../IconosSVG"
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
    title: "Optimización de Consumo (FMCG)",
    content: "Aceleramos la cadena de valor para marcas de alta rotación, garantizando disponibilidad, eficiencia y adaptación ágil al mercado.",
    list1: "Análiis de costos y márgenes",
    list2: "Auditoría de inventarios"
  },
  {
    icon: Recurso71,
    title: "Cumplimiento y Bienestar",
    content: "Aseguramos que cada producto y servicio cumpla rigurosamente con las normativas internacionales de calidad, seguridad y salud.",
    list1: "Auditoría de estándares globales",
    list2: "Trazabilidad de seguridad"
  }

]

export const OperamosMercado = () => {
  return (
    <section className="py-24 bg-gray-800 overflow-hidden border-b border-gray-200">
      <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

        <div className="mb-16 reveal-element text-center lg:text-left">
          <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
            Metodología de Acción
          </span>
          <h2 className="text-blue-200 font-bold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
            CÓMO <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">OPERAMOS</span>
          </h2>
          <p className="mt-4 text-gray-600 text-[1.05rem] leading-relaxed max-w-3xl lg:mx-0 mx-auto">
            Nuestra metodología integra el entendimiento de mercados de alta rotación con un rigor contable y fiscal especializado, protegiendo los márgenes de rentabilidad de su negocio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {
            operamosP.map((prop: operamosProps) => (
              <OperamosCard key={prop.title} {...prop} />
            ))
          }


          <div className="bg-orange-500 pt-20 pb-10 px-8 shadow-lg rounded-xl relative border border-gray-100 reveal-element delay-200 hover:shadow-2xl transition-shadow group">
            <div className="absolute -top-6 left-8 bg-white w-14 h-14 flex items-center justify-center rounded-lg shadow-lg group-hover:scale-110 transition-transform">
              <Recurso72 className="w-7 h-7 text-orange-500" />
            </div>

            <div className="mt-2 relative z-10">
              <h3 className="font-bold text-white text-[1.2rem] md:text-[1.3rem] leading-tight">
                Finanzas & Tributación Tech
              </h3>
              <p className="mt-4 text-white/90 text-[0.95rem] leading-relaxed mb-8">
                Brindamos soporte especializado al área comercial de empresas tecnológicas, optimizando
                sus estructuras contables y la gestión de impuestos para maximizar su rentabilidad operativa.
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
