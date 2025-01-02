"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import navigation from "@/lib/data/navbar.json";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <>
      {navigation.map((navigation) => (
        <li key={navigation.name}>
          <Link
            href={navigation.path}
            className={`${buttonVariants({ variant: "link" })} 
              ${pathname === navigation.path ? 'underline' : ''} 
              hover:underline dark:hover:underline`}
          >
            {navigation.name}
          </Link>
        </li>
      ))}
    </>
  )
}