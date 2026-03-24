import { HeroExCard } from "./HeroExCard"

interface HeroProps {
    img: string,
    title: string,
    content: string
}

const hero: HeroProps[] = [
    {
        img: "/images/Recurso32.png",
        title: "Dominancia del mercado",
        content: "Ampliación de la huella global a través de la visión basada en datos. Fabricación de ventajas."
    },
    {
        img: "/images/Recurso33.png",
        title: "Agilidad operativa",
        content: "Optimización de los procesos principales para lograr la máxima eficiencia. "
    },
    {
        img: "/images/Recurso34.png",
        title: "Aceleración del crecimiento",
        content: "Hoja de ruta estratégica para un valor sostenido a largo plazo. "
    }
]

export const HeroEx = () => {
    return (
        <section className="px-20 flex gap-6 items-center relative h-[500px] bg-[url('/images/Recurso35.png')] bg-cover bg-center">

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent"></div>
            <div className="relative">
                <h3 className='bg-blue-200 text-white text-[12px] font-light p-1 text-center w-[180px] rounded-sm'>
                    EXCELENCIA EMPRESARIAL
                </h3>
                <h1 className='text-white font-extrabold text-[2.9rem] text-shadow-lg  w-[500px] mt-5'>
                    Consultoría <span className='text-orange-500'>
                    <span className='underline underline-offset-12 decoration-4 decoration-orange-500'>Emp</span>resarial</span>
                </h1>
                <p className='text-white font-light mt-5 text-[1.2rem] w-[510px]'>
                    Impulsar el crecimiento institucional mediante una estrategia empresarial
                    sofisticada, excelencia operativa y liderazgo transformador.
                </p>
            </div>



            <div className="">
                <div className="flex flex-col gap-6 bg-white/50 relative shadow-2xl rounded-md p-10 w-[80%] ml-20">
                    {
                        hero.map((heroPr: HeroProps) => (
                            <HeroExCard key={heroPr.title} {...heroPr} />
                        ))
                    }
                </div>
            </div>
        </section>

    )
}
