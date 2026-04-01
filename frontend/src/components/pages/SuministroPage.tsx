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
                    naranja='CADENA DE SUMINISTRO.'
                    styles='font-extrabold text-[2rem] sm:text-[2.5rem] md:text-[2.8rem] leading-tight uppercase'
                />
                <Footer />
            </section>
        </main>
    )
}
