interface Props{
    text: string
    styles?: string
    onClick?: ()=>void;
}

export const Button = ({text, styles, onClick}: Props) => {
  return (
    
    <button className={`${styles} h-11  cursor-pointer`} onClick={onClick}>
        {text}
    </button>
  )
}
