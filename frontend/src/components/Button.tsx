interface Props{
    text: string
    styles?: string
}

export const Button = ({text, styles}: Props) => {
  return (
    <button className={`${styles} h-12 rounded-3xl hover:to-Teal-200 cursor-pointer`}>
        {text}
    </button>
  )
}
