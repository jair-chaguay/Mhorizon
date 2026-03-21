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
    <div className="w-full">
      <div className={`flex items-center gap-3 ${reverse ? "flex-row-reverse" : "flex-row"}`}>
        <div className="w-[40%] h-[275px] flex flex-col items-center">
          <img
            className={`${reverse ? "mr-50" : "ml-50"} w-70 h-full`}
            src={urlImg}
            alt={title}
          />
        </div>

        <div className="w-[65%] px-10 ml-20 flex flex-col gap-4">
          <h2 className="font-bold text-blue-200 text-[1.28rem]">{title}</h2>
          <p className={`text-[1.13rem] text-blue-200 font-light pr-20 `}>{paragraph}</p>
          <Button
            text="Conocer más ➔"
            styles="bg-orange-500 text-[1rem] text-white w-[180px]"
          />
        </div>
      </div>

      <hr className="my-8 border-t border-gray-300 mx-30 " />
    </div>
  )
}