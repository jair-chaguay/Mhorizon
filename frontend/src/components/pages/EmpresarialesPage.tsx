import { Header, Footer, Frase, HeroEmpresariales, OperamosEmpresariales, ArquitecturaEst} from '..'

export const EmpresarialesPage = () => {
  return (
    <main className='m-auto'>
                <Header />
                <HeroEmpresariales />
                <OperamosEmpresariales />
                <ArquitecturaEst />
                
                <section className='bg-blue-200 '>
                    <Frase
                        blanco='Escale su empresa'
                        naranja='con respaldo experto'
                        styles='font-extrabold text-[2rem] sm:text-[2.8rem] md:text-[3.2rem] leading-[1.1] mb-6 tracking-tight'
                    />
                    <Footer />
                </section>
            </main>
  )
}
