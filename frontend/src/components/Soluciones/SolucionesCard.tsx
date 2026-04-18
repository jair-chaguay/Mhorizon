import { Link } from "react-router-dom"

interface SolucionesProp {
    icon: React.ReactNode
    title: string
    paragraph: string
    ruta: string
    index?: number
}

export const SolucionesCard = ({
    icon,
    title,
    paragraph,
    ruta,
    index = 0
}: SolucionesProp) => {

    const delayClass = `delay-${(index + 1) * 100}`;

    return (
        <div className={`group relative bg-[#151E28] p-8 md:p-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/5 overflow-hidden reveal-element hover:-translate-y-1 ${delayClass}`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700 ease-out z-0"></div>
            
            <div className="relative z-10">
                {/* Aquí está el truco de los iconos: text-orange-500 que pasa a text-white */}
                <div className="w-16 h-16 mb-8 flex items-center justify-center rounded-xl bg-white/5 group-hover:bg-orange-500 text-orange-500 group-hover:text-white transition-colors duration-500">
                    {icon}
                </div>
            </div>

            <h3 className="relative z-10 text-xl font-extrabold text-white mb-4 uppercase tracking-wide">
                {title}
            </h3>

            <div className="relative z-10 flex flex-col flex-1">
                <p className="text-gray-300 font-light leading-relaxed mb-8 text-[1.05rem]">
                    {paragraph}
                </p>

                <Link
                    className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-orange-500 hover:text-white uppercase tracking-wider transition-colors w-fit"
                    to={ruta}
                >
                    Descubrir más
                    {/* SVG de la flecha con la misma animación del HTML */}
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                </Link>
            </div>
        </div>
    );
};