import { Button } from './Button'
import { useState } from 'react'
import { ContactModal } from './ContactModal'

interface palabra {
    blanco: string,
    naranja: string,
    styles?: string
}

export const Frase = ({ blanco, naranja, styles = '' }: palabra) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className='pb-10'>
            <div className='flex flex-col gap-4 text-center px-6 md:px-0'>
                <h2 className={`${styles} text-white font-bold mt-12 md:mt-20 leading-tight md:leading-normal`}>
                    {blanco}
                    <span className='text-orange-500 tracking-widest block sm:inline mt-1 sm:mt-0'> {naranja}</span>
                </h2>
                <p className='text-white/90 font-light max-w-150 text-[0.95rem] md:text-[0.93rem] mx-auto leading-relaxed'>
                    Agenda una reunión con nuestros especialistas y lleva tu negocio al siguiente nivel de cumplimiento y rentabilidad.
                </p>
                <div className='flex justify-center mt-4 md:my-3 w-full sm:w-auto mx-auto'>
                    <Button text='AGENDAR UNA CITA'
                        styles='text-white bg-orange-500 font-medium w-full sm:w-[220px] py-3 md:py-2 rounded-sm'
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
                <p className='text-white/80 font-extralight text-[0.85rem] md:text-[0.90rem] mt-2 md:mt-0 px-4 md:px-0'>
                    Guayaquil: Carchi 601 y Quisquis Edificio Quil 1 Piso 12
                </p>
            </div>
            <hr className="border-t border-white/50 mx-8 md:mx-20 lg:mx-40 mt-10 md:mt-12" />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </div>
    )
}