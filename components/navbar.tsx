"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/membership", label: "Membership" },
    { href: "/shop", label: "Shop" },
    { href: "/events", label: "Events" },
    { href: "#", label: "Gallery" },
    { href: "/blog", label: "Blog" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleNav = (href: string) => {
    if (href !== "#") router.push(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Nav Links */}
          <div className="hidden md:flex items-stretch gap-6 self-stretch">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`h-full flex items-center text-sm transition-colors cursor-pointer select-none px-2 ${
                  isActive(link.href)
                    ? "text-red-500 font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <img src="/gym-logo.png" alt="Gym Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Right Nav Links */}
          <div className="hidden md:flex items-stretch gap-6 self-stretch">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => handleNav(link.href)}
                className={`h-full flex items-center text-sm transition-colors cursor-pointer select-none px-2 ${
                  isActive(link.href)
                    ? "text-red-500 font-medium"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button className="self-center bg-red-600 hover:bg-red-700 text-white text-sm px-4">
              Member Login
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-white/10">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`block text-sm cursor-pointer py-2 px-1 ${
                  isActive(link.href)
                    ? "text-red-500"
                    : "text-white/80 hover:text-white"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-sm mt-4">
              Member Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
