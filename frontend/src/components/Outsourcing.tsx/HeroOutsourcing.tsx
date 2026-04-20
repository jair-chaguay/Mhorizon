import { Button } from '../Button';
import { ScrollReveal } from '../ScrollReveal';

export const HeroOutsourcing = () => {

    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-138.5 bg-[url('/images/Recurso39.png')] bg-cover bg-center overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent">
            </div>

            <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] pt-10 reveal-element">
                <p className='inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm'>
                    GESTIÓN DELEGADA DE CLASE MUNDIAL
                </p>

                <h1 className='text-white drop-shadow-lg text-[2.4rem] sm:text-[2.8rem] md:text-[3.5rem] font-bold w-full tracking-tight leading-[1.1]'>
                    OUTSOURCING BPO<br />
                    ESTRATÉGICO
                </h1>

                <p className='text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] w-full leading-relaxed drop-shadow-md text-left'>
                    Potenciamos la eficiencia de su back-office contable y financiero. Garantizamos el estricto cumplimiento ante el SRI, IESS y el Ministerio del Trabajo, optimizando sus recursos corporativos con tecnología de punta.
                </p>

                <div className="mt-10 md:mt-12 flex">
                    <Button texto='AGENDAR ASESORÍA' estilosPersonalizados='cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300'/>
                    
                </div>
            </div>
            <div className='hidden md:flex gap-5 backdrop-blur-md bg-white/10  border border-white/20 shadow-2xl absolute w-90 p-6 items-center rounded-xl bottom-16 right-20 z-10 reveal-element delay-300'>
                <h2 className='text-orange-500 text-[2.8rem] font-extrabold leading-none'>
                    35%
                </h2>
                <div>
                    <p className="text-[0.75rem] font-bold text-white uppercase tracking-wider">IMPACTO DIRECTO</p>
                    <p className="font-light text-[0.95rem] text-white leading-tight mt-1">Reducción media de costos estructurales</p>
                </div>
            </div>
        </ScrollReveal>
    )
}