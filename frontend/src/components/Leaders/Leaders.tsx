import React from 'react'
import { LeaderCard } from './LeaderCard'

interface LeaderProps {
    name: string,
    cargo: string,
    email?: string,
    telf?: string,
    urlImg: string,
    link: string
}

const leadersProp: LeaderProps[] = [
    {
        name: 'Milton Montecé Q.',
        cargo: "Presidente y Socio de Impuestos",
        urlImg: 'images/MILTON.png',
        telf: '+593 972-638-4937',
        email: 'mmontece@mhorizon.com.ec',
        link: 'https://ec.linkedin.com/in/milton-montec%C3%A9-94283029'
    },
    {
        name: 'Violeta Rodriguez',
        cargo: "Supervisora de Impuestos",
        urlImg: 'images/VIOLETA.png',
        telf: '+593 972-638-4937',
        email: 'vrodriguez@mhorizon.com.ec',
        link: 'https://ec.linkedin.com/in/violeta-rodriguez-35a658a1'
    },
]

export const Leaders = () => {
    return (
        <div className="flex gap-16 items-center px-20 mt-24 max-w-[1200px] mx-auto">
            <div className="relative w-[60%]">
                <img
                    src="images/Recurso24.png"
                    alt=""
                    className="w-full h-full object-cover rounded-md shadow-xl"
                />

                <div className=" flex flex-col absolute -bottom-12 left-12 bg-white w-[350px] p-4 
      border-l-4 border-orange-500 rounded shadow-xl">

                    <h3 className="font-bold text-[1rem]">
                        PERSPECTIVA GLOBAL
                    </h3>

                    <p className="text-[0.85rem] font-light mt-1">
                        Combinamos visión internacional con un profundo dominio normativo
                        local para potenciar su competitividad
                    </p>
                    <a href="" className="text-orange-500 text-sm font-medium mt-2 self-end">
                        Conocer más →
                    </a>
                </div>

            </div>
            <div className="w-[35%]">
                <h2 className="font-bold text-[1.8rem] leading-tight">
                    AUTORIDAD <br />
                    <span className="relative">
                        ESTRATÉGICA
                        <span className="absolute left-0 -bottom-1 w-12 h-[2px] bg-orange-500"></span>
                    </span>
                </h2>

                <p className="font-light mt-6 text-[1rem] leading-relaxed text-gray-700 ">
                    En MHORIZON traducimos la complejidad del entorno empresarial en
                    estrategias claras. Nuestro equipo multidisciplinario combina dos
                    décadas de excelencia técnica en auditoría, leyes y finanzas.
                </p>

                <div className="flex flex-col gap-4 mt-8">
                    {leadersProp.map((leader) => (
                        <LeaderCard key={leader.name} {...leader} />
                    ))}
                </div>
            </div>
        </div>
    )
}
