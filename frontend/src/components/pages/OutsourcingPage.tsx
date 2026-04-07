import { Header, Footer, HeroOutsourcing, ExceOpera, ConsultoriaEje, Frase } from '../../components'

export const OutsourcingPage = () => {
    return (
        <main>
            <Header />
            <HeroOutsourcing />
            <ExceOpera />
            <ConsultoriaEje />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-bold text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-tight'/>
                <Footer />
            </section>
        </main>
    )
}
