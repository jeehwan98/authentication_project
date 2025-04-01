import { ChildrenProps } from "@/interfaces"
import NavBar from "./nav-bar"
import UserBar from "./user-bar"
import { getServerSession } from "@/lib/auth/auth-server";
import { SessionProvider } from "@/lib/auth/session-provider";
function HeaderContainer({ children }: ChildrenProps) {
  return <header className="h-16 bg-background/60 sticky top-0 border-b px-8 backdrop-blur flex items-center z-50">{children}</header>
}

function NavContainer({ children }: ChildrenProps) {
  return <ul className="hidden md:flex w-full justify-end items-center space-x-3">{children}</ul>
}

export default async function Header() {
  const user = await getServerSession();
  return (
    <HeaderContainer>
      <NavContainer>
        <SessionProvider initialUser={user}>
          <NavBar />
          <UserBar />
        </SessionProvider>
        {/* <NavigationMenuDemo /> */}
      </NavContainer>
    </HeaderContainer>
  )
}