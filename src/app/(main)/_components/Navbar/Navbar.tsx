"use client"

import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { useContext, useState } from "react"
import { countContext } from "@/app/countProvider"
import { cn } from "@/lib/utils"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Menu, X } from "lucide-react" // 👈 icons for mobile toggle

const menuItems: { path: string; content: string; authintacted: boolean }[] = [
  { path: "/", content: "Home", authintacted: false },
  { path: "/Categories", content: "Categories", authintacted: false },
  { path: "/Brands", content: "Brands", authintacted: false },
  { path: "/allorders", content: "Orders", authintacted: true },
  { path: "/WishList", content: "Wishlist", authintacted: true },
]

export function Navbar() {
  const context = useContext(countContext)
  if (!context) throw new Error("countContext must be used inside CountProvider")
  const { count } = context

  const x = useSession()
  const [isOpen, setIsOpen] = useState(false)

  function logout() {
    signOut({ callbackUrl: "/" })
  }

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
       
        <Link href="/">
          <Image
            src={"/freshcart-logo.svg"}
            alt="logo"
            width={250}
            height={250}
            priority
          />
        </Link>

      
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex w-full justify-between ">
          <NavigationMenu viewport={false} className="flex">
            <NavigationMenuList className="mx-4">
              {menuItems.map((ele) => (
                <NavigationMenuItem key={ele.path}>
                  {ele.authintacted && x.status === "authenticated" ? (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={ele.path}>{ele.content}</Link>
                    </NavigationMenuLink>
                  ) : !ele.authintacted ? (
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={ele.path}>{ele.content}</Link>
                    </NavigationMenuLink>
                  ) : null}
                </NavigationMenuItem>
              ))}

              {x.status === "authenticated" && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={cn(navigationMenuTriggerStyle(), "relative")}
                  >
                    <Link href="/cart">
                      Cart{" "}
                      <span className="absolute w-5 h-5 bg-main rounded-full -top-1.5 -right-0.5 flex justify-center items-center p-1 text-white">
                        {count}
                      </span>
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right side (auth links) */}
          <div className="flex items-center">
            {x.status === "authenticated" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <span className=" xl:mx-4 cursor-pointer">
                      {x.data?.user.name}
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/UpdateProfile">Update Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Subscription</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <span
                  onClick={logout}
                  className="text-gray-500 cursor-pointer mx-4"
                >
                  SignOut
                </span>
              </>
            ) : (
              <>
                <Link className="mx-4" href="/Register">
                  Register
                </Link>
                <Link href="/Login">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 py-4 bg-white shadow-lg">
          {menuItems.map((ele) => {
            if (ele.authintacted && x.status !== "authenticated") return null
            return (
              <Link
                key={ele.path}
                href={ele.path}
                className="hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {ele.content}
              </Link>
            )
          })}

          {x.status === "authenticated" ? (
            <>
              <Link href="/cart" onClick={() => setIsOpen(false)}>
                Cart ({count})
              </Link>
              <button onClick={logout} className="text-left text-gray-500">
                SignOut
              </button>
            </>
          ) : (
            <>
              <Link href="/Register" onClick={() => setIsOpen(false)}>
                Register
              </Link>
              <Link href="/Login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
