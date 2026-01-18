"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AppLogo from "../AppLogo";
import { Button } from "../ui/button";
import NavLink from "./NavLink";

function GeneralNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About us" },
    { href: "/contact-us", label: "Contact us" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-950 border-b border-blue-800">
      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-row justify-between items-center px-6 py-4 lg:px-10 lg:py-6">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <div className="flex gap-4 lg:gap-6 items-center font-semibold text-white">
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href="/about-us">About us</NavLink>
          <NavLink href="/contact-us">Contact us</NavLink>
          <NavLink href="/pricing">Pricing</NavLink>
          <Link href={"/login"}>
            <Button
              className="ml-6 lg:ml-10 border-blue-400 bg-transparent text-blue-300 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600"
              size={"lg"}
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Header */}
      <div className="md:hidden flex flex-row justify-between items-center px-4 py-4">
        <Link href={"/"}>
          <AppLogo />
        </Link>
        <button
          onClick={toggleMenu}
          className="text-white hover:text-blue-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 top-16 right-0 w-full bg-blue-950 border-l border-blue-800 transform transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1 p-6 pt-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
              <div className="py-4 px-4 text-white font-semibold text-lg hover:bg-blue-900 rounded-lg transition-colors">
                {link.label}
              </div>
            </Link>
          ))}
          <Link href={"/login"} onClick={() => setIsOpen(false)}>
            <Button
              className="w-full mt-4 border-blue-400 bg-transparent text-blue-300 font-semibold hover:bg-blue-600 hover:text-white hover:border-blue-600"
              size={"lg"}
              variant={"outline"}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}

export default GeneralNavBar;
