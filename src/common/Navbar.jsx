import React, { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo/logo.png";

const NAV_LINKS = [
  "Marketplace",
  "Rankings",
  "Connect a wallet",
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  // ==============================
  // MOBILE MENU
  // ==============================

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // ==============================
  // SIGN UP
  // ==============================

  const handleSignUp = () => {
    closeMenu();
    navigate("/create-account");
  };

  // ==============================
  // NAVIGATION
  // ==============================

  const handleNavClick = (link) => {
    closeMenu();

    if (link === "Marketplace") {
      navigate("/");
    }

    if (link === "Rankings") {
      navigate("/ranking");
    }

    if (link === "Connect a wallet") {
      navigate("/connect-wallet");
    }
  };

  return (
    <nav className="w-full bg-black">

      {/* =========================================
          MAIN NAVBAR
      ========================================= */}

      <div className="mx-auto px-4 max-w-7xl sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">

          {/* =========================================
              LOGO
          ========================================= */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center shrink-0"
          >
            <img
              src={logo}
              alt="NFT Marketplace"
              className="object-contain h-15 w-auto md:h-15"
            />
          </button>

          {/* =========================================
              DESKTOP NAVIGATION
          ========================================= */}

          <div className="hidden items-center gap-8 md:flex lg:gap-10">

            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className="whitespace-nowrap text-sm font-semibold text-white transition-colors duration-200 hover:text-[#A259FF] lg:text-base"
              >
                {link}
              </button>
            ))}

          </div>

          {/* =========================================
              DESKTOP SIGN UP BUTTON
          ========================================= */}

          <button
            type="button"
            onClick={handleSignUp}
            className="hidden items-center gap-2 px-6 py-4 text-base font-semibold text-white bg-[linear-gradient(90deg,#00E5FF_0%,#008CFF_10%,#5B2CFF_35%,#9B2CFF_95%,#FF00D4_100%)] rounded-[20px] transition-opacity duration-200 shrink-0 hover:opacity-90 md:inline-flex lg:px-7"
          >
            <User className="h-5 w-5" />

            <span>
              Sign Up
            </span>
          </button>

          {/* =========================================
              MOBILE MENU BUTTON
          ========================================= */}

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="p-2 text-white rounded-lg transition-colors duration-200 -mr-2 hover:bg-white/10 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>

        </div>
      </div>

      {/* =========================================
          MOBILE MENU
      ========================================= */}

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

          {/* =========================================
              MOBILE NAV LINKS
          ========================================= */}

          {NAV_LINKS.map((link) => (
            <button
              key={link}
              type="button"
              onClick={() => handleNavClick(link)}
              className="w-full text-left text-sm font-semibold text-white transition-colors duration-200 hover:text-[#A259FF]"
            >
              {link}
            </button>
          ))}

          {/* =========================================
              MOBILE SIGN UP
          ========================================= */}

          <button
            type="button"
            onClick={handleSignUp}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 w-full text-sm font-semibold text-white bg-[linear-gradient(90deg,#00E5FF_0%,#008CFF_0%,#5B2CFF_55%,#9B2CFF_95%,#FF00D4_100%)] rounded-[20px] transition-opacity duration-200 hover:opacity-90"
          >
            <User className="h-5 w-5" />

            <span>
              Sign Up
            </span>
          </button>

        </div>
      </div>

    </nav>
  );
};

export default Navbar;