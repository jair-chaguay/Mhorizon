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
        // flex-col para móvil y md:flex-row para tablet/desktop. 
        // Quité el gap-10 porque en diseño de columnas 50/50 suele ser mejor manejar el espacio con paddings internos.
        <div className='flex flex-col md:flex-row bg-blue-200 border-b border-b-gray-600/60'>
            
            {/* Columna Izquierda (Imagen) */}
            {/* En móvil le damos una altura mínima (min-h-[350px]) para que exista. En desktop tomará la altura del contenedor padre */}
            <div className="w-full md:w-1/2 relative min-h-[350px] md:min-h-full">
                {/* Imagen en absolute inset-0 garantiza que llene el espacio perfectamente */}
                <img className="absolute inset-0 w-full h-full object-cover opacity-70" src="/images/Recurso49.png" alt="Recurso49" />
                
                <div className="absolute inset-0 bg-linear-to-t from-black/80 md:from-black/60 via-black/40 md:via-black/20 to-transparent">
                </div>
            
                {/* Contenedor del texto sobre la imagen */}
                {/* Se quita el ml-10 en móvil para evitar que el texto se salga y se amplía el ancho */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 lg:p-4 lg:ml-10 w-full">
                    <h4 className='text-orange-500 font-medium text-[1.4rem] md:text-[1.5rem]'>
                        Reducción de costos
                    </h4>
                    <p className="text-white font-light mt-2 md:mt-3 w-full md:w-[90%] lg:w-[70%] mb-2 md:mb-6 text-[0.95rem] md:text-base">
                        Transformamos los costos fijos en costos variables, reduciendo los gastos en
                        infraestructura y los costos directos sin comprometer la calidad del servicio.
                    </p>
                </div>
            </div>

            {/* Columna Derecha (Contenido) */}
            <div className="w-full md:w-1/2 px-6 md:px-10 lg:px-12 py-12 md:py-16">
                <h4 className='text-orange-500 font-light tracking-widest text-[0.9rem] md:text-base'>
                    NUESTRO ENFOQUE
                </h4>
                <h2 className="text-white font-bold text-[1.5rem] md:text-[1.7rem] mt-2 md:mt-3">
                    Consultoría & Ejecución
                </h2>
                
                <div className="grid grid-cols-1 gap-8 md:gap-10 mt-8 items-center">
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