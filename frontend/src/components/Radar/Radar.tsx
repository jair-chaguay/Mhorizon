import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { ScrollReveal } from '../ScrollReveal';
import "swiper/css";
import { RadarCard } from './RadarCard';

// Interfaz exportada para que la tarjeta la pueda usar
export interface NoticiaProps {
    id: string;
    titulo: string;
    categoria: string;
    noticia: string;
    content: string;
    image: string;
    url: string;
}

// Datos corregidos (con IDs únicos y sin errores de tipeo)
const mockNoticias: NoticiaProps[] = [
    {
        id: '1',
        titulo: "IMPUESTOS",
        categoria: "AENA",
        noticia: "SRI incrementa al 3% la retención sobre rendimientos",
        content: "Ajuste aplicable para pólizas a partir de este año.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        url: "https://aena.com.ec/ecuador-sri-incrementa-al-3-la-retencion-del-impuesto-a-la-renta-sobre-rendimientos-financieros-desde-marzo-de-2026/"
    },
    {
        id: '2',
        titulo: "Normativa",
        categoria: "Lexis",
        noticia: "SRI amplía plazo para declaraciones de impuestos",
        content: "Nuevas fechas tras intermitencias tecnológicas.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
        url: "https://www.lexis.com.ec/noticias/sri-amplia-plazo-para-declaraciones-e-impuestos-vencidos-el-12-de-enero-de-2026"
    },
    {
        id: '3',
        titulo: "Economía",
        categoria: "Primicias",
        noticia: "Deuda al SRI asciende a USD 2.388 millones",
        content: "El ranking actualizado de los mayores deudores fiscales.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop",
        url: "https://www.primicias.ec/economia/lista-contribuyentes-mayores-deudores-sri-impuestos-exportadora-noboa-117275/"
    },
    {
        id: '4',
        titulo: "Impuestos",
        categoria: "AENA",
        noticia: "SRI actualiza tabla de Impuesto a la Renta",
        content: "Conoce los nuevos rangos para personas naturales.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
        url: "#"
    },
];

export const Radar = () => {
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
                    {mockNoticias.map((client) => (
                        <SwiperSlide key={client.id} style={{ width: 'auto' }}>
                            <RadarCard {...client} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </ScrollReveal>
    );
};