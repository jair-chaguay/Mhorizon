import { Nav } from "./Nav"


export const Header = () => {
  return (
    <header className=" flex justify-between items-center bg-blue-200 px-10 py-4">
      <a className="w-51" href="/">
        <img src="/images/MHORIZONBOCETO.png" alt="logo" />
      </a>
      <Nav />
    </header>
  )
}
