import { Header, Footer, Impulsa, HeroNovedades, Filters, Boletin } from '../../components'
import { Navegacion } from '../Novedades/Navegacion'

export const NovedadesPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroNovedades />
            <Filters />
            <Boletin />
            <Navegacion />
            <section className='bg-blue-200'>
                <Impulsa />
                <Footer />
            </section>
        </main>
    )
}
