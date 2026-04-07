import { Link } from 'react-router-dom'

export const Empresariales = () => {
    return (
        <div className='flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden reveal-element delay-200 hover:shadow-2xl transition-shadow group'>
            <div className="w-full lg:w-1/2 h-75 lg:h-auto relative overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="/images/Recurso55.avif" alt="Consumo y Tecnología" />
                <div className="absolute inset-0 bg-blue-200/10"></div>
            </div>

            <div className='w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 relative'>
                <div className="absolute -top-6 lg:top-10 lg:-left-6 bg-orange-500 w-12 h-12 flex items-center justify-center rounded-lg shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                </div>
                <p className="text-orange-500 font-bold tracking-widest text-[0.8rem] uppercase mb-2 mt-2 lg:mt-0">Asesoría Corporativa</p>
                <h3 className="text-blue-200 font-extrabold text-[1.6rem] md:text-[2rem] leading-tight mb-4">Servicios Empresariales</h3>
                <p className="text-gray-600 font-light text-[1.05rem] leading-relaxed mb-6">
                    Brindamos planeación corporativa, cumplimiento normativo y outsourcing estratégico para empresas orientadas al servicio. Blindamos su patrimonio y aseguramos el cumplimiento estricto ante SCVS y el SRI.
                </p>
                <div className='flex flex-wrap gap-2 mb-8'>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Consultoría B2B</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Tecnología y Software</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Salud Integral</p>
                    <p className='px-3 py-1 bg-gray-50 border border-gray-200 text-blue-200 text-[0.75rem] uppercase tracking-wider rounded-sm'>Inmobiliario</p>
                </div>
                <Link className='inline-flex items-center text-orange-500 font-bold uppercase tracking-wide text-[0.9rem] group/link hover:text-blue-200 transition-colors' to={"/sectores/servicios-empresariales"}>
                    Conocer más →
                </Link>
            </div>
        </div>
    )
}