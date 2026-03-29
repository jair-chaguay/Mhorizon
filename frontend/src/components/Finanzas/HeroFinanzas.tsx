import { Button } from '../Button'
import { useState } from 'react'
import { ContactModal } from "../ContactModal"

export const HeroFinanzas = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <section className="px-6 md:px-12 lg:px-20 flex gap-6 items-center relative bg-[url('/images/bgFinanzas.jpg')] bg-cover bg-center min-h-125 py-16 lg:py-0">
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/70 to-black/30 lg:bg-linear-to-r lg:from-black/90 lg:via-black/80 lg:to-transparent">
            </div>
            <div className="relative max-w-7xl mx-auto lg:mx-0 w-full z-10">
                <div className="max-w-3xl">
                    <span className="inline-block px-3 md:px-4 py-1 mb-4 md:mb-6 text-blue-200 tracking-wide text-[0.65rem] md:text-xs uppercase bg-gray-800/60 rounded-sm font-semibold">
                        Sector Estratégico
                    </span>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline font-bold text-white tracking-tighter leading-[1.1] mb-4 md:mb-5 block">
                        Finanzas &
                        <span className="text-orange-500 block mt-1 md:mt-0">Servicios Corporativos</span>
                    </h1>
                    <p className="text-[1.05rem] md:text-xl text-slate-300 font-light leading-relaxed max-w-2xl text-balance">
                        Garantizamos la integridad, el cumplimiento normativo y la eficiencia operativa en instituciones donde la precisión es el núcleo absoluto del negocio.
                    </p>                  
                    <div className="mt-8 md:mt-6">
                        <Button text='AGENDAR CONSULTORIA'
                            styles='text-white font-bold bg-orange-500 w-full sm:w-[240px] py-3 md:py-2 rounded-sm' 
                                                    onClick={() => setIsModalOpen(true)}
/>
                    </div>
                    
                </div>
            </div>
                        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            
        </section>
    )
}