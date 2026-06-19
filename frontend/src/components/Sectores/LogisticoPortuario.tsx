import { Link } from 'react-router-dom'

export const LogisticoPortuario = () => {
    return (
        <div className='flex flex-col lg:flex-row-reverse bg-blue-200 rounded-2xl shadow-xl overflow-hidden reveal-element delay-100 hover:shadow-2xl transition-shadow group'>
            <div className="w-full lg:w-1/2 h-75 lg:h-auto relative overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80" src="/images/LogisticoHero.avif" alt="Finanzas Corporativas" />
            </div>

            <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative'>
                <div className="absolute -top-6 lg:top-10 lg:-right-6 bg-white group-hover:bg-orange-500 duration-300 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg"
                    className='h-8 text-orange-500 font-bold group-hover:text-white'
                        viewBox="0 0 64 64"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2.5"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect x="6" y="28" width="20" height="14" rx="2" />
                        <line x1="10" y1="33" x2="22" y2="33" />
                        <line x1="10" y1="37" x2="18" y2="37" />
                        <line x1="32" y1="10" x2="32" y2="46" />
                        <line x1="32" y1="10" x2="54" y2="10" />
                        <line x1="48" y1="10" x2="54" y2="18" />
                        <line x1="44" y1="18" x2="44" y2="30" />
                        <rect x="40" y="30" width="8" height="8" />
                        <path d="M12 50H50L44 56H18L12 50Z" />
                        <line x1="20" y1="46" x2="38" y2="46" />
                        <path d="M6 58c3 2 5 2 8 0s5-2 8 0 5 2 8 0 5-2 8 0 5 2 8 0" />
                    </svg>
                </div>
                <p className="text-orange-500 font-bold tracking-widest text-[0.8rem] uppercase mb-2 mt-2 lg:mt-0">Comercio Exterior</p>
                <h3 className="text-white font-extrabold text-[1.6rem] md:text-[2rem] leading-tight mb-4 uppercase">Logísticos y Portuarios</h3>
                <p className="text-gray-300 font-light text-[1.02rem] leading-relaxed mb-6">
                    Aportamos rigor analítico, gestión aduanera y planeación fiscal en procesos críticos para empresas de comercio exterior, navieras y operadores logísticos a nivel nacional e internacional.
                </p>

                <div className='flex flex-wrap gap-2 mb-8'>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Comercio Exterior</p>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Navieras</p>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Almacenamiento</p>
                    <p className='px-3 py-1 bg-white/10 text-white border border-white/20 text-[0.75rem] uppercase tracking-wider rounded-sm'>Transporte</p>

                </div>
                <Link className='inline-flex items-center text-orange-500 font-bold uppercase tracking-wide text-[0.9rem] group/link hover:text-white transition-colors' to={"/sectores/logistico-portuario"}>
                    Conocer más →
                </Link>
            </div>
        </div>
    )
}