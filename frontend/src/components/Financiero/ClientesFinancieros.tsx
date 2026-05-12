import { Swiper, SwiperSlide } from "swiper/react"
import { ScrollReveal } from "../ScrollReveal"
import { Autoplay, FreeMode } from "swiper/modules"
import { ClientCard } from "../Clients/ClientCard"
import "swiper/css"

interface ClientsFinanciero {
    urlImg: string,
    name: string
}

const props: ClientsFinanciero[] = [
    {
        urlImg: '/marcas/bancoam2.png',
        name: 'Banco Amazonas'
    },
    {
        urlImg: '/marcas/bancoPacifico.png',
        name: 'Banco del Pacifico'
    },
    {
        urlImg: '/marcas/datafast.png',
        name: 'Datafast'
    },
    {
        urlImg: '/marcas/delbank.png',
        name: 'DelBank'
    },
    {
        urlImg: '/marcas/pacificard.png',
        name: 'Pacific Card'
    },
]

export const ClientesFinancieros = () => {
    return (
        <ScrollReveal>
            <section className="py-16 bg-white border-b border-gray-100 overflow-hidden relative reveal-element">
                <p className="text-center text-gray-400 font-bold tracking-widest text-[0.85rem] mb-10 uppercase px-4 max-w-4xl mx-auto">
                    PORTAFOLIO DE CLIENTES ACTUALES E HISTÓRICOS
                </p>
                <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10 pointer-events-none"></div>
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    freeMode={true}
                    speed={6000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: false,
                    }}
                    allowTouchMove={true}
                    spaceBetween={30}
                    className="clients-swiper w-full"

                    breakpoints={{
                        0: { slidesPerView: 2 },
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 4 },
                        1280: { slidesPerView: 4 },
                        1536: { slidesPerView: 4 }
                    }}
                >
                    {props.map((client) => (
                        <SwiperSlide key={client.name}>
                            <ClientCard {...client} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </ScrollReveal>
    )
}
