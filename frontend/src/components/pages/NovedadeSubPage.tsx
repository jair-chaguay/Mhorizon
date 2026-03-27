import { Header, Footer, HeroSubNov, AnalisisBoletin, Descarga, Frase, InfoRelaci } from '../../components'

export const NovedadeSubPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroSubNov />

            <div className='bg-gray-200 pb-20 pt-14'>
                <Descarga />

                <AnalisisBoletin />
            </div>
            <InfoRelaci />
            <section className='bg-blue-200'>
                <Frase blanco='¿Necesitas soporte con esta' 
                naranja='implementación?' styles='text-3xl'/>
                <Footer />
            </section>
        </main>
    )
}
