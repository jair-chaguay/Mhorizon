import { Header, Footer, Frase, HeroSuministro, Methodology, Estructura } from '../../components'

export const SuministroPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroSuministro />
            <Methodology />
            <Estructura />
            
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
