import { Button } from "./Button"

interface SolucionesProp {
  urlImg: string
  title: string
  paragraph: string
  reverse?: boolean
}

export const SolucionesCard = ({
  urlImg,
  title,
  paragraph,
  reverse = false,
}: SolucionesProp) => {
  return (
    <div className={`flex items-center gap-4 ${reverse ? "flex-row-reverse" : "flex-row"}`}>
      <div className="w-1/2 h-[300px] overflow-hidden">
        <img
          className="w-full h-full object-cover object-center "
          src={urlImg}
          alt={title}
        />
      </div>

      <div className="w-1/2 px-6 flex flex-col gap-3">
        <h2 className="font-bold text-blue-200 text-[1.25rem]">{title}</h2>
        <p className="text-[1rem] text-gray-700 font-light pr-10">{paragraph}</p>
        <Button
          text="Conocer más ➔"
          styles="bg-orange-500 text-[1rem] text-white w-[180px]"
        />
      </div>
    </div>
  )
}