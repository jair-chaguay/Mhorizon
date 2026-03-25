
export const Footer = () => {
    return (
        <div className='flex flex-col items-center gap-5 text-center pb-10'>
            <div>
                <img className='w-[200px]' src="/images/MHORIZONBOCETO.png" alt="" />
            </div>
            <ul className='flex gap-2 mt-4 justify-center-safe text-[0.93rem]'>
                <li className='text-white/70 border-r border-r-white/70 pr-4'><a href="">INICIO</a></li>
                <li className='text-white/70 border-r border-r-white/70 pr-4'><a href="">CONSULTORÍA</a></li>
                <li className='text-white/70 border-r border-r-white/70 pr-4'><a href="">OUTSOURCING</a></li>
                <li className='text-white/70 pr-4 '><a href="">AUDITORÍA</a></li>
            </ul>
            <ul className='flex gap-5 my-4'>
                <li><a href=""><img className='size-8' src="/images/fb.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="/images/ig.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="/images/in.png" alt="" /></a></li>
                <li><a href=""><img className='size-8' src="/images/tk.png" alt="" /></a></li>
            </ul>
            <hr className="border-t border-white/50 mx-40 mt-10" />

           <div className='flex justify-around w-full'>
             <p className='text-white/70 text-[0.80rem]'>© 2026 MHORIZON. TODOS LOS DERECHOS RESERVADOS | POLÍTICAS DE PRIVACIDAD</p>
             <p className='text-white/70 text-[0.80rem]'>TÉRMINOS DE USO | POLÍTICAS DE PRIVACIDAD</p>
           </div>
        </div>
    )
}
