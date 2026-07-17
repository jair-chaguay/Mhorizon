import { ScrollReveal } from '../ScrollReveal'

export const Banner = () => {
    return (
        <ScrollReveal className="py-6 bg-orange-500 border-b border-gray-100 relative z-20">
            <div className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gray-100/50">
                    <div className="px-6 reveal-element text-center sm:text-left">
                        <strong className="block text-white font-extrabold text-[1.2rem] font-jakarta">Más de 26 años</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light">de experiencia comprobada.</span>
                    </div>
                    <div className="px-6 pt-6 sm:pt-0 reveal-element delay-100 text-center sm:text-left">
                        <strong className="block text-white font-extrabold text-[1.2rem] font-jakarta">Trayectoria Internacional</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light">Experiencia en Deloitte y Moore.</span>
                    </div>
                    <div className="px-6 pt-6 sm:pt-0 reveal-element delay-200 text-center sm:text-left">
                        <strong className="block text-white font-extrabold text-[1.2rem] font-jakarta">Visión Institucional</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light">Cargos directivos en el SRI.</span>
                    </div>
                    <div className="px-6 pt-6 sm:pt-0 reveal-element delay-300 text-center sm:text-left">
                        <strong className="block text-white font-extrabold text-[1.2rem] font-jakarta">Cobertura Nacional</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light">Atención remota a todo Ecuador.</span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    )
}
