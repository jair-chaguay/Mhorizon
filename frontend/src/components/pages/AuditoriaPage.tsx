import { Header, Footer, Impulsa, HeroAuditoria, IntegAudit } from '../../components'

export const AuditoriaPage = () => {
    return (
        <main>
            <Header />
            <HeroAuditoria />
            <section>
                <IntegAudit/>
            </section>
            <section className='bg-blue-200'>
                <Impulsa />
                <Footer />
            </section>
        </main>

    )
}
