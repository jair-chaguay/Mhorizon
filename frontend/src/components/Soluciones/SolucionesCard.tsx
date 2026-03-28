import { motion } from "framer-motion"
import { Link } from "react-router-dom"

interface SolucionesProp {
  urlImg: string
  title: string
  paragraph: string
  ruta: string
}

export const SolucionesCard = ({
  urlImg,
  title,
  paragraph,
  ruta
}: SolucionesProp) => {
  return (
    <motion.div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col h-full">

      <div className="flex justify-center items-center py-4 md:py-2">
        <img className="w-28 h-28 sm:w-32 sm:h-32 md:w-34 md:h-34 object-contain" src={urlImg} alt={title} />
      </div>

      <h2
        className="flex items-center justify-center min-h-[72px] md:h-18 text-center 
        text-[1.05rem] sm:text-[1.15rem] md:text-[1.25rem] bg-blue-200 text-white px-4 md:px-6"
      >
        {title}
      </h2>

      <div className="flex flex-col flex-1 p-5 md:p-6">

        <p className="text-[1rem] sm:text-[1.05rem] md:text-[1.1rem] px-2 sm:px-4 md:px-9 text-blue-200 font-light text-center flex-1">
          {paragraph}
        </p>

        <Link
          className="mt-7 md:mt-9 text-orange-500 text-sm font-medium self-center md:self-end cursor-pointer"
          to={ruta}
        >
          Conocer más →
        </Link>
      </div>
    </motion.div>
  );
};