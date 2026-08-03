import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { ScrollReveal } from '../ScrollReveal';
import "swiper/css";
import { RadarCard } from './RadarCard';
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export interface NoticiasDB {
    id: number;
    titulo: string;
    fuente: string;
    categoria: string;
    descripcion_corta: string;
    url_destino: string;
    imagen_url: string;
}


export const Radar = () => {
    const [noticias, setNoticias] = useState<NoticiasDB[]>([]);
    const [loading, setLoading] = useState(true);
    const BASE_URL = 'https://api.mhorizon.com.ec';


    const fetchNoticias = async () =>{
        try{
            const { data } = await api.get('/noticia');
            setNoticias(data.noticias || [])
        }catch(error){
            console.error("Error al cargar el radar financiero:", error);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNoticias();
    }, [])


    if (loading || noticias.length === 0) return null;


    return (
        <ScrollReveal>
            <section className="py-8 bg-[#101720] border-y border-white/5 overflow-hidden relative reveal-element">
                <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                        </span>
                        <h2 className="text-[0.95rem] text-white font-extrabold uppercase tracking-widest">
                            RADAR FINANCIERO ECUADOR
                        </h2>
                    </div>
                </div>

                {/* Gradientes para suavizar la entrada y salida de las tarjetas */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-r from-[#101720] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-l from-[#101720] to-transparent z-10 pointer-events-none"></div>

                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    speed={9000}
                    slidesPerView="auto" 
                    spaceBetween={20}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true, 
                        reverseDirection: true
                    }}
                    allowTouchMove={true}
                    className="clients-swiper px-4 w-full" 
                >
                    {noticias.map((item) => (
                        <SwiperSlide key={item.id} style={{ width: 'auto' }}>
                            <RadarCard 
                                titulo={item.categoria} // Usamos la categoría de la DB como tag superior
                                categoria={item.fuente}  // Usamos el medio como fuente
                                noticia={item.titulo}    // El título principal
                                content={item.descripcion_corta} 
                                image={`${BASE_URL}/storage/${item.imagen_url}`} // URL completa
                                url={item.url_destino}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </ScrollReveal>
    );
};