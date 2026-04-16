import { Header, Footer, HeroAuditoria, IntegAudit, MetodologiaAud, Frase} from '../../components'

export const AuditoriaPage = () => {
    return (
        <main>
            <Header />
            <HeroAuditoria />
                <IntegAudit/>
                <MetodologiaAud/>

            <section className='bg-blue-200'>
                <Frase styles=' font-extrabold text-[1.5rem] sm:text-[1.8rem] md:text-[2rem] lg:text-[2.3rem] mt-16 sm:mt-20'  blanco='IMPULSA TU EMPRESA CON' naranja='ASESORÍA EXPERTA'/>
                <Footer />
            </section>
        </main>

    )
}
