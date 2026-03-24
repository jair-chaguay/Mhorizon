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

      <div className="flex justify-center items-center py-2">
        <img className="w-34 h-34 object-contain" src={urlImg} alt={title} />
      </div>

      <h2 className="flex items-center justify-center h-18 text-center 
      text-[1.25rem] bg-blue-200 text-white px-6">
        {title}
      </h2>

      <div className="flex flex-col flex-1 p-6">

        <p className="text-[1.1rem] px-9 text-blue-200 font-light text-center flex-1">
          {paragraph}
        </p>

        <Link className="mt-9 text-orange-500 text-sm font-medium self-end cursor-pointer" to={ruta}>
          Conocer más →
        </Link>
        

      </div>
    </motion.div>
  );
};