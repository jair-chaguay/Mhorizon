import React from 'react'
import { Button } from './Button'

export const Hero = () => {
    return (
        <section className="mx-auto bg-[linear-gradient(to_right,rgba(0,0,0,0.85),rgba(0,0,0,0.65)),url('/images/bgImage.jpeg')] bg-cover bg-center bg-no-repeat py-30">
            <div>
                <p className='mt-6  text-white text-center px-40'>
                    Somos una firma consultora con más de 20 años de experiencia en el mercado ecuatoriano, conformada por profesionales especializados en prácticas tributarias, legales y financieras que buscan contribuir al mejoramiento de las actividades empresariales, basado en sus conocimientos y experiencia local e internacional que le permite entregar a nuestros clientes un servicio de calidad, acorde a sus expectativas.
                </p>
            </div>
        </section>
    )
}
