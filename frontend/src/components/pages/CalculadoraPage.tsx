import { useState } from 'react';
import { Header, Footer, Frase, HeroCalculadora, FormCalculadora, CardCalculadora } from '../../components'
import { ScrollReveal } from '../ScrollReveal'

export const CalculadoraPage = () => {
    const [resultados, setResultados] = useState({ 
        base: 0, 
        causado: 0, 
        rebaja: 0, 
        pagar: 0, 
        tasa: 0 
    });

    return (
        <main className='m-auto'>
            <Header />
            <HeroCalculadora />

            <section className='py-20 md:py-28 bg-gray-50'>
                <ScrollReveal className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start relative">
                        
                        <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-100 overflow-hidden reveal-element">
                            <FormCalculadora onResultadosUpdate={setResultados} />
                        </div>

                        <div className="lg:col-span-4 lg:sticky lg:top-30 z-20">
                            <CardCalculadora resultados={resultados} />
                        </div>
                        
                    </div>
                </ScrollReveal>
            </section>

            <section className='bg-blue-200'>
                <Frase
                    blanco='Lidere el mercado con'
                    naranja='planificación segura'
                    styles='font-extrabold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight'
                />
                <Footer />
            </section>
        </main>
    )
}