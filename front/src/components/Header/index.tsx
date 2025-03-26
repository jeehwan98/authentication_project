import NavBar from "./nav-bar"
import UserBar from "./user-bar"

function HeaderContainer({ children }: { children: React.ReactNode }) {
  return <header className="h-16 bg-background/60 sticky top-0 border-b px-8 backdrop-blur flex items-center z-50" > {children} </header>
}

function NavContainer({ children }: { children: React.ReactNode }) {
  return <ul className="hidden md:flex w-full justify-end items-center space-x-3" > {children} </ul>
}

export default function Header() {
  return (
    <HeaderContainer>
      <NavContainer>
        <NavBar />
        <UserBar />
      </NavContainer>
    </HeaderContainer>
  )
}