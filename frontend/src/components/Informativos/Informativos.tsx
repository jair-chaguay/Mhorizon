import { InformativoCard } from "./InformativoCard"

interface InformativoProps {
    imgUrl: string,
    title: string,
    numero: string,
    fecha: string
}

const informativo: InformativoProps[] = [
    {
        imgUrl: "images/1.png",
        title: "NUEVOS PORCENTAJES DE RETENCIÓN".toUpperCase(),
        numero: "NO. NAC-DGERCG26-00000009".toUpperCase(),
        fecha: "07 NOV, 20205".toUpperCase()
    },
    {
        imgUrl: "images/1.png",
        title: "NUEVOS PORCENTAJES DE RETENCIÓN".toUpperCase(),
        numero: "NO. NAC-DGERCG26-00000009".toUpperCase(),
        fecha: "07 NOV, 20205".toUpperCase()
    },
    {
        imgUrl: "images/1.png",
        title: "NUEVOS PORCENTAJES DE RETENCIÓN".toUpperCase(),
        numero: "NO. NAC-DGERCG26-00000009".toUpperCase(),
        fecha: "07 NOV, 20205".toUpperCase()
    }
]

export const Informativos = () => {
    return (
        <div className='pt-18 pb-22 mt-25 bg-gray-800 mx-auto'>
            <h2 className='text-[1.625rem] text-blue-200 font-bold text-center underline 
        decoration-3 decoration-orange-500 underline-offset-8'>
                BOLETÍN INFORMATIVO
            </h2>
            <div className="grid grid-cols-3 gap-20 mx-20 mt-24">
                {
                    informativo.map((informativo: InformativoProps) => (
                        <InformativoCard key={informativo.title} {...informativo} />
                    ))
                }
            </div>
        </div>
    )
}
