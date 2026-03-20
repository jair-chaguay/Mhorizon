import { ClientCard } from "./ClientCard"
import {Swiper, SwiperSlide} from "swiper/react"
import { Autoplay, FreeMode } from "swiper/modules"
import "swiper/css"

interface ClientProps{
    urlImg: string,
    name: string
}

const props : ClientProps [] = [
    {
        urlImg: 'marcas/bancoam2.png',
        name: 'Banco Amazonas'
    },
    {
        urlImg: 'marcas/bigcola2.jpg',
        name: 'BigCola'
    },
    {
        urlImg: 'marcas/bp2.png',
        name: 'Banco del Pacifico'
    },
    {
        urlImg: 'marcas/cargi2l.png',
        name: 'Cargill'
    },
    {
        urlImg: 'marcas/cmag2.png',
        name: 'Cmag'
    },
    {
        urlImg: 'marcas/datafast2.png',
        name: 'Datafast'
    },
    {
        urlImg: 'marcas/delbank2.png',
        name: 'DelBank'
    },
    {
        urlImg: 'marcas/ecu2.jpg',
        name: 'EcuaEstibas'
    },
    {
        urlImg: 'marcas/hotelsol.jpg',
        name: 'Hotel Solymar'
    },
    {
        urlImg: 'marcas/images2.png',
        name: 'Cruz Roja'
    },
    {
        urlImg: 'marcas/interoc2.png',
        name: 'Interoc'
    },
    {
        urlImg: 'marcas/jho2.png',
        name: 'Jhonsom'
    },
    {
        urlImg: 'marcas/lanec2.png',
        name: 'Lanec'
    },
    {
        urlImg: 'marcas/logo-brenntag2.png',
        name: 'Brenntag'
    },
    {
        urlImg: 'marcas/marg2.png',
        name: 'Megarent'
    },
    {
        urlImg: 'marcas/pfc.png',
        name: 'Pacific Card'
    },
    {
        urlImg: 'marcas/proquilarv2.png',
        name: 'Proquilarv'
    },
    {
        urlImg: 'marcas/sagemar2.png',
        name: 'Sagemar'
    },
    {
        urlImg: 'marcas/Saltiveri-Ogilvy-ecuador2.jpg',
        name: 'Saltiveri'
    },
    {
        urlImg: 'marcas/sony2.png',
        name: 'Sony'
    },
    {
        urlImg: 'marcas/tpg2.png',
        name: 'TPG'
    },
    {
        urlImg: 'marcas/universal2.png',
        name: 'Universal'
    }
]


export const Clients = () => {
  return (
    <section className="mt-15">
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
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="clients-swiper"
      >
        {props.map((client) => (
          <SwiperSlide key={client.name}>
            <ClientCard {...client} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}