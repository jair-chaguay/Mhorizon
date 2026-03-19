import { Nav } from "./Nav"


export const Header = () => {
  return (
    <header className="flex justify-between items-center bg-[#1F2124] px-10 py-4">
      <a className="w-40" href="/">
        <img src="images/MHORIZONBOCETO.png" alt="logo" />
      </a>
      <Nav />
    </header>
  )
}
