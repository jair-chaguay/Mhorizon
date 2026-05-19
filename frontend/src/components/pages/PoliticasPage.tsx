import { Header, Footer, Frase, PoliticasPrivacidad,  } from '../../components'

export const PoliticasPage = () => {
    return (
        <main>
            <Header />
            <PoliticasPrivacidad />

            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
        </main>
    )
}