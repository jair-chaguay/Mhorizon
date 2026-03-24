interface ClientProps{
    urlImg: string,
    name: string
}


export const ClientCard = ({urlImg, name}: ClientProps) => {
  return (
    <div className="h-[110px] flex items-center justify-center rounded-xl bg-white p-4 cursor-pointer">
        <img className="max-h-full max-w-full object-contain" src={urlImg} alt={name} />
    </div>
  )
}
