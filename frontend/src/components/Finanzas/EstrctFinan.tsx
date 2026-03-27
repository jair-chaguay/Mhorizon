import { Recurso69 } from "../IconosSVG"
import { EstrctrCard } from "./EstrctrCard"

interface estructurasFinancieras {
    icon: React.ElementType,
    title: string,
    content: string
}

const estrucutras: estructurasFinancieras[] = [
    {
        icon: Recurso69,
        title: "Resiliencia Estructural",
        content: "Diseño de estructuras de capital y flujos de caja capaces de absorber choques macroeconómicos sin comprometer la liquidez operativa."
    },
    {
        icon: Recurso69,
        title: "Estrategia de Transformación (M&A)",
        content: "Asesoramiento integral en fusiones, adquisiciones y reestructuraciones corporativas, desde la debida diligencia hasta la integración post-transacción."
    }
]

export const EstrctFinan = () => {
    return (
        <section className="py-24 bg-blue-200 text-white overflow-hidden border-b border-b-gray-500/20">
            <div className="max-w-7xl mx-auto px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <h2 className="text-5xl font-extrabold mb-12 leading-tight 
                            tracking-tighter">
                            Estructura
                            <br />
                            <span className="text-orange-500 italic font-medium font-headline">
                                Financiera
                            </span>
                        </h2>

                        <div className="space-y-12">
                            {
                                estrucutras.map((est: estructurasFinancieras) => (
                                    <EstrctrCard key={est.title} {...est} />
                                ))
                            }
                        </div>
                    </div>


                    <div className="relative">
                        <div className="relative z-10 w-4/5 aspect-4/5 rounded-md overflow-hidden translate-x-12">
                            <img alt="Recurso65"
                                className="w-full h-full object-cover"
                                src="/images/Recurso65.jpeg" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 z-20 w-2/5 aspect-square 
                        bg-orange-500 p-1 rounded-xl shadow-2xl">

                            <div className="w-full h-full bg-blue-200 flex flex-col items-center 
                            justify-center text-center p-8 rounded-md hover:bg-orange-500
                            transition-colors duration-300 hover:text-white text-orange-500 
                            cursor-pointer">
                                <span className="text-4xl font-bold mb-2  
                                ">
                                    100%
                                </span>
                                <span className="text-xs font-bold tracking-[0.3em]
                                uppercase">
                                    Precisión Auditada
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
