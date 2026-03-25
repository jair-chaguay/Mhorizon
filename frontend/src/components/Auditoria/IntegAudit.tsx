import { IntegCard } from "./IntegCard"

interface inteProps{
    image: string,
    title: string,
    content: string
}

const integridad : inteProps[] = [
    {
        image: "/images/Recurso50.png",
        title: "Protocolo de Transparencia",
        content: "Implementamos sistemas avanzados de verificación que van más allá de los métodos de muestreo tradicionales."
    },
    {
        image: "/images/Recurso51.png",
        title: "Protocolo de Transparencia",
        content: "Análisis predictivo diseñado para identificar debilidades estructurales antes de que se conviertan en pasivos financieros."
    }
]

export const IntegAudit = () => {
  return (
    <div className="py-20 bg-gray-800">
        <div className="px-5 border-l-4 border-l-orange-500 w-[40%] mx-20">
            <h1 className="text-blue-200 font-bold text-[1.8rem]">
                <span className="text-orange-500">Integridad</span> asboluta en cada registro contable.
            </h1>
        </div>
        <div className="mx-20 flex gap-20 items-center">
            <div className="grid grid-cols-1 gap-8 mt-10">
                {
                    integridad.map((props: inteProps)=>(
                        <IntegCard key={props.title} {...props}/>
                    ))
                }
            </div>
            <div>
                <img src="/images/Recurso53.png" alt="Recurso53" />
            </div>
        </div>
    </div>
  )
}
