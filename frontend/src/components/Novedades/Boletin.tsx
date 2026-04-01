import { Recurso77 } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"
import { BoletinCard } from "./BoletinCard"
import { Navegacion } from "./Navegacion"

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
        <section className="py-10 bg-gray-50 pb-24">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

                    {
                        boletines.map((boletin: boletinesProps) => (
                            <BoletinCard key={boletin.titulo} {...boletin} />
                        ))
                    }

                    <article className="bg-orange-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-center p-10 relative reveal-element delay-200 group text-white">
                        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                            <Recurso77 className="w-48 h-48" />
                        </div>
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white text-orange-500 flex items-center justify-center rounded-lg shadow-md mb-6">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <h3 className="text-[1.6rem] font-bold mb-4 leading-tight tracking-tight">
                                Reciba nuestras novedades en su correo
                            </h3>
                            <p className="text-white/90 font-light text-[0.95rem] mb-8 leading-relaxed">
                                Suscríbase para recibir mensualmente una síntesis de los cambios regulatorios e informativos
                                más relevantes del país.
                            </p>
                            <form className="space-y-4">
                                <input className="w-full bg-white/10 border border-white/30 rounded-md px-4 py-3 text-[0.95rem] placeholder:text-white/70 focus:bg-white/20 focus:border-white outline-none transition-all" placeholder="Correo electrónico corporativo" type="email" required />
                                <button type="button" className="w-full bg-blue-200 text-white font-bold py-3.5 rounded-md text-[0.85rem] hover:bg-white hover:text-blue-200 transition-colors duration-300 uppercase tracking-widest shadow-md cursor-pointer">
                                    SUSCRIBIRME
                                </button>
                            </form>
                        </div>

                    </article>

                </div>
                <Navegacion/>

            </ScrollReveal>

        </section>
    )
}
