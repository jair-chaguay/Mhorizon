import { Estrategia } from './Estrategia'
import { Logistica } from './Logistica'
import { Mercado } from './Mercado'

export const SectoresContainer = () => {
    return (
        <div className='px-6 md:px-12 lg:px-20 py-12 md:py-20 bg-gray-800'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-10'>
                <div className='w-full lg:w-[60%]'>
                    <Logistica />
                </div>
                <div className='w-full lg:w-[40%]'>
                    <Estrategia />
                </div>
            </div>
            <div className='mt-10 lg:mt-16'>
                <Mercado />
            </div>
        </div>
    )
}