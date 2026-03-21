import React from 'react'
import { Icons } from './Icons'

export const Footer = () => {
    return (
        <div className='flex flex-col items-center gap-5 text-center pb-10'>
            
            <div>
                
                <img className='w-[200px]' src="images/MHORIZONBOCETO.png" alt="" />
            </div>
            <ul className='flex gap-2 mt-4'>
                <li className='text-white border-r border-r-white pr-4'><a href="">INICIO</a></li>
                <li className='text-white border-r border-r-white pr-4'><a href="">CONSULTORÍA</a></li>
                <li className='text-white border-r border-r-white pr-4'><a href="">OUTSOURCING</a></li>
                <li className='text-white pr-4 '><a href="">AUDITORÍA</a></li>
            </ul>
            <ul className='flex gap-5 my-4'>
                <li><a href=""><img className='size-8' src="images/fb.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="images/ig.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="images/in.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="images/tk.png" alt="" /></a></li>
            </ul>
            <p className='text-white'>© 2026 MHORIZON. TODOS LOS DERECHOS RESERVADOS | POLÍTICAS DE PRIVACIDAD</p>
        </div>
    )
}
