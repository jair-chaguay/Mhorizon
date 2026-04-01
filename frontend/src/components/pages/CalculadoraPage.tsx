import { Header, Footer, Frase, HeroCalculadora, FormCalculadora, CardCalculadora } from '../../components'
import { ScrollReveal } from '../ScrollReveal'

export const CalculadoraPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroCalculadora />

            <section className='py-20 md:py-28 bg-gray-50 overflow-hidden'>
                <ScrollReveal className="max-w-350 mx-auto px-5 sm:px-8 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                        <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 border border-gray-100 overflow-hidden reveal-element">
                            <FormCalculadora />

                        </div>

                        <CardCalculadora />
                    </div>

                </ScrollReveal>
            </section>

            <section className='bg-blue-200 '>
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
