import { Link } from 'react-router-dom'

export const Financiero = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden reveal-element hover:shadow-2xl transition-shadow group'>
            <div className='w-full lg:w-1/2 h-75 lg:h-auto relative overflow-hidden'>
                <img className='absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700' src="/images/FinancieroHero.jpeg" alt="Logistica" />
                <div className="absolute inset-0 bg-blue-200/20"></div>
            </div>

            <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative'>
                <div className="absolute text-white -top-6 lg:top-10 lg:-left-6 bg-orange-500 group-hover:bg-blue-200 duration-300 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="30"
                        height="30"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M12 3l-9 6h18z" />

                        <path d="M4 17h16" />
                        <path d="M3 21h18" />

                        <path d="M6 11v6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M18 11v6" />
                    </svg>

                </div>
                <p className="text-orange-500 font-bold tracking-widest text-[0.8rem] uppercase mb-2 mt-2 lg:mt-0">Cumplimiento & Riesgo</p>
                <h3 className="text-blue-200 font-extrabold text-[1.6rem] md:text-[2rem] leading-tight mb-4">FINANCIERO</h3>
                <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed mb-6">
                    Garantizamos la integridad operativa, el cumplimiento normativo y la eficiencia fiscal en instituciones bancarias, aseguradoras y empresas de tecnología financiera (Fintech). Protegemos su estructura frente a regulaciones cambiantes.
                </p>

                <div className='flex flex-wrap gap-2 mb-8'>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Banca Tradicional</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Fintech y Pagos</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Seguros</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Cooperativas</p>
                </div>

                <Link className='inline-flex items-center text-orange-500 font-bold uppercase tracking-wide text-[0.9rem] group/link hover:text-blue-200 transition-colors' to={"/sectores/financiero"}>
                    Conocer Más →
                </Link>
            </div>
        </div>
    )
}