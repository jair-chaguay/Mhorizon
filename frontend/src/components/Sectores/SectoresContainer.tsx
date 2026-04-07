import { ScrollReveal } from '../ScrollReveal'
import { Industrial } from './Industrial'
import { Financiero } from './Financiero'
import { Empresariales } from './Empresariales'
import { LogisticoPortuario } from './LogisticoPortuario'

export const SectoresContainer = () => {
    return (
        <section className='py-24 bg-gray-50 border-b border-gray-200 overflow-hidden'>
            <ScrollReveal className='max-w-350 mx-auto px-5 sm:px-8 md:px-12'>
                <div className="text-center mb-20 reveal-element">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-[0.85rem] uppercase mb-2 block">
                        Nuestra Experiencia
                    </span>
                    <h2 className="text-blue-200 font-extrabold text-[2rem] sm:text-[2.5rem] tracking-tight leading-tight">
                        SOLUCIONES POR SECTOR
                    </h2>
                </div>



                <div className='flex flex-col gap-16 md:gap-24'>
                    <Financiero />
                    <Industrial />
                    <Empresariales />
                    <LogisticoPortuario />
                </div>

            </ScrollReveal>
        </section>
    )
}