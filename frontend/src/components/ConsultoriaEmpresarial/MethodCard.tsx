interface methodPorp{
    fase: string,
    title: string,
    content: string
}

export const MethodCard = ({fase, title, content}: methodPorp) => {
  return (
    <div className="flex flex-col gap-4 bg-white p-5 shadow-xl rounded-lg border-b-8 border-b-orange-500">
        <p className="text-orange-500">{fase}</p>
        <h4 className="font-medium tracking-wider text-[1.04rem]">{title}</h4>
        <p className="text-blue-200/70 mb-2">{content}</p>
    </div>
  )
}
