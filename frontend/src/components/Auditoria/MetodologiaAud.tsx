import { ScrollReveal } from '../ScrollReveal'
import { FaseAuditoria } from './FaseAuditoria'


export const MetodologiaAud = () => {
    return (
        <section className='bg-blue-200 py-24 px-5 sm:px-8 md:px-12 overflow-hidden border-b border-white/5'>
            <ScrollReveal className='max-w-350 mx-auto'>

                <div className='text-center mb-16 reveal-element'>
                    <span className="text-orange-500 font-medium tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        ESTRUCTURA DE TRABAJO
                    </span>
                    <h2 className="text-white font-bold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        METODOLOGÍA DE AUDITORÍA
                    </h2>

                    <p className="mt-4 text-gray-300 font-light text-[1.05rem] leading-relaxed max-w-3xl mx-auto">
                        Nuestro enfoque estructurado garantiza que cada dimensión financiera sea examinada bajo una perspectiva de extremo rigor y eficiencia digital moderna.
                    </p>
                </div>
                <FaseAuditoria />



            </ScrollReveal>
        </section>
    )
}