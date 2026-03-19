import { Nav } from "./Nav"


export const Header = () => {
  return (
    <header className="flex justify-between md:justify-around lg:justify-around items-center bg-blue-200 p-6">
        <a className="cursor-pointer w-38"
         href="/"><img src="images/MHORIZONBOCETO.png" alt="logo" /></a>
        <Nav/>
    </header>
  )
}
