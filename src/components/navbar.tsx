"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { Menu, Wifi, Server, HardDrive, Network, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"

export default function Navbar() {
  const navbarRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const navbar = navbarRef.current
    const logo = logoRef.current
    const links = linksRef.current

    if (navbar && logo && links) {
      // Initial state - elements are invisible
      gsap.set([navbar, logo, links], { opacity: 0, y: -20 })

      // Animation timeline
      const tl = gsap.timeline()

      // Delay the navbar animation to start after the main transition
      tl.to(navbar, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: 2.5, // Add delay to wait for the main transition
      })
        .to(
          logo,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4",
        )
        .to(
          links,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.4",
        )
    }
  }, [])

  const navLinks = [
    { name: "Home", href: "/", icon: <Wifi className="h-4 w-4 mr-2" /> },
    {
      name: "Network Solutions",
      href: "/services/network",
      icon: <Network className="h-4 w-4 mr-2" />,
    },
    {
      name: "Server Installation",
      href: "/services/server",
      icon: <Server className="h-4 w-4 mr-2" />,
    },
    {
      name: "Hardware Setup",
      href: "/services/hardware",
      icon: <HardDrive className="h-4 w-4 mr-2" />,
    },
    {
      name: "Projects",
      href: "/projects",
      icon: <HardDrive className="h-4 w-4 mr-2" />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Phone className="h-4 w-4 mr-2" />,
    },
  ]

  return (
    <header
      ref={navbarRef}
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <div ref={logoRef} className="flex items-center gap-2">
          <Network className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">TechConnect</span>
          <span className="text-sm text-muted-foreground">ICT Solutions</span>
        </div>

        {/* Desktop Navigation */}
        <div ref={linksRef} className="hidden md:flex md:items-center md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center text-sm font-medium transition-colors hover:text-primary"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
          <Button>Get a Quote</Button>
        </div>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 py-6">
              {navLinks.map((link) => (
                <SheetClose asChild key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center text-sm font-medium transition-colors hover:text-primary"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button className="mt-4">Get a Quote</Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
