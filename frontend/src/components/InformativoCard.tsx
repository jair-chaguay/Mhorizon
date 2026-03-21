interface InformativoProps{
    imgUrl : string,
    title: string,
    numero: string
}

export const InformativoCard = ({imgUrl, title, numero}: InformativoProps) => {
  return (
    <section>
        <div>
            <img className="border-1 shadow-xl" src={imgUrl} alt={title} />
            <p className="font-extrabold text-[1rem] text-blue-200 text-center tracking-widest mt-5">{title}</p>
            <p className="text-[1rem] text-blue-200 text-center ">{numero}</p>
        </div>
    </section>
  )
}
