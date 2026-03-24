interface InformativoProps {
  imgUrl: string,
  title: string,
  numero: string
  fecha: string
}

export const InformativoCard = ({ imgUrl, title, numero, fecha }: InformativoProps) => {
  return (
    <section>
      <div className="bg-blue-200 shadow-2xl rounded-xl text-center flex flex-col">
        <img className="rounded-t-lg" src={imgUrl} alt={title} />
        <div className="flex justify-around text-[0.7rem] text-white font-light text-center px-4 mt-4">
          <p>{fecha}</p>
          <p>{numero}</p>
        </div>
        <p className="font-extrabold text-[1.2rem] text-white/90 text-center tracking-widest mt-4 px-4">{title}</p>
        <a href="" className="self-end text-orange-500 pr-5 pb-4 mt-1">Leer más →</a>
      </div>
    </section>
  )
}
