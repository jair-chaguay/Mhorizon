import { Button } from './Button'
import { useState } from 'react'
import { ContactModal } from './ContactModal'

import { ScrollReveal } from './ScrollReveal'

interface palabra {
    blanco: string,
    naranja: string,
    styles?: string
}

export const Frase = ({ blanco, naranja, styles = '' }: palabra) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <ScrollReveal>
            <div className="py-10 px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl mx-auto text-center reveal-element">
                <h2 className={`${styles} text-white font-bold mt-12 md:mt-20 leading-tight md:leading-normal`}>
                    {blanco} <br />
                    <span className='text-orange-500 tracking-[0.12em]'> {naranja}</span>
                </h2>
                <p className="text-gray-300 font-light text-[1.1rem] sm:text-[1.2rem] mt-6 max-w-3xl mx-auto leading-relaxed">
                    Programe una sesión estratégica confidencial con nuestros socios directores y descubra el impacto real de una asesoría corporativa, contable y legal verdaderamente experta.
                </p>
                <div className='mt-10'>
                    <button className='inline-block bg-orange-500 text-white font-bold tracking-wider uppercase px-10 py-5 rounded-md hover:bg-white hover:text-orange-600 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer'>
                        AGENDAR SESIÓN ESTRATÉGICA
                    </button>
                </div>
                <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    <span>Guayaquil, Ecuador: Carchi 601 y Quisquis, Edificio Quil 1, Piso 12</span>
                </div>
                <hr className="border-t border-white/50 mx-8 md:mx-20 lg:mx-40 mt-10 md:mt-12" />

            </div>
        </ScrollReveal>
    )
}