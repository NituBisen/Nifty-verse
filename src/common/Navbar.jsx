import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import logo from "../assets/logo/logo.png";

const NAV_LINKS = [
  {
    label: "Marketplace",
    path: "/marketplace",
  },
  {
    label: "Rankings",
    path: "/rankings",
  },
  {
    label: "Connect a wallet",
    path: "/wallet",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full bg-[#2B2B2B]">
      {/* Main Navbar Container */}
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* ================= LOGO ================= */}
          <a
            href="/"
            className="flex items-center shrink-0"
          >
            <img
              src={logo}
              alt="NFT Marketplace"
              className="object-contain h-15 w-auto md:h-15"
            />
          </a>

          {/* ================= DESKTOP NAV ================= */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {/* {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="whitespace-nowrap text-sm font-semibold text-white transition-colors duration-200 hover:text-[#A259FF] lg:text-base"
              >
                {link}
              </a>
            ))} */}

            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={closeMenu}
                className="text-sm font-semibold text-white transition-colors duration-200 hover:text-[#A259FF]"
              >
                {link.label}
              </a>
            ))}

          </div>

          {/* ================= SIGN UP BUTTON ================= */}
          <button
            type="button"
            className="hidden items-center gap-2 px-6 py-4 text-sm font-semibold text-white text-base bg-[#A259FF] rounded-[20px] transition-opacity duration-200 shrink-0 hover:opacity-90 md:inline-flex lg:px-7"
          >
            <User className="h-5 w-5" />
            <span>Sign Up</span>
          </button>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-white rounded-lg transition-colors -mr-2 hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`
          overflow-hidden
          transition-all
          duration-300
          ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0"
          }
        `}
      >
        <div
          className="flex flex-col gap-5 px-4 pb-6 pt-5 border-t border-white/10 sm:px-6"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={link.path}
              onClick={closeMenu}
              className="text-sm font-semibold text-white transition-colors duration-200 hover:text-[#A259FF]"
            >
              {link.label}
            </a>
          ))}

          {/* Mobile Sign Up */}
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 w-full text-sm font-semibold text-white bg-[#A259FF] rounded-[20px] transition-opacity duration-200 hover:opacity-90"
          >
            <User className="h-5 w-5" />
            <span>Sign Up</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;