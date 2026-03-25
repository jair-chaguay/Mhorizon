import { Header, Footer, Impulsa, HeroAuditoria, IntegAudit, MetodologiaAud, FaseAuditoria, Analisis } from '../../components'

export const AuditoriaPage = () => {
    return (
        <main>
            <Header />
            <HeroAuditoria />
            <section>
                <IntegAudit/>
            </section>
            <section>
                <MetodologiaAud/>
            </section>
            <section>
                <FaseAuditoria/>
            </section>
            <section>
                <Analisis/>
            </section>
            <section className='bg-blue-200'>
                <Impulsa />
                <Footer />
            </section>
        </main>

    )
}
