
export const ExceOpera = () => {
    return (
        <div className='bg-gray-800 p-24 rounded-sm'>
            <h2 className='font-bold text-blue-200 text-[1.7rem] border-l-4 border-l-orange-500 
            px-10'>
                Excelencia Operacional
            </h2>
            <div className='mt-8 grid grid-cols-2 gap-10'>
                <div className='bg-white py-10 px-10 shadow-2xl relative border-gray-400/40 border'>
                    <div className='flex flex-col items-center bg-orange-500 absolute w-18 h-22 
                    -top-1 justify-items-end shadow-xl'>
                        <img className='size-10 mt-auto mb-4'
                            src="/images/Recurso47.png"
                            alt="Recurso47" />
                    </div>

                    <div className='mt-18 text-blue-200'>
                        <h3 className='font-bold text-[1.26rem] w-[50%]'>
                            Soporte administrativo especializado
                        </h3>
                        <p className='mt-5 font-light text-blue-200/80'>
                            Nuestro equipo se encarga de las tareas administrativas y burocráticas, permitiendo
                            que su equipo se concentre al 100% en la actividad principal. Utilizamos
                            metodologías ágiles para garantizar la ejecución precisa de cada tarea.
                        </p>
                    </div>

                    <img className='mt-3' src="/images/Recurso48.png" alt="Recurso48" />
                </div>

                <div className='bg-blue-200 py-10 px-10 shadow-xl relative h-[350px] w-[80%] ml-14'>

                    <div className='flex flex-col items-center bg-orange-500 absolute w-18 h-22 
                    -top-1 justify-items-end shadow-xl'>
                        <img className='w-10 mt-auto mb-4'
                            src="/images/Recurso46.png"
                            alt="Recurso47" />
                    </div>
                    <div className='text-white mt-18'>
                        <h3 className='font-bold text-[1.26rem]'>
                            Eficiencia de procesos
                        </h3>
                        <p className='mt-5 font-light text-white/88'>
                            Mapeamos y optimizamos los flujos de trabajo heredados, eliminando redundancias
                            y automatizando procesos manuales repetitivos con tecnología RPA de última
                            generación.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}
