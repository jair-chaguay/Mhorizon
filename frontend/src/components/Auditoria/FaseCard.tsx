// FaseCard.tsx
interface faseProps {
    num: string,
    fase: string,
    title: string,
    content: string
}

export const FaseCard = ({ num, fase, title, content }: faseProps) => {
    return (
        <div className="relative flex bg-orange-500 text-white rounded-md overflow-hidden shadow-lg">
            
            <div className="absolute -left-4 -bottom-4 md:-left-10 md:-bottom-7 opacity-40">
                <span className="text-[90px] md:text-[120px] font-bold leading-none">
                    {num}
                </span>
            </div>
            
            <div className="ml-16 md:ml-35 py-8 md:py-10 px-6 md:px-8 relative z-10">
                <p className="text-[0.9rem] md:text-[0.95rem] font-light tracking-wide">{fase}</p>
                <h3 className="text-[1.1rem] font-bold mt-1 md:mt-0">{title}</h3>
                <p className="mt-2 font-light text-[0.85rem] md:text-sm w-full md:max-w-md leading-relaxed">{content}</p>
            </div>
            
        </div>
    )
}