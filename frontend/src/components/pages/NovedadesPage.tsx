import { Header, Footer, HeroNovedades, Filters, Boletin, Frase } from '../../components'

export const NovedadesPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroNovedades />
            <Filters />
            <Boletin />
            <section className='bg-blue-200'>
                <Frase blanco='Impulsa tu empresa con' naranja='asesoría experta' styles='font-bold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight'/>
                <Footer />
            </section>
        </main>
    )
}
