import { Header, Footer, HeroSubNov, AnalisisBoletin, Descarga, Frase, InfoRelaci } from '../../components'

export const NovedadeSubPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroSubNov />

            <Descarga />

            <AnalisisBoletin />
            <InfoRelaci />
            <section className='bg-blue-200'>
                <Frase blanco='¿Necesitas soporte con esta'
                    naranja='implementación?' styles='font-extrabold text-[2rem] sm:text-[2.6rem] md:text-[3rem] leading-[1.1] mb-6 tracking-tight' />
                <Footer />
            </section>
        </main>
    )
}
