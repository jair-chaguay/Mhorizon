import { ScrollReveal } from '../ScrollReveal'
import { FaseAuditoria } from './FaseAuditoria'


export const MetodologiaAud = () => {
    return (
        <section className='bg-white py-24 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/5'>
            <ScrollReveal className='max-w-350 mx-auto'>

                <div className='text-center mb-16 reveal-element'>
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        ESTRUCTURA DE TRABAJO
                    </span>
                    <h2 className="relative inline-block text-blue-200 font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[2.2rem] tracking-tight leading-tight pb-4 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-1 after:bg-orange-500 after:rounded-full">
                        METODOLOGÍA DE AUDITORÍA
                    </h2>

                    <p className="mt-4 text-gray-600 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                        Nuestra metodología considera planificación, evaluación de riesgos, ejecución de procedimientos, comunicación de hallazgos y emisión de informes.
                    </p>
                </div>
                <FaseAuditoria />



            </ScrollReveal>
        </section>
    )
}