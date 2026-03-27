import { Recurso77 } from "../IconosSVG"
import { BoletinCard } from "../Novedades/BoletinCard"

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

        <section className="max-w-7xl mx-auto px-8 py-20">
            <h2 className="text-4xl text-blue-200 tracking-tighter mb-12 border-l-4 font-medium
            pl-8 border-l-orange-500">
                Información Relacionada</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    boletines.map((boletin: boletinesProps) => (
                        <BoletinCard key={boletin.titulo} {...boletin} />
                    ))
                }


            </div>
        </section>
    )
}
