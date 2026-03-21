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
        <div className='mt-23 mx-auto max-w-[1080px]'>
            <h1 className='text-center font-bold text-[1.625rem] text-blue-200
            underline underline-offset-10 decoration-3 decoration-orange-500'>
                NUESTROS LÍDERES</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center mt-23">
                {leadersProp.map((leader: LeaderProps, index) => (
                    <div
                        key={leader.name}
                        className="shadow-2xl"
                    >
                        <LeaderCard {...leader} />
                    </div>
                ))}
            </div>

            <hr className="mt-25 border-t border-gray-300 mx-auto " />


        </div>
    )
}
