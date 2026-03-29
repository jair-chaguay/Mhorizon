import { ContactModal } from '../ContactModal'
import { Button } from '../Button'
import { useState } from 'react'


export const Impulsa = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <section className="pb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 text-center items-center">
        <h2 className="text-white font-bold text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.2rem] mt-16 sm:mt-20 leading-snug max-w-4xl">
          IMPULSA TU EMPRESA CON
          <span className="text-orange-500 tracking-[0.12em]">
            {" "}ASESORÍA EXPERTA.
          </span>
        </h2>

        <p className="text-white/90 font-light text-[0.92rem] sm:text-[1rem] md:text-[1.05rem] max-w-[600px] leading-relaxed">
          Agenda una reunión con nuestros especialistas y lleva tu negocio al siguiente nivel de cumplimiento y rentabilidad.
        </p>

        <div className="flex justify-center my-4 w-full">
          <Button
            text="AGENDAR UNA CITA"
            styles="text-white bg-orange-500 font-medium w-full max-w-[260px] sm:max-w-[220px] rounded-sm py-3 hover:scale-105 transition-transform duration-300"
            onClick={() => setIsModalOpen(true)}
          />
        </div>

        <p className="text-white/80 font-extralight text-[0.85rem] sm:text-[0.90rem] md:text-[0.95rem] max-w-[700px] leading-relaxed px-2">
          Guayaquil: Carchi 601 y Quisquis Edificio Quil 1 Piso 12
        </p>
      </div>

      <hr className="border-t border-white/50 w-full max-w-6xl mx-auto mt-10" />
      <ContactModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)}/>
    </section>
  )
}