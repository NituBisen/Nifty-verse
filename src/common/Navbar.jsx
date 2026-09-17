import React, { useState } from "react";
import { User, Menu, X, Store } from "lucide-react";

/**
 * Navbar.jsx
 * Reusable Navbar component for the NFT Marketplace frontend.
 * Background: #2B2B2B (matches Home page background)
 * Accent: #A259FF
 *
 * Usage:
 *   <Navbar logoSrc="/path-to-your-logo.png" />
 *
 * If `logoSrc` is not provided, a fallback storefront icon (lucide-react)
 * is rendered instead so the component still works out of the box.
 */

const NAV_LINKS = ["Marketplace", "Rankings", "Connect a wallet"];

const Navbar = ({ logoSrc }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="w-full bg-[#2B2B2B]">
      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="NFT Marketplace logo"
                className="object-contain h-6 w-6 md:h-7 w-7"
              />
            ) : (
              <Store className="h-6 w-6 text-[#A259FF] md:h-7 w-7" />
            )}
            <span className="text-white font-bold text-base whitespace-nowrap md:text-lg">
              NFT Marketplace
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex lg:gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white font-semibold text-sm transition-colors hover:text-[#A259FF] lg:text-base"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Desktop Sign Up Button */}
          <button
            type="button"
            className="hidden items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm bg-[#A259FF] rounded-full transition-opacity hover:opacity-90 shrink-0 md:inline-flex lg:text-base"
          >
            <User className="h-4 w-4 lg:h-5 w-5" />
            Sign Up
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-white -mr-2 md:hidden"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-5 px-4 pb-6 pt-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              onClick={closeMenu}
              className="text-white font-semibold text-sm"
            >
              {link}
            </a>
          ))}
          <button
            type="button"
            onClick={closeMenu}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 w-full text-white font-semibold text-sm bg-[#A259FF] rounded-full transition-opacity hover:opacity-90"
          >
            <User className="h-4 w-4" />
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;