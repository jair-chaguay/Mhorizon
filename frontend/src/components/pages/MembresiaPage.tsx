import { Header } from "../Hero/Header"
import { HeroMembresia, Banner, Respaldo, Propuesta, ExperienciaS, Alcance, PerfilIdeal, PreguntasFre, Invitacion, Footer, Frase } from '..'
import { Institucional } from "../Membresia/Institucional"


export const MembresiaPage = () => {
    return (
        <main className="m-auto">
            <Header />
            <HeroMembresia />
            <Banner />
            <Respaldo />
            <Propuesta />
            <ExperienciaS />
            <Alcance />
            <PerfilIdeal />
            <Institucional />
            <PreguntasFre />
            <Invitacion />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>


        </main>
    )
}
