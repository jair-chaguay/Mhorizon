interface consultoriaProp{
    num: string,
    title: string,
    content: string
}

export const ConsultoríaCard = ({num, title, content}: consultoriaProp) => {
  return (
    <div className="flex gap-4 text-white items-center">
        <div className="bg-orange-500 p-4 flex flex-col justify-center rounded-sm h-15 w-15 items-center">
            <h4 className="text-[1.4rem] font-bold px-3">{num}</h4>
        </div>
        <div className="w-[70%]">
            <p className="font-medium">{title}</p>
            <p className="font-light">{content}</p>
        </div>
    </div>
  )
}
