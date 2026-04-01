import { Link } from "react-router-dom"
import { Recurso77 } from "../IconosSVG"
import { BoletinCard } from "../Novedades/BoletinCard"
import { ScrollReveal } from "../ScrollReveal"

interface boletinesProps {
    etiqueta: string,
    fecha: string,
    image: string,
    titulo: string,
    content: string
}

const boletines: boletinesProps[] = [
    {
        etiqueta: "Tributario",
        fecha: "27 DE FEBRERO, 2026",
        image: "Recurso04.jpeg",
        titulo: "ACTUALIZACIÓN TRIBUTARIA: NUEVOS PORCENTAJES DE RETENCIÓN 2026",
        content: "El SRI ha modificado los porcentajes de retención en la fuente de Impuesto a la Renta. La nueva regla general estipula una retención del 3% aplicable desde el 1 de marzo de 2026."
    },
    {
        etiqueta: "LEGAL",
        fecha: "15 DE FEBRERO, 2026",
        image: "Recurso05.jpeg",
        titulo: "CUMPLIMIENTO SOCIETARIO: DECLARACIÓN PATRIMONIAL",
        content: "Obligaciones y plazos clave para la presentación de la declaración patrimonial ante los organismos de control pertinentes durante el primer trimestre del año."
    },
    {
        etiqueta: "FINANCIERO",
        fecha: "05 DE FEBRERO, 2026",
        image: "Recurso06.jpeg",
        titulo: "CIERRE FISCAL Y NORMAS NIIF ACTUALIZADAS",
        content: "Análisis técnico sobre las recientes actualizaciones a las Normas Internacionales de Información Financiera y su impacto directo en el cierre contable anual."
    }
]


export const InfoRelaci = () => {
    return (

        <ScrollReveal as={"section"} className="py-24 bg-white border-b border-gray-200 overflow-hidden">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal-element gap-6">
                    <div className="max-w-2xl">
                        <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                            Thought Leadership
                        </span>
                        <h2 className="text-blue-200 font-bold text-[2.2rem] sm:text-[2.6rem] uppercase tracking-tight leading-tight">
                            INFORMATIVOS MHORIZON
                        </h2>
                    </div>
                    <Link to={"/novedades"} className="inline-flex items-center gap-2 text-blue-200 font-bold uppercase tracking-wider text-[0.9rem] border-b-2 border-blue-200 hover:text-orange-500 hover:border-orange-500 transition-colors pb-1">
                        Ver todos los informatiovs
                    </Link>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {
                        boletines.map((boletin: boletinesProps) => (
                            <BoletinCard key={boletin.titulo} {...boletin} />
                        ))
                    }


                </div>
            </div>
        </ScrollReveal>
    )
}
