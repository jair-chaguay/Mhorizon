interface estructurasProp {
    numero: string,
    title: string,
    content: string
}



export const EstructuraCard = ({ numero, title, content }: estructurasProp) => {
    return (
        <li className="flex gap-6 items-center">
            <div className="w-15 h-15 flex-shrink-0 bg-orange-500 flex items-center justify-center 
            font-headline font-black text-white text-xl rounded">
                {numero}
            </div>
            <div>
                <h4 className="text-xl font-medium text-white mb-2">
                    {title}
                </h4>
                <p className=" font-light text-white">
                    {content}
                </p>
            </div>
        </li>
    )
}
