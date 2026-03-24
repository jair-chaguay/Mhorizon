import { Button } from "../Button"
import { CalculadoraProps } from "./CalculadoraProps"

interface CalculadoraProps {
  image: string,
  title: string,
  subtitle: string
}

const calculadora: CalculadoraProps[] = [
  {
    image: 'images/Recurso10.png',
    title: 'Análisis Predictivo',
    subtitle: 'Proyecte sus obligaciones fiscales antes del cierre del ejercicio.',
  },
  {
    image: 'images/Recurso10.png',
    title: 'Cumplimiento Legal',
    subtitle: 'Basado en las normativas vigentes del SRI para el período actual.',
  }
]

export const Calculadora = () => {
  return (
    <div className=' flex items-center'>
      <div className="py-22 px-30 w-190">
        <h2 className='text-white font-bold text-[1.563rem]'>
          CALCULADORA DE <span className='text-orange-500'>IMPUESTO A LA RENTA</span>
        </h2>
        <p className='text-white font-light text-[1.2rem]'>
          ¿Conoce el impacto real de su Impuesto a la Renta de este año?
        </p>

        {
          calculadora.map((props: CalculadoraProps) => (
            <CalculadoraProps key={props.title} {...props} />
          ))
        }

      </div>


      <div>
        <div className='bg-white mt-10  py-8 px-15 rounded-lg w-[550px]'>
          <h3 className="font-bold text-center text-[1.24rem]">
            ANTICIPE SU FUTURO FINANCIERO
          </h3>
          <p className="mt-2 font-light">
            Utilice nuestro simulador interactivo para obtener claridad sobre sus
            deducciones y proyecciones de pago. 
          </p>
          <p className="font-light">
            Tome el control de sus finanzas corporativas hoy mismo.
          </p>

          <Button text="ACCEDER AL SIMULADOR" styles="w-full bg-orange-500 text-white mt-5 rounded-sm text-[1rem]"/>
          <p className="text-center italic font-light text-[0.7rem]">Herramienta de uso gratuito para clientes y aliados estratégicos</p>
        </div>
      </div>
    </div>
  )
}
