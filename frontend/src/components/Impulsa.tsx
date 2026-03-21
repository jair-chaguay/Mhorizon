import React from 'react'
import { Button } from './Button'

export const Impulsa = () => {
    return (
        <div className=' mt-23 pb-10'>
            <div className='flex flex-col gap-4 text-center'>
                <h2 className='text-white font-bold text-[1.625rem] mt-10'>
                    IMPULSA TU EMPRESA CON
                    <span className='text-orange-500'> ASESORÍA EXPERTA.</span>
                </h2>
                <p className='text-white'>
                    Agenda una reunión con nuestros especialistas y lleva tu negocio al siguiente nivel.
                </p>
                <div className='flex justify-center my-3'>
                    <Button text='Agendar una cita.'
                        styles='text-white bg-orange-500 font-bold w-[200px] ' />
                </div>
                <p className='text-white'>Guayaquil: Carchi 601 y Quisquis Edificio Quil 1 Piso 12</p>
            </div>
            <hr className= "border-t border-white mx-40 mt-10" />
        </div>
    )
}
