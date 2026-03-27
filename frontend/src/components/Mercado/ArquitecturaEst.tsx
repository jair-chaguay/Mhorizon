import { ArquitecturaCard } from "./ArquitecturaCard"

interface arquitecturaProps{
    numero: string,
    title: string,
    content: string
}

const arquitecturas: arquitecturaProps[] = [
    {
        numero: "01",
        title: "Estructuración Fiscal y Contable",
        content: "Diseñamos marcos tributarios y contables precisos para corporaciones tecnológicas y de consumo, mitigando contingencias financieras y asegurando el cumplimiento de normativas locales e internacionales."
    },
    {
        numero: "02",
        title: "Optimización Comercial Integral",
        content: "Auditoría profunda de los flujos de ingresos, revisión de contratos comerciales y análisis de costos en mercados de alta rotación, garantizando la salud financiera de sus operaciones comerciales."
    }
]

export const ArquitecturaEst = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-8">

                <div className="flex flex-col md:flex-row gap-16 items-center">

                    <div className="w-full md:w-1/2 relative">

                        <div className="aspect-[15/14] rounded-md bg-gray-800 overflow-hidden 
                        relative shadow-2xl">

                            <img alt="Recurso02" className="w-full h-full object-cover"
                                src="/images/Recurso02.jpeg" />

                            <div className="absolute bottom-6 left-6 right-6 bg-blue-200/88 p-8 text-white 
                        rounded shadow-xl">

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <p className="text-orange-500 text-3xl font-extrabold mb-1">
                                            100%
                                        </p>
                                        <p className="text-[10px] uppercase tracking-widest font-bold 
                                            opacity-90">
                                            Cumplimiento Tributario
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-orange-500 text-3xl font-extrabold mb-1">
                                            +45%
                                        </p>
                                        <p className="text-[10px] uppercase tracking-widest font-bold 
                                        opacity-90">
                                            Eficiencia Financiera
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute -top-8 -left-8 w-32 h-32 border-l-4 border-t-4 border-orange-500 opacity-20"></div>
                    </div>

                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-blue-200 tracking-tight mb-8">
                            Arquitectura Estratégica
                        </h2>

                        <div className="flex flex-col gap-12">
                            {
                            arquitecturas.map((arquitectura: arquitecturaProps)=>(
                                <ArquitecturaCard key={arquitectura.title} {...arquitectura}/>
                            ))
                        }
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>
    )
}
