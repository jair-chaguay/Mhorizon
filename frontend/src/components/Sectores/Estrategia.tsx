import { Link } from 'react-router-dom'

export const Estrategia = () => {
    return (
        <div className='flex flex-col lg:flex-row-reverse bg-blue-200 rounded-2xl shadow-xl overflow-hidden reveal-element delay-100 hover:shadow-2xl transition-shadow group'>
            <div className="w-full lg:w-1/2 h-75 lg:h-auto relative overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" src="/images/Recurso58.png" alt="Finanzas Corporativas" />
            </div>

            <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative'>
                <div className="absolute -top-6 lg:top-10 lg:-right-6 bg-white w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-orange-500 font-bold tracking-widest text-[0.8rem] uppercase mb-2 mt-2 lg:mt-0">Estrategia & Riesgo</p>
                <h3 className="text-white font-extrabold text-[1.6rem] md:text-[2rem] leading-tight mb-4">Finanzas y Servicios Corporativos</h3>
                <p className="text-gray-300 font-light text-[1.05rem] leading-relaxed mb-6">
                    Garantizamos la integridad, el cumplimiento normativo y la eficiencia operativa en instituciones donde la precisión financiera y legal es el núcleo absoluto del negocio.
                </p>

                <div className='flex flex-wrap gap-2 mb-8'>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Banca Tradicional</p>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Fintech y Pagos</p>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Seguros</p>
                </div>
                <Link className='inline-flex items-center text-orange-500 font-bold uppercase tracking-wide text-[0.9rem] group/link hover:text-white transition-colors' to={"/sectores/cadena-finanzas"}>
                    Conocer más →
                </Link>
            </div>
        </div>
    )
}