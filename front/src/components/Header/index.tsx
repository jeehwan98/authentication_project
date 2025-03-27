import { ChildrenProps } from "@/interfaces"
import NavBar from "./nav-bar"
import UserBar, { NavigationMenuDemo } from "./user-bar"

function HeaderContainer({ children }: ChildrenProps) {
  return <header className="h-16 bg-background/60 sticky top-0 border-b px-8 backdrop-blur flex items-center z-50">{children}</header>
}

function NavContainer({ children }: ChildrenProps) {
  return <ul className="hidden md:flex w-full justify-end items-center space-x-3">{children}</ul>
}

export default function Header() {
  return (
    <HeaderContainer>
      <NavContainer>
        <NavBar />
        {/* <UserBar /> */}
        <NavigationMenuDemo />
      </NavContainer>
    </HeaderContainer>
  )
}