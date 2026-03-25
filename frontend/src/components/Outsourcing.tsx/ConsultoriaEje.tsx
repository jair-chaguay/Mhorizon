import { ConsultoríaCard } from "./ConsultoríaCard"

interface consultoriaProp {
    num: string,
    title: string,
    content: string
}

const consultoria: consultoriaProp[] = [
    {
        num: "01",
        title: "Diagnóstico en Profundidad",
        content: "Analizamos su estructura actual para identificar cuellos de botella y oportunidades de automatización inmediata."
    },
    {
        num: "02",
        title: "Configuración Personalizada",
        content: "Implementamos equipos y tecnologías específicamente alineados con la cultura y las necesidades de su empresa."
    },
    {
        num: "03",
        title: "Gestión de Indicadores Clave (KPI)",
        content: "Los paneles de control en tiempo real garantizan total transparencia sobre el rendimiento y la calidad de los entregables."
    }
]
export const ConsultoriaEje = () => {
    return (
        <div className='flex gap-10 bg-blue-200 border-b border-b-gray-600/60'>
            <div className="w-1/2 relative">
                <img className="w-full h-full object-cover opacity-70" src="/images/Recurso49.png" alt="Recurso49" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 
                to-transparent">
            </div>
            
                <div className="absolute bottom-0 p-4 ml-10">
                    <h4 className='text-orange-500 font-medium text-[1.5rem]'>
                        Reducción de costos
                    </h4>
                    <p className="text-white font-light mt-3 w-[70%] mb-6">
                        Transformamos los costos fijos en costos variables, reduciendo los gastos en
                        infraestructura y los costos directos sin comprometer la calidad del servicio.
                    </p>
                </div>
            </div>

            <div className="w-1/2 px-6 pt-12">
                <h4 className='text-orange-500 font-light tracking-widest'>
                    NUESTRO ENFOQUE
                </h4>
                <h2 className="text-white font-bold text-[1.7rem] mt-3">
                    Consultoría & Ejecución
                </h2>
                <div className="grid grid-cols-1 gap-10 mt-7 items-center">
                    {
                        consultoria.map((prop: consultoriaProp) => (
                            <ConsultoríaCard key={prop.title} {...prop} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}
