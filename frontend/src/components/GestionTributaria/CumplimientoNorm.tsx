import { ScrollReveal } from "../ScrollReveal"
import { CumplimientoCard } from "./CumplimientoCard"

interface cumplimientoProp {
    title: string,
    content: string
}

const normativos: cumplimientoProp[] = [
    {
        title: "Auditoría Preventiva",
        content: "Detección proactiva de inconsistencias y simulación de auditorías antes de las notificaciones oficiales del ente de control (SRI)."
    },
    {
        title: "Informes de Transparencia",
        content: "Preparación técnica de reportes requeridos para la Superintendencia de Compañías (SCVS) y entidades fiscales gubernamentales."
    }
]

export const CumplimientoNorm = () => {
    return (
        <section className="py-24 bg-gray-800 relative overflow-hidden">
            <ScrollReveal as={"div"} className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 px-5 sm:px-8 md:px-12 items-center relative z-10">
                <div className="w-full md:w-[55%] lg:w-[50%] mt-2 md:mt-0">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.8rem] uppercase mb-2 block text-center lg:text-left">
                        Gobernanza Corporativa
                    </span>
                    <h2 className="text-blue-200 font-extrabold text-[2rem] md:text-[2.5rem] text-center lg:text-left leading-tight">
                        CUMPLIMIENTO <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-orange-600">NORMATIVO ESTRICTO</span>
                    </h2>
                    <p className="text-gray-600  mt-6 text-[1.05rem] text-justify lg:text-left leading-relaxed">
                        En un entorno de transparencia fiscal total impulsado por regulaciones internacionales (convergencia OCDE/BEPS), el cumplimiento normativo es la base innegociable de la reputación corporativa. Actuamos como su principal aliado estratégico.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
                        {
                            normativos.map((prop: cumplimientoProp) => (
                                <CumplimientoCard key={prop.title} {...prop} />
                            ))
                        }
                    </div>
                </div>

                <div className="w-full lg:w-[45%] h-112.5 relative order-1 lg:order-2 reveal-element delay-200">
                    <div className="bg-blue-200 flex flex-col items-center justify-center rounded-2xl overflow-hidden shadow-2xl w-full h-full relative group">
                        <img className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" src="/images/Recurso01.avif" alt="Cumplimiento Normativo" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <img className="w-24 mb-6 drop-shadow-2xl" src="/images/Recurso43.png" alt="Escudo Institucional" />
                            <h3 className="text-white font-extrabold text-[1.4rem] uppercase tracking-widest drop-shadow-md">Escudo Corporativo</h3>
                            <div className="w-12 h-1 bg-orange-500 mt-4"></div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}