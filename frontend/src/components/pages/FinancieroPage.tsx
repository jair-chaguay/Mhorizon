import { Header, Footer, Frase, HeroFinanciero, Methodology, Estructura } from '..'

export const FinancieroPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroFinanciero />
            <Methodology />
            <Estructura />
            
            <section className='bg-blue-200 '>
                <Frase
                    blanco='Blinde y potencie su '
                    naranja='institución financiera.'
                    styles='font-extrabold text-[2rem] uppercase sm:text-[2.5rem] md:text-[2.8rem] leading-tight uppercase'
                />
                <Footer />
            </section>
        </main>
    )
}
