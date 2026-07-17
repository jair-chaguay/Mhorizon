
import { ScrollReveal } from './ScrollReveal'
import { useState } from 'react'
import { ContactModal } from './ContactModal'

interface Palabra {
    blanco: string,
    naranja: string,
    styles?: string
}

export const Frase = ({ blanco, naranja, styles = '' }: Palabra) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>

            <ScrollReveal>
                <div className="py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl mx-auto text-center reveal-element">
                    <h2 className={`${styles} w-full text-white font-bold mt-12 md:mt-20 leading-tight md:leading-normal`}>
                        {blanco} <br />
                        <span className='text-orange-500 '> {naranja}</span>
                    </h2>
                    <p className="text-gray-300 font-light text-[1.1rem] sm:text-[1.2rem] mt-6 max-w-3xl mx-auto leading-relaxed">
                        Programe una conversación confidencial con nuestro equipo y determine el alcance adecuado: membresía, consultoría permanente o proyecto especializado.
                    </p>
                    <div className='mt-10'>
                        <button onClick={() => setIsModalOpen(true)} className='inline-block bg-orange-500 text-white font-bold tracking-wider uppercase px-10 py-5 rounded-md hover:bg-white hover:text-orange-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'>
                            AGENDAR SESIÓN ESTRATÉGICA
                        </button>
                    </div>
                    <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
                        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span>Guayaquil, Ecuador: Carchi 601 y Quisquis, Edificio Quil 1, Piso 12</span>
                    </div>
                    <hr className="border-t border-white/20 mx-0 md:mx-0 lg:mx-0 mt-10 md:mt-12" />

                </div>
            </ScrollReveal>

            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}