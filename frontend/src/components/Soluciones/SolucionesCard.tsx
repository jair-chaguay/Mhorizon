import { Link } from "react-router-dom"

interface SolucionesProp {
    urlImg: string
    title: string
    paragraph: string
    ruta: string
    index?: number
}

export const SolucionesCard = ({
    urlImg,
    title,
    paragraph,
    ruta,
    index = 0 
}: SolucionesProp) => {
    
    const delayClass = `delay-${(index + 1) * 100}`;

    return (
        <div className={`bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all hover:-translate-y-2 duration-300 border border-gray-100 group reveal-element ${delayClass}`}>

            <div className="flex justify-center items-center py-8 bg-gray-50/50 group-hover:bg-orange-50/30 transition-colors">
                <img className="w-24 h-24 object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110" src={urlImg} alt={title} />
            </div>

            <h3 className="flex items-center justify-center min-h-17.5 text-center text-[1.1rem] font-bold bg-blue-200 text-white px-4 tracking-wide">
                {title}
            </h3>

            <div className="flex flex-col flex-1 p-6 md:p-8">

                <p className="text-[0.95rem] text-gray-600 font-light text-center flex-1 leading-relaxed">
                    {paragraph}
                </p>

                <Link
                    className="mt-8 text-orange-500 text-[0.9rem] font-bold self-center uppercase tracking-wider hover:text-blue-200 transition-colors flex items-center gap-2"
                    to={ruta}
                >
                    Conocer más →
                </Link>
            </div>
        </div>
    );
};