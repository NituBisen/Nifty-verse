import React from "react";
import {
  FaDiscord,
  FaYoutube,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

import logo from "../assets/logo/logo.png";

const exploreLinks = [
  "Marketplace",
  "Rankings",
  "Connect a wallet",
];

const socialLinks = [
  { icon: FaDiscord, label: "Discord", href: "#" },
  { icon: FaYoutube, label: "YouTube", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaInstagram, label: "Instagram", href: "#" },
];

const socialGradients = [
  "from-[#A259FF] to-[#F7C6E7]",
  "from-[#F7C6E7] to-[#FFFFFF]",
  "from-[#4DA6FF] to-[#A259FF]",
  "from-[#F7C6E7] via-[#A259FF] to-[#4DA6FF]",
];

const Footer = () => {
  return (
    <footer className="overflow-hidden w-full bg-[#000000] footer-main">
      <div
        className="mx-auto px-5 py-12 max-w-[1250px] footer-container sm:px-6 md:py-16 lg:px-10"
      >
        {/* =====================================================
            FOOTER MAIN GRID
        ===================================================== */}

        <div
          className="grid grid-cols-1 gap-12 footer-grid md:grid-cols-2 lg:grid-cols-[30%_20%_50%]"
        >
          {/* =====================================================
              BRAND
          ===================================================== */}

          <div
            className="flex flex-col items-center text-center footer-brand lg:items-start"
          >
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

            <p
              className="mt-5 max-w-xs text-sm leading-relaxed text-gray-300 footer-description sm:text-base"
            >
              NFT marketplace UI created
              <br />
              with Anima for Figma.
            </p>

            <p
              className="mt-5 text-sm text-gray-300 footer-community sm:text-base"
            >
              Join our community
            </p>

            {/* SOCIAL ICONS */}

            <div
              className="flex items-center gap-4 mt-5 footer-social"
            >
              {socialLinks.map(
                ({ icon: Icon, label, href }, index) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="relative flex items-center justify-center h-11 w-11 rounded-full group"
                  >
                    {/* Glow */}

                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-r
                        ${socialGradients[index]}
                        opacity-30
                        blur-md
                        transition-all
                        duration-300
                        group-hover:opacity-90
                        group-hover:blur-lg
                      `}
                    />

                    {/* Circle */}

                    <span
                      className={`
                        relative
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-gradient-to-br
                        ${socialGradients[index]}
                        transition-all
                        duration-300
                        group-hover:-translate-y-1
                        group-hover:scale-110
                        group-hover:border-white/60
                      `}
                    >
                      <Icon className="h-5 w-5 text-black" />
                    </span>
                  </a>
                )
              )}
            </div>
          </div>

          {/* =====================================================
              EXPLORE
          ===================================================== */}

          <div
            className="flex flex-col items-center text-center footer-explore lg:items-start"
          >
            <h3 className="text-lg font-bold text-white sm:text-xl">
              Explore
            </h3>

            <ul
              className="flex flex-col items-center gap-4 mt-5 footer-links lg:items-start"
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

          {/* =====================================================
              WEEKLY DIGEST
          ===================================================== */}

          <div
            className="flex flex-col items-center text-center footer-digest lg:items-start"
          >
            <h3 className="text-xl font-bold text-white sm:text-2xl">
              Join Our Weekly Digest
            </h3>

            <p
              className="mt-5 max-w-md text-base leading-relaxed text-gray-300 footer-digest-description sm:text-lg"
            >
              Get exclusive promotions &amp; updates
              <br className="hidden sm:block" />
              straight to your inbox.
            </p>

            {/* EMAIL FORM */}

            <form
              className="relative mt-7 h-[75px] w-full max-w-[525px] footer-form"
            >
              <input
                type="email"
                placeholder="Enter your email here"
                className="px-7 pr-[245px] placeholder-[#2B2B2B] h-full w-full min-w-0 text-[18px] text-[#2B2B2B] bg-white rounded-[24px] outline-none footer-input"
              />

              <button
                type="submit"
                className="z-10 absolute right-0 top-0 flex items-center justify-center h-[75px] w-[224px] text-[18px] font-bold text-white bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_30%,#4DA6FF_90%)] rounded-[24px] transition-all duration-300 footer-button hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(162,89,255,0.5)]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div
          className="mt-12 w-full border-t border-[#858585] footer-divider"
        />

        {/* =====================================================
            COPYRIGHT
        ===================================================== */}

        <p
          className="mt-6 text-center text-xs text-gray-400 footer-copyright sm:text-sm lg:text-left"
        >
          © NFT Market. Use this template freely.
        </p>
      </div>

      {/* =======================================================
          RESPONSIVE CSS

          BREAKPOINT 1:
          601px - 900px = TABLET

          BREAKPOINT 2:
          600px and below = MOBILE
      ======================================================= */}

     <style>{`

  /* =====================================================
     TABLET
     601px - 1024px
     
     Everything centered
  ===================================================== */

  @media (min-width: 601px) and (max-width: 1024px) {

    .footer-container {
      width: 100%;
      max-width: 900px;
      margin-left: auto;
      margin-right: auto;
    }

    /* =================================================
       MAIN GRID
    ================================================= */

    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 45px 35px;
    }

    /* =================================================
       BRAND
    ================================================= */

    .footer-brand {
      width: 100%;
      align-items: center !important;
      text-align: center !important;
    }

    .footer-description {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    .footer-community {
      text-align: center;
    }

    .footer-social {
      justify-content: center;
      margin-left: auto;
      margin-right: auto;
    }

    /* =================================================
       EXPLORE
    ================================================= */

    .footer-explore {
      width: 100%;
      align-items: center !important;
      text-align: center !important;
    }

    .footer-links {
      align-items: center !important;
      text-align: center;
    }

    /* =================================================
       WEEKLY DIGEST
    ================================================= */

    .footer-digest {
      width: 100%;
      align-items: center !important;
      text-align: center !important;

      grid-column: 1 / -1;
    }

    .footer-digest-description {
      margin-left: auto;
      margin-right: auto;
      text-align: center;
    }

    /* =================================================
       FORM
    ================================================= */

    .footer-form {
      width: 100%;
      max-width: 525px;
      margin-left: auto;
      margin-right: auto;
    }

    .footer-input {
      min-width: 0;
    }

    /* =================================================
       COPYRIGHT
    ================================================= */

    .footer-copyright {
      text-align: center !important;
    }
  }


  /* =====================================================
     MOBILE
     600px AND BELOW
  ===================================================== */

  @media (max-width: 600px) {

    .footer-container {
      width: 100%;
      max-width: 100%;
      padding-left: 16px;
      padding-right: 16px;
      padding-top: 42px;
      padding-bottom: 32px;
    }

    /* =================================================
       MAIN GRID
    ================================================= */

    .footer-grid {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 40px;
    }

    /* =================================================
       BRAND
    ================================================= */

    .footer-brand {
      width: 100%;
      align-items: center !important;
      text-align: center !important;
    }

    .footer-brand img {
      max-width: 165px;
      height: auto;
    }

    .footer-description {
      width: 100%;
      max-width: 290px;
      margin-top: 16px;
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;
      line-height: 1.7;
      text-align: center;
    }

    .footer-community {
      margin-top: 17px;
      font-size: 14px;
      text-align: center;
    }

    /* =================================================
       SOCIAL ICONS
    ================================================= */

    .footer-social {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-top: 16px;
      margin-left: auto;
      margin-right: auto;
    }

    /* =================================================
       EXPLORE
    ================================================= */

    .footer-explore {
      width: 100%;
      align-items: center !important;
      text-align: center !important;
    }

    .footer-explore h3 {
      text-align: center;
    }

    .footer-links {
      align-items: center !important;
      justify-content: center;
      margin-top: 17px;
      text-align: center;
    }

    /* =================================================
       WEEKLY DIGEST
    ================================================= */

    .footer-digest {
      width: 100%;
      align-items: center !important;
      text-align: center !important;
    }

    .footer-digest h3 {
      max-width: 100%;
      font-size: 21px;
      line-height: 1.3;
      text-align: center;
    }

    .footer-digest-description {
      max-width: 300px;
      margin-left: auto;
      margin-right: auto;
      font-size: 14px;
      line-height: 1.6;
      text-align: center;
    }

    /* =================================================
       FORM
    ================================================= */

    .footer-form {
      position: relative;
      width: 100%;
      max-width: 380px;
      height: auto;

      margin-left: auto;
      margin-right: auto;

      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .footer-input {
      width: 100%;
      height: 58px;

      padding-left: 20px;
      padding-right: 20px;

      font-size: 16px;
      border-radius: 18px;
    }

    .footer-button {
      position: relative;

      top: auto;
      right: auto;

      width: 100%;
      height: 58px;

      border-radius: 18px;

      font-size: 16px;
    }

    /* =================================================
       DIVIDER
    ================================================= */

    .footer-divider {
      margin-top: 40px;
    }

    /* =================================================
       COPYRIGHT
    ================================================= */

    .footer-copyright {
      margin-top: 20px;
      text-align: center !important;
      font-size: 12px;
      line-height: 1.6;
    }
  }

`}</style>
    </footer>
  );
};

export default Footer;