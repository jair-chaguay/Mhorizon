import { Header, Footer, Impulsa, HeroOutsourcing, ExceOpera, ConsultoriaEje } from '../../components'

export const OutsourcingPage = () => {
    return (
        <main>
            <Header />
            <HeroOutsourcing />

            <section>
                <ExceOpera />
            </section>
            <section>
                <ConsultoriaEje />
            </section>
            <section className='bg-blue-200'>
                <Impulsa />
                <Footer />
            </section>
        </main>
    )
}
