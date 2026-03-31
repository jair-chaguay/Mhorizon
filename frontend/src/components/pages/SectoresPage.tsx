import { Header, Footer, HeroSectores, SectoresContainer } from '../../components'
import { Frase } from '../Frase'

export const SectoresPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroSectores />

            <SectoresContainer />

            <section className='bg-blue-200 mt-21'>
                <Frase 
                blanco='TRANSFORME LOS DESAFÍOS DE SU INDUSTRIA EN' 
                naranja='VENTAJAS COMPETITIVAS'
                styles='text-[2rem] sm:text-[2.5rem] md:text-[2.3rem] font-bold leading-tight uppercase'
                />
                <Footer />
            </section>
        </main>
    )
}
