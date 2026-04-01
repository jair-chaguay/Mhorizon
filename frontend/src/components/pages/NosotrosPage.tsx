import { Header, Footer, Frase, HeroNosotros, ValoresContainer, Trayectoria, Team, Sede } from '../../components'
import { Confianza } from '../Nosotros/Confianza'

export const NosotrosPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroNosotros />
            <Confianza />

            <ValoresContainer />
            <Trayectoria />
            <Team />
            <Sede />
            


            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR CORPORATIVO' naranja='DE SU ORGANIZACIÓN.'
                styles='font-bold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight uppercase' />
                <Footer />
            </section>
        </main>
    )
}
