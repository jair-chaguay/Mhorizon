import { Link } from 'react-router-dom'

export const Estrategia = () => {
    return (
        <div className='bg-blue-200 px-12 py-20 w-[650px] flex flex-col gap-2 relative
        rounded-md shadow-xl overflow-hidden justify-center'>
            <p className='text-orange-500 tracking-wide font-light'>
                ESTRATEGIA & RIESGO
            </p>
            <h3 className='text-white fonft-bold text-[1.4rem]'>
                Finanzas y Servicios Corporativos
            </h3>
            <p className='text-white font-light'>
                Garantizamos la integridad, el cumplimiento normativo y la eficiencia operativa
                en instituciones donde la precisión es el núcleo del negocio exterior a gran escala.
            </p>
            <div className='grid grid-cols-2 mt-2 gap-3 text-white font-light text-[0.8rem]'>
                <p className='bg-gray-800/30 rounded-sm text-center '>Banca Tradicional</p>
                <p className='bg-gray-800/30 rounded-sm text-center '>Fintech y Pagos</p>
                <p className='bg-gray-800/30 rounded-sm text-center '>Seguros</p>
            </div>
            <Link className='text-orange-500 text-[1.2rem] text-end mt-4' to={"/sectores/cadena-finanzas"}>
                Conocer más →
            </Link>

            <div className='absolute w-30 h-35 -bottom-10 -left-6'>
                <img className='w-full h-full object-cover leading-none'
                    src="/images/Recurso58.png" alt="Recurso58" />
            </div>
        </div>
    )
}
