import { Recurso77 } from "../IconosSVG"
import { BoletinCard } from "./BoletinCard"

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
    },
    {
        etiqueta: "Laboral",
        fecha: "20 DE ENERO, 2026",
        image: "Recurso07.jpeg",
        titulo: "ACTUALIZACIÓN SALARIAL Y CÁLCULO DE APORTES",
        content: "Guía práctica para empleadores sobre el ajuste de nóminas, cálculo de aportes al IESS y beneficios sociales tras los recientes decretos gubernamentales."
    },
    {
        etiqueta: "Aduanero",
        fecha: "12 DE ENERO, 2026",
        image: "Recurso06.jpeg",
        titulo: "NUEVOS PROCESOS PARA EXPORTACIÓN DE SERVICIOS",
        content: "Revisión de la normativa aduanera vigente orientada a simplificar los procesos operativos para empresas exportadoras de servicios digitales."
    },
]

export const Boletin = () => {
    return (
        <section className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                {
                    boletines.map((boletin: boletinesProps) => (
                        <BoletinCard key={boletin.titulo} {...boletin} />
                    ))
                }

                <article className="bg-orange-500 rounded-xl overflow-hidden p-8 flex flex-col justify-center 
                    text-white shadow-lg">
                    <Recurso77 className="mb-6 w-12 h-12" />
                    <h3 className="text-2xl font-bold mb-4 leading-tight">
                        Reciba nuestras novedades en su correo
                    </h3>
                    <p className="text-white font-light text-md mb-8 leading-relaxed">
                        Suscríbase para recibir mensualmente una síntesis de los cambios regulatorios e informativos
                        más relevantes del país.
                    </p>
                    <form className="space-y-3">
                        <input className="w-full bg-blue-200/5 border border-white/20 rounded-md px-4 py-3 text-md
                         placeholder:text-white/70 focus:bg-blue-200/10 focus:border-white outline-none 
                         transition-all" placeholder="Correo electrónico" type="email"
                        />
                        <button className="w-full bg-blue-200 text-white font-medium py-3 rounded-md text-sm 
                        hover:opacity-90 transition-all uppercase tracking-wider shadow cursor-pointer">
                            SUSCRIBIRME
                        </button>
                    </form>
                </article>

            </div>
        </section>
    )
}
