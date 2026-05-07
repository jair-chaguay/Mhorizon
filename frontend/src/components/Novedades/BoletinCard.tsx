import { Link } from 'react-router-dom'
import { Recurso74 } from '../IconosSVG'
import { ScrollReveal } from '../ScrollReveal';

export interface boletinesProps {
    id: number;
    fecha: string;
    resolucion: string;
    image: string | null;
    titulo: string;
    content: string;
}

export const BoletinCard = ({ id, fecha, image, titulo, content, resolucion }: boletinesProps) => {

    const obtenerUrlImagen = (ruta: string | null) => {
        return ruta || '/images/Recurso04.jpeg'
    };

    return (
        <ScrollReveal>
            <article className="bg-blue-200 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group reveal-element border border-gray-100 h-130">
                <div className="relative h-56 overflow-hidden bg-blue-200">
                    <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 block grayscale mix-blend-luminosity opacity-80 group-hover:grayscale-0 group-hover:mix-blend-normal group-hover:opacity-100"
                        alt={titulo}
                        src={obtenerUrlImagen(image)}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-bg-blue-200 via-transparent to-transparent opacity-80">
                    </div>
                </div>
                <div className="p-8 flex flex-col grow relative z-20 -mt-4">
                    <div className='flex justify-between'>
                        <time className="text-xs font-bold text-orange-500 mb-3 tracking-tighter uppercase">
                            {fecha}
                        </time>
                        <h4 className='text-xs font-bold text-orange-500 mb-3 tracking-tighter uppercase mr-4'>
                            {resolucion}
                        </h4>
                    </div>
                    <h3 className="text-xl font-bold text-white leading-snug mb-4 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {titulo}
                    </h3>
                    <p className="text-gray-800/80 font-light group-hover:text-gray-800 text-sm leading-relaxed mb-8 grow transition-colors line-clamp-3">
                        {content}
                    </p>
                    {/* Opcional: Pasar el ID en la URL para ver el detalle */}
                    <Link to={`/novedades-sub/${id}`} className="inline-flex items-center gap-2 text-white font-medium text-sm group/link hover:text-orange-500 transition-colors">
                        Leer boletín completo
                        <Recurso74 className="text-lg group-hover/link:translate-x-1 transition-transform w-6 h-6" />
                    </Link>
                </div>
            </article>
        </ScrollReveal>
    )
}