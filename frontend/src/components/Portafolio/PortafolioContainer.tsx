
interface PortafolioProps {
    titulo: string,
    listaServicios?: string[]

}
export const PortafolioContainer = ({ titulo, listaServicios }: PortafolioProps) => {
  return (
            <div className="max-w-299 mx-auto px-5 sm:px-8 md:px-8">
                <div className="text-center mb-14 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        PORTAFOLIO
                    </span>
                    <h2 className="text-blue-200 uppercase font-extrabold text-[2rem] sm:text-[2.2rem] md:text-[2.5rem] tracking-tight leading-tight">
                        {titulo}
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto mt-6"></div>
                </div>

                <div className="bg-white p-8 md:p-12 shadow-xl rounded-2xl border border-gray-100 reveal-element delay-100">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-8">
                        {listaServicios && listaServicios.map((servicio, index) => (
                            <li key={index} className="flex items-start gap-4 group">
                                <div className="bg-orange-50 p-2.5 rounded-lg text-orange-500 shrink-0 mt-0.5 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <p className=" text-[0.95rem] leading-snug pt-1">{servicio}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        
  )
}
