import { ValoresCard } from "./ValoresCard"
import { Eyee, GavelIcon, Hands, VerifiedUser } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"

interface valoresProps {
    icon: React.ElementType,
    title: string,
    content: string

}

const valores: valoresProps[] = [
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
        icon: Eyee,
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
        <section className="bg-gray-800 py-24 overflow-hidden border-b border-gray-200">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 items-center reveal-element">
                    <div className="lg:col-span-5 border-l-6 border-l-orange-500 pl-4">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Nuestra Cultura
                        </span>
                        <h2 className="font-extrabold text-[2.2rem] sm:text-[2.6rem] md:text-[3rem] text-blue-200 leading-tight uppercase tracking-tight">
                            PRINCIPIOS <br />INNEGOCIABLES
                        </h2>
                    </div>

                    <div className="lg:col-span-7">
                        <p className="text-blue-200/70 text-[1.1rem] leading-relaxed max-w-2xl">
                            Estos pilares definen nuestra cultura corporativa y garantizan la excelencia probada en cada auditoría, asesoría legal y análisis financiero que entregamos.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                    {
                        valores.map((valor: valoresProps) => (
                            <ValoresCard key={valor.title} {...valor} />
                        ))
                    }
                </div>
            </ScrollReveal>
        </section>
    )
}
