import { Footer } from "../Footer/Footer"
import { Frase } from "../Frase"
import { Header } from "../Hero/Header"
import { ArquitecturaLog, EstrctNegocios, HeroLogistico } from "../../components"

export const LogisticoPage = () => {
    return (
        <main className='m-auto overflow-hidden'>
            <Header />
            <HeroLogistico />
            <ArquitecturaLog />
            <EstrctNegocios />


            <section className='bg-blue-200 '>
                <Frase
                    blanco='Blinde y potencie su '
                    naranja='operación logística'
                    styles='font-extrabold uppercase text-[2rem] md:text-[2.6rem] leading-tight mb-4 tracking-wide'
                />
                <Footer />
            </section>
        </main>
    )
}
