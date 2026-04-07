import { Link } from 'react-router-dom'

export const Financiero = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden reveal-element hover:shadow-2xl transition-shadow group'>
            <div className='w-full lg:w-1/2 h-75 lg:h-auto relative overflow-hidden'>
                <img className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src="/images/Recurso56.png" alt="Logistica" />
                <div className="absolute inset-0 bg-blue-200/20"></div>
            </div>

            <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative'>
                <div className="absolute -top-6 lg:top-10 lg:-left-6 bg-orange-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <p className="text-orange-500 font-bold tracking-widest text-[0.8rem] uppercase mb-2 mt-2 lg:mt-0">Cumplimiento & Riesgo</p>
                <h3 className="text-blue-200 font-extrabold text-[1.6rem] md:text-[2rem] leading-tight mb-4">Sector Financiero</h3>
                <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed mb-6">
                    Garantizamos la integridad operativa, el cumplimiento normativo y la eficiencia fiscal en instituciones bancarias, aseguradoras y empresas de tecnología financiera (Fintech). Protegemos su estructura frente a regulaciones cambiantes.
                </p>

                <div className='flex flex-wrap gap-2 mb-8'>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Banca Tradicional</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Fintech y Pagos</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Seguros</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Cooperativas Química</p>
                </div>

                <Link className='inline-flex items-center text-orange-500 font-bold uppercase tracking-wide text-[0.9rem] group/link hover:text-blue-200 transition-colors' to={"/sectores/financiero"}>
                    Solicitar Asesoría'→
                </Link>
            </div>
        </div>
    )
}