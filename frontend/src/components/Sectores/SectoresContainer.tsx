import { Estrategia } from './Estrategia'
import { Logistica } from './Logistica'
import { Mercado } from './Mercado'

export const SectoresContainer = () => {
  return (
    <div className='px-20 py-20 bg-gray-800'>
        <div className='flex gap-10'>
            <Logistica/>
            <Estrategia/>
        </div>
        <div className='mt-15'>
            <Mercado/>
        </div>
    </div>
  )
  
}
