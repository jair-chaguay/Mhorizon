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
        <section className="py-24 overflow-hidden relative">

            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 relative z-10">

                <div className="text-center mb-16 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Ingeniería de negocios
                    </span>
                    <div>
                        <h2 className="relative inline-block text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[2.8rem] tracking-tight leading-tight pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-500 after:rounded-full">
                        ESTRUCTURA EMPRESARIAL
                    </h2>
                    </div>
                    <p className="mt-4 text-gray-500 text-[1.05rem] leading-relaxed max-w-2xl mx-auto">
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
                    <div className="inline-flex items-center gap-4 bg-orange-500/10 border border-orange-500/30 px-6 py-6 rounded-full">
                        <span className="text-orange-500 text-3xl font-extrabold leading-none">100%</span>
                        <span className="text-orange-500 text-[0.88rem] font-bold uppercase tracking-widest border-l border-orange-500/30 pl-4 py-1">Precisión Auditada</span>
                    </div>
                </div>
            </ScrollReveal>

        </section>
    )
}
