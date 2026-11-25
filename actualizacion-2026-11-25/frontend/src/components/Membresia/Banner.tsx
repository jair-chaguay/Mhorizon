import { ScrollReveal } from '../ScrollReveal'

export const Banner = () => {
    return (
        <ScrollReveal className="py-6 bg-orange-500 border-b border-gray-100 relative z-20">
            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8 md:px-12 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-0 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
                    
                    <div className="px-4 py-4 sm:py-0 reveal-element text-center sm:text-center">
                        <strong className="block text-white font-extrabold text-[1rem] font-jakarta">+26 años de experiencia</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light texto-desc">En tributación corporativa.</span>
                    </div>
                    <div className="px-4 py-4 sm:py-0 reveal-element delay-100 text-center">
                        <strong className="block text-white font-extrabold text-[1rem] font-jakarta">Trayectoria internacional</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light texto-desc">Deloitte y Moore.</span>
                    </div>
                    <div className="px-4 py-4 sm:py-0 reveal-element delay-100 text-center">
                        <strong className="block text-white font-extrabold text-[1rem] font-jakarta">Visión de la Administración</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light texto-desc">Experiencia previa en el SRI.</span>
                    </div>
                    <div className="px-4 py-4 sm:py-0 reveal-element delay-100 text-center">
                        <strong className="block text-white font-extrabold text-[1rem] font-jakarta">Cobertura nacional</strong>
                        <span className="block text-white text-[0.95rem] mt-1 font-light texto-desc">100% remota, en todo el Ecuador.</span>
                    </div>
                </div>
            </div>
        </ScrollReveal>
    )
}
