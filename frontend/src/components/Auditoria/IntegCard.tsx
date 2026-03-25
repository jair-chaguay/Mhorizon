interface inteProps{
    image: string,
    title: string,
    content: string
}

export const IntegCard = ({image, title, content}: inteProps) => {
  return (
    <div className="bg-white shadow-xl p-8 flex gap-2 items-center rounded-md border border-gray-500/20">
        <div className="bg-orange-500 w-21 h-15 p-3 flex flex-col items-center justify-center   ">
            <img src={image} alt={title} />
        </div>
        <div className="ml-3">
            <p className="text-blue-200 font-bold text-[1.2rem]">{title}</p>
            <p className="font-light text-blue-200/80">{content}</p>
        </div>
    </div>
  )
}
