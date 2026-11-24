import { Header } from "../Hero/Header"
import { HeroMembresia, Banner, Respaldo, ExperienciaS, Alcance, PerfilIdeal, PreguntasFre, Invitacion, Footer, Frase, Clients } from '..'
import { Institucional } from "../Membresia/Institucional"
import { Planes } from "../Membresia/Planes"
import { Casos } from "../Membresia/Casos"
import { Comparativa } from "../Membresia/Comparativa"
import { StickyCTA } from "../Membresia/StickyCTA"
// Orden de venta: promesa → confianza → problema → identificación → cómo funciona
// → comparación → precio → alcance → quién responde → objeciones → cierre.
export const MembresiaPage = () => {
    return (
        <main className="m-auto">
            <Header />
            <HeroMembresia />
            <Banner />
            <Clients />
            <Respaldo />
            <Casos />
            <PerfilIdeal />
            <ExperienciaS />
            <Comparativa />
            <Planes />
            <Alcance />
            <Institucional />
            <PreguntasFre />
            <Invitacion />
            <section className='bg-blue-200'>
                <Frase blanco='ELEVE EL ESTÁNDAR DE SU' naranja='GESTIÓN CORPORATIVA' styles='font-extrabold text-[2.2rem] sm:text-[2.8rem] md:text-[3rem] leading-[1.1] mb-6 uppercase' />
                <Footer />
            </section>
            <StickyCTA />
        </main>
    )
}
