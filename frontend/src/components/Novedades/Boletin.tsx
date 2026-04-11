import { Recurso77 } from "../IconosSVG"
import { ScrollReveal } from "../ScrollReveal"
import { BoletinCard } from "./BoletinCard"
import { Navegacion } from "./Navegacion"

interface BoletinProps {
    boletines: any[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const Boletin = ({ boletines, loading, currentPage, totalPages, onPageChange }: BoletinProps) => {

    const formatearFecha = (fechaIso: string) => {
        const fecha = new Date(fechaIso);
        return fecha.toLocaleDateString('es-EC', {
            day: '2-digit', month: 'long', year: 'numeric'
        }).toUpperCase();
    };

    return (
        <section className="py-10 bg-gray-50 pb-24">
            <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">

                {loading ? (
                    <div className="py-20 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                    </div>
                ) : boletines.length === 0 ? (
                    <div className="py-20 text-center text-gray-500 text-lg font-medium">
                        No se encontraron informativos con tu búsqueda.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {boletines.map((info) => (
                                <BoletinCard
                                    key={info.id}
                                    id={info.id}
                                    fecha={formatearFecha(info.created_at)}
                                    titulo={info.titulo}
                                    image={info.imagen_portada_url}
                                    content={info.descripcion_portada}
                                    resolucion={info.resolucion_oficial}
                                />
                            ))}

                            <ScrollReveal>
                                <article className="bg-orange-500 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-center h-130 p-10 relative reveal-element delay-200 group text-white">
                                    <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                                        <Recurso77 className="w-48 h-48" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="w-14 h-14 bg-white text-orange-500 flex items-center justify-center rounded-lg shadow-md mb-6">
                                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <h3 className="text-[1.6rem] font-bold mb-4 leading-tight tracking-tight">Reciba nuestras novedades en su correo</h3>
                                        <p className="text-white/90 font-light text-[0.95rem] mb-8 leading-relaxed">Suscríbase para recibir mensualmente una síntesis de los cambios regulatorios e informativos.</p>
                                        <form className="space-y-4">
                                            <input className="w-full bg-white/10 border border-white/30 rounded-md px-4 py-3 text-[0.95rem] placeholder:text-white/70 focus:bg-white/20 focus:border-white outline-none transition-all" placeholder="Correo electrónico" type="email" required />
                                            <button type="button" className="w-full bg-blue-200 text-white font-bold py-3.5 rounded-md text-[0.85rem] hover:bg-white hover:text-blue-200 transition-colors duration-300 uppercase tracking-widest shadow-md cursor-pointer">SUSCRIBIRME</button>
                                        </form>
                                    </div>
                                </article>
                            </ScrollReveal>
                        </div>

                        {totalPages > 1 && (
                            <Navegacion
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={onPageChange}
                            />
                        )}
                    </>
                )}

            </ScrollReveal>
        </section>
    )
}