interface faseProps {
    num: string,
    fase: string,
    title: string,
    content: string
}

export const FaseCard = ({ num, fase, title, content }: faseProps) => {
    return (
        <div className="relative flex bg-orange-500 text-white rounded-md overflow-hidden">
            <div className="absolute -left-10 -bottom-7  opacity-40">
                <span className="text-[120px] font-bold leading-none">
                    {num}
                </span>
            </div>
            <div className="ml-35 py-10 px-8">
                <p className="text-[0.95rem] font-light tracking-wide">{fase}</p>
                <h3 className="text-[1.1rem] font-bold">{title}</h3>
                <p className="mt-2 font-light text-sm max-w-md">{content}</p>
            </div>
        </div>
    )
}
