import { Button } from '../Button'
import { useState } from 'react'
import { ContactModal } from "../ContactModal"

export const HeroOutsourcing = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="px-6 md:px-12 lg:px-20 flex gap-6 items-center relative h-[600px] md:h-[500px] bg-[url('/images/Recurso45.png')] bg-cover bg-center opacity-95">

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/50 to-transparent md:from-black/70 md:via-black/40">
            </div>

            <div className="relative z-10 w-full">
                <p className='bg-white/60 text-blue-200 w-[150px] md:w-[160px] rounded-sm text-center p-1 text-[0.65rem] md:text-[0.75rem] font-semibold tracking-wider'>
                    EFICIENCIA ESTRATÉGICA
                </p>
                <h1 className='text-white text-shadow-lg text-[2.2rem] md:text-[2.9rem] font-bold mt-4 md:mt-5 w-full md:w-[400px] tracking-wide leading-tight md:leading-normal'>
                    Outsourcing <br className="md:hidden" />
                    <span className='text-orange-500'>
                        <span className='underline underline-offset-8 md:underline-offset-12 decoration-4 decoration-orange-500'>Estr</span>atégico
                    </span>
                </h1>
                <p className='text-white mt-4 md:mt-6 font-light text-shadow-md text-[1rem] md:text-[1.2rem] w-full md:w-[70%] lg:w-[45%] text-left md:text-justify'>
                    Transformamos su back-office a través de procesos inteligentes, soporte especializado y
                    tecnología de punta para impulsar y agilizar su negocio.
                </p>

                <div className="mt-8 md:mt-4">
                    <Button
                        text="Agenda una asesoría"
                        styles="bg-orange-500 text-white font-medium w-full md:w-[220px] py-3 md:py-2 rounded-sm"
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>
            <div className='absolute bg-white/80 md:bg-white/40 bottom-0 left-0 right-0 md:left-auto md:right-10 lg:right-32 px-6 md:px-10 py-4 md:py-6 text-center z-10 flex flex-col md:block items-center justify-center'>
                <h2 className='text-orange-500 md:text-orange-500 text-shadow-lg text-[2rem] md:text-[2.5rem] font-extrabold leading-none'>
                    35%
                </h2>
                <p className='font-medium md:font-extralight italic text-blue-900 md:text-blue-200/80 text-[1.1rem] md:text-[1.5rem] mt-1 md:mb-2'>
                    Reducción media de costos
                </p>
            </div>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        </section>
    )
}