"use client";

import { signOut, useSession } from "next-auth/react"
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getUserId } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";

function DropdownMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 mt-1 w-48 shadow-xl rounded-lg py-2 z-60">
      {children}
    </div>
  )
}

function NavLink({ href, onClick, children }: { href: string, onClick: () => void, children: React.ReactNode }) {
  return (
    <Link href={`/profile/${href}`} className="block px-4 py-2 hover:bg-slate-100 text-base" onClick={onClick}>
      {children}
    </Link>
  )
}

function LogoutNavLink({ children, onClick }: { children: React.ReactNode, onClick: () => void }) {
  return (
    <a className="block px-4 py-2 hover:bg-slate-100 hover:cursor-pointer text-base" onClick={onClick}>
      {children}
    </a>
  )
}

export default function UserBar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDown = () => { setIsOpen((prev) => !prev); }
  const closeDropdown = () => { setIsOpen(false); }

  return (
    <>
      {session ? (
        <div className="relative">
          <div className="relative" ref={dropdownRef}>
            <button onClick={toggleDown} className="flex items-center space-x-2 hover:text-black transition-colors duration-300 ease-in-out group">
              <Image
                src={session?.user?.image as string}
                alt="Profile"
                className="rounded-full mr-5"
                width={40}
                height={40}
              />
            </button>
            {isOpen && (
              <DropdownMenu>
                <NavLink href={getUserId(session?.user?.email as string)} onClick={closeDropdown}>내 블로그</NavLink>
                <NavLink href="/setting" onClick={closeDropdown}>설정</NavLink>
                <LogoutNavLink onClick={() => signOut()}>로그아웃</LogoutNavLink>
              </DropdownMenu>
            )}
          </div>
        </div>
      ) : (
        <li className="buttons px-4 space-x-2">
          <Link href="/login" className={buttonVariants({ variant: "outline" })}>Login</Link >
          <Link href="/register" className={buttonVariants({ variant: "outline" })}>Register</Link>
        </li>
      )}
    </>
  )
}