import { ScrollReveal } from "../ScrollReveal"

// Recibimos los datos del informativo
export const HeroSubNov = ({ informativo }: { informativo: any }) => {
    
    // Formatear la fecha
    const fecha = new Date(informativo.created_at).toLocaleDateString('es-EC', { 
        day: 'numeric', month: 'long', year: 'numeric' 
    }).toUpperCase();

    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
    const bgImage = informativo.imagen_portada_url 
        ? `${backendUrl}/storage/${informativo.imagen_portada_url}` 
        : "/images/Recurso05.avif"; // Imagen por defecto si no subieron una

    return (
        <ScrollReveal as={"section"} 
            className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-97.5 bg-cover bg-center overflow-hidden"
            style={{ backgroundImage: `url('${bgImage}')` }}
        >
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/80 to-transparent">
            </div>
            <div className="relative z-10 w-full md:w-[75%] lg:w-full pt-10 pb-20 reveal-element">
                <div className="flex flex-wrap items-center gap-20 mb-4 justify-center">
                    
                    {/* Resolución Oficial (Si existe) */}
                    {informativo.resolucion_oficial && (
                        <span className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase backdrop-blur-sm">
                            {informativo.resolucion_oficial}
                        </span>
                    )}

                    {/* Fecha */}
                    <span className="text-gray-300 text-[0.85rem] font-medium tracking-wide flex items-center gap-2">
                        <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        {fecha}
                    </span>
                </div>

                {/* Título dinámico */}
                <h1 className="text-orange-500 drop-shadow-lg text-center text-[2.4rem] sm:text-[3rem] md:text-[3.8rem] font-extrabold w-full tracking-tight leading-[1.05]">
                    {informativo.titulo}
                </h1>

            </div>
        </ScrollReveal>
    )
}