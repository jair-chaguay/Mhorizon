import { Button } from '../Button'
import { ScrollReveal } from '../ScrollReveal'

export const HeroSectores = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-138.5 bg-[url('/images/SECTORES.jpeg')] bg-cover bg-center overflow-hidden"> 
            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent">
            </div>        
            <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] pt-10 reveal-element">
                <p className='inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-2 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm'>
                    SECTORES DE ESPECIALIZACIÓN
                </p>
                <h1 className='text-white drop-shadow-lg text-[2.4rem] sm:text-[2.8rem] md:text-[3.5rem] font-bold w-full tracking-tight leading-[1.1]'>
                    IMPULSANDO EL ÉXITO <br className="hidden md:block" />
                    EN <span >CADA INDUSTRIA</span>
                </h1>
                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left font-light">
                    Nuestra visión estratégica se adapta a los desafíos específicos de los mercados más dinámicos, ofreciendo soluciones a medida que garantizan competitividad y cumplimiento en entornos corporativos complejos.
                </p>       
                
                <div className="mt-10 md:mt-12 flex">
                    <Button texto='AGENDAR ASESORÍA' estilosPersonalizados='bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300'/>
                </div>
            </div>
        </ScrollReveal>
    )
}