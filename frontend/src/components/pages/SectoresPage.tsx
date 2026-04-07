import { Header, Footer, HeroSectores, SectoresContainer } from '../../components'
import { Frase } from '../Frase'

export const SectoresPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroSectores />

            <SectoresContainer />

            <section className='bg-blue-200'>
                <Frase 
                blanco='Eleve el estándar de su ' 
                naranja='gestión corporativa.'
                styles='text-[2rem] uppercase sm:text-[2.5rem] md:text-[2.3rem] font-extrabold leading-tight uppercase'
                />
                <Footer />
            </section>
        </main>
    )
}
