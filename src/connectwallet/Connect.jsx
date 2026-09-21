import React from "react";

/* ==================================================
   IMAGE IMPORTS
================================================== */

import astronautImage from "../assets/logo/connect-wallet.png";

import metamaskIcon from "../assets/icons/metamask.png";
import walletConnectIcon from "../assets/icons/walletconnect.png";
import coinbaseIcon from "../assets/icons/coinbase.png";

/* ==================================================
   WALLET DATA
================================================== */

const wallets = [
  {
    name: "Metamask",
    icon: metamaskIcon,
  },
  {
    name: "Wallet Connect",
    icon: walletConnectIcon,
  },
  {
    name: "Coinbase",
    icon: coinbaseIcon,
  },
];

/* ==================================================
   CONNECT WALLET
================================================== */

const Connect = () => {
  return (
    <section className="w-full bg-[#000000]">

      <div
        className="mx-auto px-4 py-10 py-14 py-20 max-w-[1250px] sm:px-6 lg:px-8"
      >

        {/* ==========================================
            MAIN CONTAINER
        ========================================== */}

        <div
          className="overflow-hidden flex flex-col rounded-[20px] lg:flex-row"
        >

          {/* ==========================================
              LEFT IMAGE
          ========================================== */}

          <div
            className="w-full shrink-0 lg:w-1/2"
          >
            <img
              src={astronautImage}
              alt="Connect Wallet"
              className="object-cover block h-[350px] w-full rounded-l-[20px] rounded-r-none sm:h-[450px] md:h-[550px] lg:h-[650px]"
            />
          </div>

          {/* ==========================================
              RIGHT CONTENT
          ========================================== */}

          <div
            className="flex items-center px-6 py-12 py-14 w-full w-1/2 sm:px-10 md:px-14 lg:px-12 xl:px-16"
          >

            <div
              className="mx-auto w-full max-w-[420px] text-center text-left lg:mx-0"
            >

              {/* =====================================
                  HEADING
              ===================================== */}

             <h1
  className="text-3xl font-bold leading-tight text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_10%,#4DA6FF_80%)] bg-clip-text sm:text-4xl md:text-5xl"
>
  Connect Wallet
</h1>

              {/* =====================================
                  DESCRIPTION
              ===================================== */}

              <p
                className="mt-4 text-base leading-relaxed text-gray-300 sm:text-lg"
              >
                Choose a wallet you want to connect.
                <br className="hidden sm:block" />
                There are several wallet providers.
              </p>

              {/* =====================================
                  WALLET BUTTONS
              ===================================== */}

              <div
                className="flex flex-col items-center gap-3.5 mt-8 lg:items-start"
              >

                {wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    type="button"
                    className="flex items-center gap-4 px-5 h-[55px] w-full max-w-[300px] text-left text-base font-bold text-white bg-transparent rounded-2xl border-[#A259FF] transition-all duration-200 cursor-pointer border hover:bg-[#A259FF]/10 hover:border-[#B978FF] sm:max-w-[240px]"
                  >

                    {/* Wallet Image */}

                    <img
                      src={wallet.icon}
                      alt={wallet.name}
                      className="object-contain h-7 w-7 shrink-0"
                    />

                    {/* Wallet Name */}

                    <span>
                      {wallet.name}
                    </span>

                  </button>
                ))}

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Connect;