import { Link } from 'react-router-dom'

export const Logistica = () => {
    return (
        <div className='flex flex-col md:flex-row gap-0 md:gap-2 bg-white shadow-xl border border-gray-400/10 items-stretch rounded-md overflow-hidden h-full'>
            <div className='w-full md:w-[40%] lg:w-[35%] h-50 md:h-auto shrink-0'>
                <img className='w-full h-full object-cover' src="/images/Recurso56.png" alt="Logistica" />
            </div>
            
            <div className='p-6 md:p-10 w-full md:w-[60%] lg:w-[65%] flex flex-col justify-center'>
                <div className='flex flex-col gap-3'>
                    <p className='text-orange-500 tracking-wider text-[0.9rem] md:text-base'>
                        LOGÍSTICA & INDUSTRIA
                    </p>
                    <h4 className='text-blue-200 font-bold text-[1.2rem] md:text-[1.4rem] leading-tight'>
                        Cadena de Suministro y Operaciones
                    </h4>
                    <p className='text-blue-200 font-light mt-1 md:mt-2 text-[0.95rem] md:text-base'>
                        Aportamos rigor analítico y optimización a los procesos críticos de empresas
                        que sostienen la infraestructura, la producción y el comercio exterior a gran
                        escala.
                    </p>
                    <div className='grid grid-cols-2 lg:grid-cols-2 gap-2 md:gap-3 text-blue-200 font-light text-[0.75rem] md:text-[0.8rem] mt-2'>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Logística y Puertos</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Agroindustria</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Acuacultura</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Industria Química</p>
                    </div>
                    
                    <Link className='text-orange-500 text-[1rem] md:text-[1rem] mt-2 md:mt-4' to={"/sectores/cadena-suminsitros"}>
                        Conocer más →
                    </Link>
                </div>
            </div>
        </div>
    )
}