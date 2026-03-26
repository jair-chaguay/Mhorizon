interface palabra{
    blanco: string,
    naranja: string,
    styles?: string
}

import { Button } from './Button'

export const Frase = ({blanco, naranja, styles=''}: palabra) => {
    return (
        <div className=' pb-10'>
            <div className='flex flex-col gap-4 text-center'>
                <h2 className={`${styles} text-white font-bold mt-20`}>
                    {blanco}
                    <span className='text-orange-500 tracking-widest block'> {naranja}</span>
                </h2>
                <p className='text-white/88 font-light max-w-[600px] text-[0.93rem] mx-auto'>
                    Agenda una reunión con nuestros especialistas y lleva tu negocio al siguiente nivel de cumplimiento y rentabilidad.
                </p>
                <div className='flex justify-center my-3'>
                    <Button text='AGENDAR UNA CITA'
                        styles='text-white bg-orange-500 font-medium w-[220px] rounded-sm ' />
                </div>
                <p className='text-white/80 font-extralight text-[0.90rem]'>
                Guayaquil: Carchi 601 y Quisquis Edificio Quil 1 Piso 12
                </p>
            </div>
            <hr className= "border-t border-white/50 mx-40 mt-10" />
        </div>
    )
}
