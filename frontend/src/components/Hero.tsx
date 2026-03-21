import { Button } from "./Button"

export const Hero = () => {
  return (
    <section className="relative h-[500px] bg-[url('/images/bgImage.jpeg')] bg-cover bg-center">

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

      <div className="relative h-full flex flex-col items-center 
      text-white  max-w-5xl px-10 md:pr-97 text-left leading-relaxed text-[1.75rem] pt-20 gap-4">
        <h2 className="font-bold " >
          DECISIONES FINANCIERAS Y LEGALES QUE IMPULSAN EL CRECIMIENTO DE SU EMPRESA.
        </h2>
        <p className="text-[1.313rem]">
          Deje la complejidad informativa en manos de expertos. Diseñamos estrategias tributarias, legales y financieras para mitigar riesgos y proteger su patrimonio corporativo en Ecuador.
        </p>
        <div className="flex gap-7 justify-between mr-23 items-center">
          <a href="#calculadora">
            <Button styles="bg-orange-500 text-[1rem] font-semibold px-3 shadow-xl/30" text="CALCULAR MI PROYECCIÓN" />
          </a>

          <Button styles="bg-orange-500 text-[1rem] font-semibold w-[230px] shadow-xl/30" text="CONTÁCTANOS" />
        </div>
      </div>

    </section>
  )
}