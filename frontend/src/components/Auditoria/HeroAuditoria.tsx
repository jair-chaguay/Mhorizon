import { Button } from "../Button"
import { ScrollReveal } from "../ScrollReveal"

export const HeroAuditoria = () => {

    return (
        <ScrollReveal as={"section"} className="relative flex items-center px-5 sm:px-8 md:px-20 w-full min-h-137.5 md:h-14 2.5 bg-[url('/images/Recurso52.avif')] bg-cover bg-center overflow-hidden">

            <div className="absolute inset-0 bg-linear-to-r from-blue-200/95 via-blue-200/70 to-transparent">
            </div>

            <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] pt-10 reveal-element">
                <p className='inline-block bg-white/10 text-orange-500 border border-orange-500/30 px-4 py-1 text-center rounded-sm text-[0.75rem] font-bold tracking-widest uppercase mb-4 backdrop-blur-sm'>
                    AUTORIDAD ESTRATÉGICA
                </p>

                <h1 className='text-white drop-shadow-lg text-[2.4rem] sm:text-[2.8rem] md:text-[3.5rem] font-bold w-full tracking-tight leading-[1.1]'>
                    AUDITORÍA FINANCIERA
                </h1>

                <p className='text-gray-200 mt-6 text-[1.05rem] sm:text-[1.15rem] md:text-[1.3rem] w-full leading-relaxed drop-shadow-md text-left'>
                    Integridad absoluta en cada registro contable. Analizamos su estructura financiera bajo una perspectiva de extremo rigor para garantizar solidez y cumplimiento global.
                </p>

                <div className="mt-10 md:mt-12 flex">
                    <Button texto="AGENDAR ASESORÍA" estilosPersonalizados="bg-orange-500 text-white font-bold tracking-wider uppercase w-full sm:w-70 py-4 rounded-md hover:bg-white hover:text-orange-600 shadow-xl transition-all duration-300"/>
                </div>
            </div>

            <div className='hidden md:flex gap-5 bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl absolute w-90 p-6 items-center rounded-xl bottom-16 right-20 z-10 reveal-element delay-300'>
                <h2 className='text-orange-500 text-[2.8rem] font-extrabold leading-none'>
                    99.8%
                </h2>
                <div>
                    <p className="text-[0.75rem] font-bold text-gray-300 uppercase tracking-wider">MÁXIMO RIGOR</p>
                    <p className="font-light text-[0.95rem] text-white leading-tight mt-1">Precisión probada de nuestros informes forenses.</p>
                </div>
            </div>

        </ScrollReveal>
    )
}