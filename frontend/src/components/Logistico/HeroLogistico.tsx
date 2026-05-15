import { Button } from '../Button';
import { ScrollReveal } from '../ScrollReveal';

export const HeroLogistico = () => {
    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-138.5 bg-[url('/images/Recurso08.avif')] bg-cover bg-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-blue-200 via-blue-200/80 to-transparent"></div>

            <div className="relative z-10 w-full md:w-[75%] lg:w-[65%] pt-0 reveal-element">
                <div className="max-w-3xl">
                    <p className="inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-2 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                        MERCADO GLOBAL
                    </p>

                    <h1 className="text-white drop-shadow-lg text-[2.6rem] sm:text-[3rem] md:text-[4rem] font-bold w-full tracking-tight leading-[1.05]">
                        LOGÍSTICO & PORTUARIO
                    </h1>

                    <p className="text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left font-light max-w-2xl">
                        Blindamos las operaciones de agencias de carga, operadores portuarios, navieras y empresas de transporte en Ecuador mediante estrategias fiscales aduaneras y auditoría de costos rigurosa.
                    </p>


                    <div className="mt-10 md:mt-12 flex">
                        <Button texto='AGENDAR ASESORÍA' estilosPersonalizados='cursor-pointer bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300'/>
                    </div>

                </div>
            </div>

        </ScrollReveal>
    )
}