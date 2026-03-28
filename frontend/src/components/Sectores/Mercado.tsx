import { Link } from 'react-router-dom'

export const Mercado = () => {
    return (
        <div className='flex flex-col md:flex-row gap-0 md:gap-2 bg-white shadow-xl border border-gray-400/10 items-stretch rounded-md overflow-hidden'>       
            <div className='p-6 md:p-10 w-full md:w-[60%] flex flex-col justify-center order-2 md:order-1'>       
                <div className='flex flex-col gap-2 md:px-4 lg:px-12'>
                    <p className='text-orange-500 tracking-wider text-[0.9rem] md:text-base'>
                        MERCADO & CONSUMIDOR
                    </p>
                    <h4 className='text-blue-200 font-bold text-[1.2rem] md:text-[1.4rem] leading-tight'>
                        Consumo, Tecnología y Bienestar
                    </h4>
                    <p className='text-blue-200 font-light mt-1 md:mt-2 text-[0.95rem] md:text-base'>
                        Respaldamos la agilidad y el crecimiento de marcas globales y organizaciones 
                        orientadas al consumidor final, asegurando estructuras sólidas y escalables. 
                    </p>             
                    <div className='grid grid-cols-2 lg:grid-cols-3 mt-2 gap-2 md:gap-3 text-blue-200 font-light text-[0.75rem] md:text-[0.8rem]'>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Consumo Masivo (FMCG)</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Tecnología y Electrónica</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Farmacéutica y Salud</p>
                        <p className='bg-gray-800 rounded-sm text-center py-1.5 px-1'>Hospitalidad y ONGs</p>
                    </div>              
                    <Link className='text-orange-500 text-[1.1rem] md:text-[1.2rem] mt-2 md:mt-4 font-medium' to={"/sectores/mercado-financiero"}>
                        Conocer más →
                    </Link>
                </div>
            </div>            
            <div className='w-full md:w-[40%] h-50 md:h-auto order-1 md:order-2 shrink-0'>
                <img className='w-full h-full object-cover' src="/images/Recurso55.png" alt="Mercado" />
            </div>
            
        </div>
    )
}