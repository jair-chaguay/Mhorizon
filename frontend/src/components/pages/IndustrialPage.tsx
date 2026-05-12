import { Header, Footer, Frase, HeroIndustrial, Operamos } from '..'
import { ClientesIndustrial } from '../Finanzas/ClientesIndustrial'
import { EstrctFinan } from '../Finanzas/EstrctFinan'

export const IndustrialPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroIndustrial />
            <Operamos />
            <EstrctFinan />
            <ClientesIndustrial />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}