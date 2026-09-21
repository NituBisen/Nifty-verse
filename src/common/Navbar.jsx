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

  // =========================================================
  // MOBILE MENU
  // =========================================================

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // =========================================================
  // SIGN UP
  // =========================================================

  const handleSignUp = () => {
    closeMenu();
    navigate("/create-account");
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  const handleNavClick = (link) => {
    closeMenu();

    if (link === "Marketplace") {
      navigate("/");
    }

    if (link === "Rankings") {
  navigate("/ranking-page");
}

    if (link === "Connect a wallet") {
      navigate("/connect-wallet");
    }
  };

  return (
    <nav className="z-50 overflow-visible relative w-full bg-black">
      {/* =====================================================
          MAIN NAVBAR
      ===================================================== */}

      <div className="mx-auto px-4 w-full max-w-7xl sm:px-6 md:px-7 lg:px-10">
        <div className="flex items-center justify-between gap-4 h-[72px] sm:h-[76px] md:h-[82px] lg:h-20">
          
          {/* =================================================
              LOGO
          ================================================= */}

          <button
            type="button"
            onClick={() => navigate("/")}
            aria-label="Go to marketplace"
            className="flex items-center transition-transform duration-300 cursor-pointer shrink-0 hover:scale-[1.03] active:scale-95"
          >
            <img
              src={logo}
              alt="NFT Marketplace"
              className="object-contain block h-[42px] w-auto sm:h-[46px] md:h-[48px] lg:h-[50px]"
            />
          </button>

          {/* =================================================
              TABLET + DESKTOP NAVIGATION

              Visible from 768px
          ================================================= */}

          <div
            className="hidden flex-1 items-center justify-end gap-4 gap-5 min-w-0 md:flex lg:gap-8 xl:gap-10"
          >
            {/* ===============================================
                NAV LINKS
            =============================================== */}

            <div
              className="flex items-center gap-4 min-w-0 md:gap-5 lg:gap-8 xl:gap-10"
            >
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  type="button"
                  onClick={() => handleNavClick(link)}
                  className="relative whitespace-nowrap text-[12px] font-semibold text-white transition-all duration-300 cursor-pointer shrink-0 hover:-translate-y-0.5 hover:text-[#A259FF] active:scale-95 md:text-[13px] lg:text-base"
                >
                  {link}

                  {/* Hover underline */}
                  <span
                    className="absolute left-0 h-[2px] w-0 bg-[#A259FF] rounded-full transition-all duration-300 -bottom-1 group-hover:w-full"
                  />
                </button>
              ))}
            </div>

            {/* ===============================================
                DESKTOP / TABLET SIGN UP
            =============================================== */}

            <button
              type="button"
              onClick={handleSignUp}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-3 px-7 py-4 text-[13px] font-semibold text-white text-base bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_20%,#4DA6FF_100%)] rounded-[16px] rounded-[20px] shadow-[0_0_20px_rgba(162,89,255,0.12)] transition-all duration-300 cursor-pointer shrink-0 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(162,89,255,0.25)] active:scale-95 md:gap-1.5 lg:gap-2"
            >
              <User className="h-4 w-4 w-5 md:h-4 lg:h-5" />

              <span>Sign Up</span>
            </button>
          </div>

          {/* =================================================
              MOBILE MENU BUTTON

              Visible below 768px
          ================================================= */}

          <button
            type="button"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center p-2 text-white rounded-xl transition-all duration-300 cursor-pointer shrink-0 hover:bg-white/10 hover:text-[#A259FF] active:scale-90 md:hidden"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7" />
            ) : (
              <Menu className="h-7 w-7" />
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ===================================================== */}

      <div
        className={`
          absolute
          left-0
          right-0
          top-full
          overflow-hidden
          border-t
          border-white/10
          bg-black/95
          shadow-2xl
          backdrop-blur-xl
          transition-all
          duration-300
          ease-in-out
          md:hidden
          ${
            isMenuOpen
              ? "pointer-events-auto max-h-[420px] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }
        `}
      >
        <div
          className={`
            mx-auto
            flex
            w-full
            max-w-7xl
            flex-col
            gap-2
            px-4
            pb-6
            pt-4
            transition-all
            duration-300
            sm:px-6
            ${
              isMenuOpen
                ? "translate-y-0"
                : "-translate-y-3"
            }
          `}
        >
          {/* =================================================
              MOBILE NAV LINKS
          ================================================= */}

          {NAV_LINKS.map((link, index) => (
            <button
              key={link}
              type="button"
              onClick={() => handleNavClick(link)}
              className={`
                flex
                w-full
                cursor-pointer
                items-center
                justify-between
                rounded-xl
                px-4
                py-3.5
                text-left
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-white/5
                hover:pl-5
                hover:text-[#A259FF]
                active:scale-[0.98]
                ${
                  isMenuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-3 opacity-0"
                }
              `}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 50}ms`
                  : "0ms",
              }}
            >
              <span>{link}</span>

              <span className="text-[#A259FF]">
                →
              </span>
            </button>
          ))}

          {/* =================================================
              MOBILE SIGN UP
          ================================================= */}

          <button
            type="button"
            onClick={handleSignUp}
            className={`
              mt-2
              inline-flex
              w-full
              cursor-pointer
              items-center
              justify-center
              gap-2
              rounded-[20px]
              bg-[linear-gradient(90deg,#00E5FF_0%,#008CFF_30%,#5B2CFF_55%,#9B2CFF_75%,#FF00D4_100%)]
              px-5
              py-3.5
              text-sm
              font-semibold
              text-white
              shadow-[0_0_25px_rgba(162,89,255,0.15)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_10px_30px_rgba(162,89,255,0.25)]
              active:scale-[0.98]
              ${
                isMenuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0"
              }
            `}
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