// EstructuraCard.tsx
interface estructurasProp {
    numero: string,
    title: string,
    content: string
}

export const EstructuraCard = ({ numero, title, content }: estructurasProp) => {
    return (
        <li className="flex gap-4 md:gap-6 items-start md:items-center">
            
            <div className="w-12.5 h-12.5 md:w-15 md:h-15 shrink-0 bg-orange-500 flex items-center justify-center font-headline font-black text-white text-lg md:text-xl rounded mt-1 md:mt-0">
                {numero}
            </div>
            
            <div>
                <h4 className="text-[1.15rem] md:text-xl font-medium text-white mb-1 md:mb-2 leading-tight md:leading-normal">
                    {title}
                </h4>
                <p className="font-light text-white/90 text-[0.95rem] md:text-base leading-relaxed">
                    {content}
                </p>
            </div>
        </li>
    )
}