// ConsultoríaCard.tsx
interface consultoriaProp {
    num: string,
    title: string,
    content: string
}

export const ConsultoríaCard = ({ num, title, content }: consultoriaProp) => {
    return (
        <div className="flex gap-4 md:gap-5 text-white items-start md:items-center">
            
           
            <div className="bg-orange-500 flex flex-col justify-center rounded-sm size-15 md:h-16 md:w-16 items-center shrink-0">
                <h4 className="text-[1.3rem] md:text-[1.4rem] font-bold px-2">{num}</h4>
            </div>
            
            {/* Reemplacé w-[70%] por flex-1 para que tome todo el ancho restante sin desbordarse */}
            <div className="flex-1 lg:w-[80%]">
                <p className="font-medium text-[1.05rem] md:text-base leading-tight md:leading-normal mb-1 md:mb-0">{title}</p>
                <p className="font-light text-[0.95rem] md:text-base text-gray-200 md:text-white mt-1 md:mt-0">{content}</p>
            </div>
        </div>
    )
}