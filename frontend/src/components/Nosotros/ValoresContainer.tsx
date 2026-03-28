import { ValoresCard } from "./ValoresCard"
import { GavelIcon, Hands, VerifiedUser } from "../IconosSVG"
import { Handshake } from "lucide-react"

interface valoresProps {
    icon: React.ElementType,
    title: string,
    content: string

}

const valores : valoresProps[] = [
    {
        icon: VerifiedUser,
        title: "Integridad Absoluta",
        content: "Transparencia y ética profesional en cada informe emitido, garantizando una confianza institucional inquebrantable ante los entes de control."
    },
    {
        icon: GavelIcon,
        title: "Rigor Normativo",
        content: "Actualización constante frente a las reformas del SRI y Superintendencia de Compañías para mitigar cualquier riesgo legal."
    },
    {
        icon: GavelIcon,
        title: "Visión estratégica",
        content: "No solo auditamos el pasado, proyectamos el futuro financiero de nuestros clientes mediante análisis de datos precisos."
    },
    {
        icon: Hands,
        title: "Cercanía Local",
        content: "Conocemos a profundidad el entorno de negocios del Ecuador, brindando un acompañamiento personalizado y directo."
    }
]

export const ValoresContainer = () => {
  return (
    <section className="py-32 bg-mh-white">
        <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-end">
                <div className="lg:col-span-5">
                    <h2 className="font-bold text-4xl md:text-4xl text-blue-200 leading-tight uppercase 
                        tracking-tighter border-l-4 border-orange-500 pl-6">
                            Nuestros<br/>Valores
                    </h2>
                </div>
                <div className="lg:col-span-7">
                    <p className="text-gray-500 text-lg md:text-lg leading-relaxed max-w-2xl md:mb-5">
                        Principios innegociables que definen nuestra cultura corporativa y garantizan la excelencia 
                        en cada auditoría, asesoría legal y análisis financiero.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 border-t border-slate-200 pt-2">
                {
                    valores.map((valor: valoresProps)=>(
                        <ValoresCard key={valor.title} {...valor}/>
                    ))
                }
            </div>
        </div>
    </section>
  )
}
