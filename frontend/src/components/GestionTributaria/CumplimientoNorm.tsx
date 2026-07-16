import { ScrollReveal } from "../ScrollReveal"
import { CumplimientoCard } from "./CumplimientoCard"

interface cumplimientoProp {
    title: string,
    content: string
}

const normativos: cumplimientoProp[] = [
    {
        title: "Auditoría Preventiva",
        content: "Identificamos inconsistencias y áreas de riesgo antes de requerimientos o procesos de control, de acuerdo con el alcance contratado.  "
    },
    {
        title: "Reportes y obligaciones",
        content: "Asistimos en la preparación o revisión de reportes requeridos por el SRI, la Superintendencia de Compañías y otras entidades, según el servicio contratado."
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
                        CUMPLIMIENTO <br />NORMATIVO ESTRICTO
                    </h2>
                    <p className="text-gray-600  mt-6 text-[1.05rem] text-justify lg:text-left leading-relaxed">
                        En un entorno de cambios regulatorios frecuentes, acompañamos a la empresa en la revisión de obligaciones, documentación y procesos que inciden en su cumplimiento tributario.
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
                        <img className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-700" src="/images/CumplimientoNormativoBg.avif" alt="Cumplimiento Normativo" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                            <img className="w-24 mb-6 drop-shadow-2xl" src="/images/EscurdoCorporativo.png" alt="Escudo Institucional" />
                            <h3 className="text-white font-extrabold text-[1.4rem] uppercase tracking-widest drop-shadow-md">Escudo Corporativo</h3>
                            <div className="w-12 h-1 bg-orange-500 mt-4"></div>
                        </div>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}