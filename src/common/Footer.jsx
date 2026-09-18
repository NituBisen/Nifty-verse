import React from "react";
import {
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

/* ==================================================
   LOGO IMPORT
================================================== */

import logo from "../assets/logo/logo.png";

/* ==================================================
   DATA
================================================== */

const exploreLinks = [
  "Marketplace",
  "Rankings",
  "Connect a wallet",
];

const socialLinks = [
  {
    icon: FaDiscord,
    label: "Discord",
    href: "#",
  },
  {
    icon: FaYoutube,
    label: "YouTube",
    href: "#",
  },
  {
    icon: FaTwitter,
    label: "Twitter",
    href: "#",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "#",
  },
];

/* ==================================================
   FOOTER
================================================== */

const Footer = () => {
  return (
    <footer className="overflow-hidden w-full bg-[#000000]">
      <div
        className="mx-auto px-5 py-12 py-14 max-w-[1250px] sm:px-6 md:py-16 lg:px-10"
      >
        {/* ==================================================
            MAIN FOOTER
        ================================================== */}

        <div
          className="grid grid-cols-1 gap-12 gap-x-10 gap-y-12 gap-0 md:grid-cols-2 lg:grid-cols-[30%_20%_50%]"
        >
          {/* ==================================================
              COLUMN 1 — BRAND
          ================================================== */}

          <div
            className="flex flex-col items-center text-center text-left lg:items-start"
          >
            {/* Logo */}

            <a
              href="/"
              className="inline-flex items-center"
            >
              <img
                src={logo}
                alt="NFT Marketplace"
                className="object-contain h-15 w-auto sm:h-15"
              />
            </a>

            {/* Description */}

            <p
              className="mt-5 max-w-xs text-sm leading-relaxed text-gray-300 sm:text-base"
            >
              NFT marketplace UI created
              with Anima for Figma.
            </p>

            {/* Community */}

            <p
              className="mt-5 text-sm text-gray-300 sm:text-base"
            >
              Join our community
            </p>

            {/* Social Icons */}

            <div
              className="flex items-center gap-5 mt-4"
            >
              {socialLinks.map(
                ({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="text-[#858585] transition-all duration-300 hover:-translate-y-1 hover:text-white"
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* ==================================================
              COLUMN 2 — EXPLORE
          ================================================== */}

          <div
            className="flex flex-col items-center text-center text-left lg:items-start"
          >
            <h3
              className="text-lg font-bold text-white sm:text-xl"
            >
              Explore
            </h3>

            <ul
              className="flex flex-col items-center gap-4 mt-5 lg:items-start"
            >
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 transition-colors duration-300 hover:text-white sm:text-base"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ==================================================
              COLUMN 3 — WEEKLY DIGEST
          ================================================== */}

          <div
            className="flex flex-col items-center text-center text-left lg:items-start"
          >
            {/* Heading */}

            <h3
              className="text-xl font-bold text-white sm:text-2xl"
            >
              Join Our Weekly Digest
            </h3>

            {/* Description */}

            <p
              className="mt-5 max-w-md text-base leading-relaxed text-gray-300 sm:text-lg"
            >
              Get exclusive promotions &amp; updates
              <br className="hidden sm:block" />
              straight to your inbox.
            </p>

            {/* ==================================================
                SUBSCRIBE FORM
            ================================================== */}

            <form
              className="relative mt-7 h-[75px] w-full max-w-[525px]"
            >
              {/* Email Input */}

              <input
                type="email"
                placeholder="Enter your email here"
                className="px-7 pr-[245px] placeholder-[#2B2B2B] h-full w-full text-[18px] text-[#2B2B2B] bg-white rounded-[24px] outline-none"
              />

              {/* Subscribe Button */}

              <button
                type="submit"
                className="z-10 absolute right-0 top-0 flex items-center justify-center h-[75px] w-[224px] text-[18px] font-bold text-white bg-[#7629db] rounded-[24px] transition-colors duration-300 hover:bg-[#9147E6]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ==================================================
            DIVIDER
        ================================================== */}

        <div
          className="mt-12 w-full border-t border-[#858585]"
        />

        {/* ==================================================
            COPYRIGHT
        ================================================== */}

        <p
          className="mt-6 text-center text-xs text-gray-400 sm:text-sm lg:text-left"
        >
          © NFT Market. Use this template freely.
        </p>
      </div>
    </footer>
  );
};

export default Footer;