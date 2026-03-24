interface CalculadoraProps {
    image: string,
    title: string,
    subtitle: string
}

export const CalculadoraProps = ({image, title, subtitle}: CalculadoraProps) => {
    return (
        <div className="flex items-center gap-2">
            <img className="size-7" src={image} alt={title} />
            <div className="text-white">
                <h3>{title}</h3>
                <p className="font-light">{subtitle}</p>
            </div>
        </div>
    )
}
