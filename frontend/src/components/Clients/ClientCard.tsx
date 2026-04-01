interface ClientProps{
    urlImg: string,
    name: string
}


export const ClientCard = ({urlImg, name}: ClientProps) => {
  return (
    <div className="h-22.5 flex items-center justify-center p-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <img className="max-h-full max-w-full object-contain" src={urlImg} alt={name} />
    </div>
  )
}
