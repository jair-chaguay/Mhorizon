import { Button } from '../Button'

export const HeroSectores = () => {
    return (
        <section className="px-6 md:px-12 lg:px-20 flex gap-6 items-center relative h-137.5 md:h-125 bg-[url('/images/Recurso60.png')] bg-cover bg-center"> 
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/60 to-transparent md:bg-linear-to-r md:from-black md:via-black/80 md:to-transparent">
            </div>        
            <div className="relative z-10 w-full">
                <p className='bg-white/60 text-blue-200 w-45 md:w-52.5 rounded-sm text-center p-1 text-[0.65rem] md:text-[0.75rem] tracking-wider'>
                    SECTORES DE ESPECIALIZACIÓN
                </p>
                <h1 className='text-white text-shadow-lg text-[2.2rem] md:text-[2.9rem] font-bold mt-4 md:mt-5 w-full lg:w-132.5 tracking-wide leading-tight md:leading-normal'>
                    Impulsando el Éxito <br className="md:hidden" />
                    <span className='text-orange-500'>
                        {/* Reduje el offset del subrayado en móvil (offset-8) para que no se separe tanto de la palabra */}
                        <span className='underline underline-offset-8 md:underline-offset-18'>
                            <span className='text-white'> en </span> C
                        </span>ada industria
                    </span>
                </h1>
                <p className='text-white mt-4 md:mt-6 font-light text-shadow-md text-[1.05rem] md:text-[1.2rem] w-full md:w-[70%] lg:w-[45%] text-left md:text-justify leading-snug md:leading-normal'>
                    Nuestra visión estratégica se adapta a los desafíos específicos de los mercados
                    más dinámicos, ofreciendo soluciones a medida que garantizan competitividad y
                    cumplimiento.
                </p>        
                <div className="mt-8 md:mt-4">
                    <Button text="AGENDAR CONSULTORÍA"
                        styles="bg-orange-500 text-white font-medium w-full md:w-[240px] py-3 md:py-2 rounded-sm" />
                </div>
            </div>
        </section>
    )
}