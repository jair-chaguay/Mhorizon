import { motion } from "framer-motion"
import { Button } from '../Button'

export const Perspectiva = () => {
    return (
        <div className='flex bg-blue-200 h-[610px] mt-25 '>
            <div className='w-[48%] relative'>
                <img className='w-full h-full object-cover border-r-sky-900 border-r-20' src="images/consultoria.jpg" alt="" />
                <div className='absolute inset-0 bg-linear-to-r from-black/60 to-transparent'></div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                className='w-[52%] px-14'>
                <div className='mt-10 border-b-2 border-b-orange-500 w-[65%] pb-3'>
                    <motion.h2 variants={{
                        hidden: { opacity: 0, x: 80 },
                        show: { opacity: 1, x: 0 }
                    }}
                        transition={{ duration: 0.8 }}
                        className='text-white font-bold text-[1.563rem]'>
                        PERSPECTIVA GLOBAL, CONOCIMIENTO LOCAL. LIDERAZGO ASEGURADO PARA SU EMPRESA.
                    </motion.h2>
                </div>
                <motion.p variants={{
                    hidden: { opacity: 0, x: 80 },
                    show: { opacity: 1, x: 0 }
                }}
                    transition={{ duration: 0.8 }}

                    className='mt-5 text-[1.15rem] text-white font-extralight w-[65%] leading-[28px]'>
                    En <span className='font-semibold'>MHORIZON</span> hemos traducido la complejidad del entorno empresarial y
                    normativo en estrategias claras durante más de dos décadas. Nuestro equipo
                    multidisciplinario de socios y directores combina una sólida experiencia técnica en
                    audiotría, leyes y finanzas con un profundo dominio del mercado. Entregamos un nivel
                    de servicio corportaivo que protege el patrimonio e impulsa el crecimiento seguro de
                    nuestros clientes en Ecuador.
                </motion.p>
                <Button texto='Conoce nuestra firma' estilosPersonalizados='bg-orange-500 text-white mt-5 w-[200px] h-4' />
            </motion.div>
        </div>
    )
}
