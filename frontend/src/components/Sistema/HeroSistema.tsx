import { ScrollReveal } from '../ScrollReveal'

export const HeroSistema = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 bg-blue-200/98 w-full min-h-98.5 md:h-95 overflow-hidden">     
            <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] pt-2 reveal-element">
                <h1 className='text-white drop-shadow-lg text-4xl sm:text-5xl md:text-[3.1rem] font-bold w-full tracking-tight leading-[1.15] md:leading-[1.1]'>
                    GUÍA DE OBLIGACIONES
                </h1>
                <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left font-light">
                    Consulte información general sobre obligaciones tributarias, societarias y laborales y verifique cuándo requiere asesoría especializada.
                </p>       
            </div>
        </ScrollReveal>
    )
}