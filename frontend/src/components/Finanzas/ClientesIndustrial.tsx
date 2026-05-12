import { Swiper, SwiperSlide } from "swiper/react"
import { ScrollReveal } from "../ScrollReveal"
import { Autoplay, FreeMode } from "swiper/modules"
import { ClientCard } from "../Clients/ClientCard"
import "swiper/css"

interface ClientsIndustrial {
    urlImg: string,
    name: string
}

const props: ClientsIndustrial[] = [
    {
        urlImg: '/marcas/bigcola.png',
        name: 'BigCola'
    },
    {
        urlImg: '/marcas/cargill.png',
        name: 'Cargill'
    },
    {
        urlImg: '/marcas/interoc.png',
        name: 'Interoc'
    },
    {
        urlImg: '/marcas/jhonson.png',
        name: 'Jhonsom'
    },
    {
        urlImg: '/marcas/lanec.png',
        name: 'Lanec'
    },
    {
        urlImg: '/marcas/brenntag.png',
        name: 'Brenntag'
    },
    {
        urlImg: '/marcas/proquilarv.png',
        name: 'Proquilarv'
    },
    {
        urlImg: '/marcas/sony.png',
        name: 'Sony'
    },
    {
        urlImg: '/marcas/universal.png',
        name: 'Universal'
    }
]

export const ClientesIndustrial = () => {
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
                        1024: { slidesPerView: 5 },
                        1280: { slidesPerView: 6 },
                        1536: { slidesPerView: 7 }
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
