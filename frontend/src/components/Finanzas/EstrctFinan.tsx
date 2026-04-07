import { Recurso69, Resiliencia } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"
import { EstrctrCard } from "./EstrctrCard"

interface estructurasFinancieras {
    icon: React.ElementType,
    title: string,
    content: string
}

const estrucutras: estructurasFinancieras[] = [
    {
        icon: Resiliencia,
        title: "Outsourcing Contable y BPO",
        content: "Asumimos la gestión integral de su nómina, contabilidad y cumplimiento patronal, permitiendo que se enfoque 100% en la producción y las ventas."
    },
    {
        icon: Recurso69,
        title: "Estructuración a Gran Escala",
        content: "Asesoramiento para la apertura de sucursales, manejo de operaciones intercompañías y alineación de precios de transferencia."
    }
]

export const EstrctFinan = () => {
    return (
        <section className="py-24 bg-blue-200 overflow-hidden relative">
            <div className="absolute right-0 top-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent pointer-events-none"></div>

            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative z-10">

                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Ingeniería de negocios
                    </span>
                    <h2 className="text-white font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        ESTRUCTURA EMPRESARIAL
                    </h2>
                    <p className="mt-4 text-gray-400 text-[1.05rem] leading-relaxed max-w-2xl mx-auto">
                        Fortalecemos los cimientos de su corporación mediante estrategias diseñadas para el crecimiento sostenible y la absorción de impactos del mercado.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {
                        estrucutras.map((est: estructurasFinancieras) => (
                            <EstrctrCard key={est.title} {...est} />
                        ))
                    }
                </div>

                <div className="mt-16 flex justify-center reveal-element delay-300">
                    <div className="inline-flex items-center gap-4 bg-orange-500/10 border border-orange-500/30 px-6 py-4 rounded-full">
                        <span className="text-orange-500 text-3xl font-extrabold leading-none">100%</span>
                        <span className="text-white text-[0.85rem] font-bold uppercase tracking-widest border-l border-orange-500/30 pl-4 py-1">Precisión Auditada</span>
                    </div>
                </div>
            </ScrollReveal>
        </section>
    )
}
