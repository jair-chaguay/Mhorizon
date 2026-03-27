import { IconosSVG, Recurso70, Recurso71, Recurso72, Recurso75 } from "../IconosSVG"
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
    <section className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-12 gap-12 items-end mb-20">
          <div className="md:col-span-7">
            <h2 className="text-4xl font-bold text-blue-200 tracking-tight mb-6
                    border-l-4 border-l-orange-500 px-5">
              Cómo Operamos
            </h2>
            <p className="text-lg font-light text-blue-200 leading-relaxed">
              Nuestra metodología integra el entendimiento de mercados de alta rotación
              con un rigor contable y fiscal especializado, protegiendo los márgenes de
              rentabilidad de su negocio.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {
            operamosP.map((prop: operamosProps) => (
              <OperamosCard key={prop.title} {...prop} />
            ))
          }
 

          <div className="bg-orange-500 p-10 rounded-xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/20 flex items-center justify-center 
              rounded-lg mb-8 text-white">
                <Recurso72/>
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">
                Finanzas & Tributación Tech
              </h3>
              <p className="text-white/90 font-light text-2sm leading-relaxed mb-6">
                Brindamos soporte especializado al área comercial de empresas tecnológicas, optimizando 
                sus estructuras contables y la gestión de impuestos para maximizar su rentabilidad operativa.
              </p>
              
              <a className="inline-flex items-center gap-2 text-sm font-bold text-white hover:underline" 
              href="#">
                Ver metodología
                <Recurso75 className="w-6"/>
              </a>
            </div>
            <div className="absolute -right-10 -bottom-10 opacity-20 text-white">
              <IconosSVG className="w-40"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
