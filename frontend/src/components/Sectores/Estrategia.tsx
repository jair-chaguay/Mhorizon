import { Link } from 'react-router-dom'

export const Estrategia = () => {
    return (
        <div className='bg-blue-200 px-6 md:px-12 py-10 md:py-20 w-full h-full flex flex-col gap-2 relative rounded-md shadow-xl overflow-hidden justify-center'>
            <div className='relative z-10 flex flex-col gap-2'>
                <p className='text-orange-500 tracking-wide font-light text-[0.9rem] md:text-base'>
                    ESTRATEGIA & RIESGO
                </p>
                <h3 className='text-white font-bold text-[1.2rem] md:text-[1.4rem]'>
                    Finanzas y Servicios Corporativos
                </h3>
                <p className='text-white font-light text-[0.95rem] md:text-base'>
                    Garantizamos la integridad, el cumplimiento normativo y la eficiencia operativa
                    en instituciones donde la precisión es el núcleo del negocio exterior a gran escala.
                </p>
                
                <div className='grid grid-cols-2 md:grid-cols-3 mt-2 gap-2 md:gap-3 text-white font-light text-[0.75rem] md:text-[0.8rem]'>
                    <p className='bg-gray-800/30 rounded-sm text-center py-1.5 px-1'>Banca Tradicional</p>
                    <p className='bg-gray-800/30 rounded-sm text-center py-1.5 px-1'>Fintech y Pagos</p>
                    <p className='bg-gray-800/30 rounded-sm text-center py-1.5 px-1'>Seguros</p>
                </div>
                <Link className='text-orange-500 text-[1.1rem] md:text-[1.2rem] text-left md:text-end mt-4' to={"/sectores/cadena-finanzas"}>
                    Conocer más →
                </Link>
            </div>
            <div className='absolute w-25 h-30 md:w-30 md:h-35 -bottom-6 md:-bottom-10 -left-4 md:-left-6 opacity-30 md:opacity-100 z-0'>
                <img className='w-full h-full object-contain leading-none'
                    src="/images/Recurso58.png" alt="Recurso58" />
            </div>
        </div>
    )
}