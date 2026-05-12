import { Header, Footer, Frase, HeroNosotros, ValoresContainer, Trayectoria, Team, Sede } from '../../components'
import { Confianza } from '../Nosotros/Confianza'

export const NosotrosPage = () => {
    return (
        <main className='m-auto '>
            <Header />
            <HeroNosotros />
            <Confianza />

            <ValoresContainer />
            <Trayectoria />
            <Team />
            <Sede />

            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}
