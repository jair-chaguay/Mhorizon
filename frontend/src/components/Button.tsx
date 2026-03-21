interface Props{
    text: string
    styles?: string
}

export const Button = ({text, styles}: Props) => {
  return (
    
    <button className={`${styles} h-11  cursor-pointer`}>
        {text}
    </button>
  )
}
