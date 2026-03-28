import { motion } from "framer-motion"
import { Button } from "../Button"

export const Hero = () => {
  return (
    <section className="relative lg:min-h-[520px] sm:min-h-[580px] md:h-[500px] bg-[url('/images/bgImage.png')] bg-cover bg-center">

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.3,
            },
          },
        }}
        className="
          relative h-full flex flex-col text-white max-w-6xl
          px-5 sm:px-8 md:px-18
          md:pr-97
          text-left leading-relaxed
          text-[1.35rem] sm:text-[1.55rem] md:text-[1.75rem]
          pt-16 sm:pt-20 md:pt-20
          gap-4
          justify-center
        "
      >
        <motion.h2
          variants={{
            hidden: { opacity: 0, x: -80 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="font-bold text-shadow-lg/30"
        >
          DECISIONES FINANCIERAS Y LEGALES QUE IMPULSAN EL CRECIMIENTO DE SU EMPRESA.
        </motion.h2>

        <motion.p
          variants={{
            hidden: { opacity: 0, x: -80 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="text-[1rem] sm:text-[1.1rem] md:text-[1.313rem] mb-2 font-light"
        >
          Deje la complejidad informativa en manos de expertos. Diseñamos estrategias tributarias, legales y financieras para mitigar riesgos y proteger su patrimonio corporativo en Ecuador.
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -80 },
            show: { opacity: 1, x: 0 },
          }}
          transition={{ duration: 0.8 }}
          className="flex gap-4 sm:gap-7 md:gap-7 items-center md:justify-between md:mr-23"
        >
          <a href="#calculadora" className="w-full sm:w-auto">
            <Button
              styles="bg-orange-500 text-[0.95rem] sm:text-[1rem] font-semibold px-3 sm:px-4 py-3 shadow-2xl rounded-sm w-full sm:w-auto"
              text="CALCULAR MI PROYECCIÓN"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};