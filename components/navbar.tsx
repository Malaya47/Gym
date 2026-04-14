"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm transition-colors ${
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
          <div className="hidden md:flex items-center gap-6">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4">
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
                className={`block text-sm ${
                  isActive(link.href) ? "text-red-500" : "text-white/80"
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
