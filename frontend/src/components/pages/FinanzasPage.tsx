import { Header, Footer, Frase, HeroFinanzas} from '../../components'

export const FinanzasPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroFinanzas />
            <section className='bg-blue-200 '>
                <Frase
                    blanco='POTENCIE SU '
                    naranja='CADENA DE SUMINISTRO'
                    styles='text-[1.8rem]'
                />
                <Footer />
            </section>
        </main>
    )
}