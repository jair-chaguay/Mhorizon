import { Header, Footer, Frase, HeroNosotros, ValoresContainer, Trayectoria, Team, Sede } from '../../components'

export const NosotrosPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroNosotros />

            <ValoresContainer />
            <Trayectoria />
            <Team />
            <Sede />
            


            <section className='bg-blue-200'>
                <Frase blanco='' naranja='' />
                <Footer />
            </section>
        </main>
    )
}
