// IntegCard.tsx
interface inteProps {
    image: string,
    title: string,
    content: string
}

export const IntegCard = ({ image, title, content }: inteProps) => {
    return (
        <div className="bg-white shadow-xl p-6 md:p-8 flex flex-col sm:flex-row gap-4 sm:gap-2 items-start sm:items-center rounded-md border border-gray-500/20">
            
            <div className="bg-orange-500 w-[64px] h-[64px] md:w-[84px] md:h-[60px] p-3 flex flex-col items-center justify-center shrink-0 rounded-sm">
                <img className="w-full h-full object-contain" src={image} alt={title} />
            </div>
            
            {/* Textos */}
            <div className="ml-0 sm:ml-3 w-full">
                <p className="text-blue-200 md:text-blue-200 font-bold text-[1.1rem] md:text-[1.2rem] leading-tight">
                    {title}
                </p>
                <p className="font-light text-gray-600 md:text-blue-200/80 mt-2 sm:mt-1 text-[0.95rem] md:text-base">
                    {content}
                </p>
            </div>
        </div>
    )
}