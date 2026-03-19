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
        urlImg: 'images/milton.jpg',
        telf: '999999999',
        email: 'example@gmail.com',
        link: 'https://ec.linkedin.com/in/milton-montec%C3%A9-94283029'
    },
    {
        name: 'Carlos Velecela L.',
        cargo: "Presidente y Socio de Impuestos",
        urlImg: 'images/carlos.jpg',
        telf: '999999999',
        email: 'example@gmail.com',
        link: 'https://ec.linkedin.com/in/carlos-velecela-lalama-72568111a'
    },
    {
        name: 'Violeta Rodriguez',
        cargo: "Supervisora de Impuestos",
        urlImg: 'images/Violeta.jfif',
        telf: '999999999',
        email: 'example@gmail.com',
        link: 'https://ec.linkedin.com/in/violeta-rodriguez-35a658a1'
    },
]

export const Leaders = () => {
    return (
        <div className='mt-20 mx-auto max-w-[960px]'>
            <h1 className='text-center font-bold text-[1.875rem] text-cyan-800'>Nuestros Líderes</h1>
            <div className="grid grid-cols-2 gap-10 mt-10">
                {leadersProp.map((leader: LeaderProps, index) => (
                    <div
                        key={leader.name}
                        className={index === 2 ? "col-span-2 flex justify-center" : ""}
                    >
                        <LeaderCard {...leader} />
                    </div>
                ))}
            </div>
        </div>
    )
}
