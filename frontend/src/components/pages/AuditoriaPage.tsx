import { Header, Footer, HeroAuditoria, IntegAudit, MetodologiaAud, Frase, PortafolioAuditoria } from '../../components'

export const AuditoriaPage = () => {
    return (
        <main>
            <Header />
            <HeroAuditoria />
            <IntegAudit />
            <MetodologiaAud />
            <PortafolioAuditoria />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>

    )
}
