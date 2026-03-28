import { Header, Footer, Frase, HeroCalculadora, FormCalculadora, CardCalculadora } from '../../components'

export const CalculadoraPage = () => {
    return (
        <main className='m-auto'>
            <Header />
            <HeroCalculadora />

            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                    <div className="lg:col-span-2 bg-white rounded-xl shadow-2xl border border-slate-100 my-10
                        overflow-hidden">
                        <FormCalculadora />

                    </div>

                    <CardCalculadora/>
                </div>

            </div>

            <section className='bg-blue-200 '>
                <Frase
                    blanco='Lidere el mercado '
                    naranja='con seguridad'
                    styles='text-[1.8rem]'
                />
                <Footer />
            </section>
        </main>
    )
}
