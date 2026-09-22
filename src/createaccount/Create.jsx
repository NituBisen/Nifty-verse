import React from "react";
import { User, Mail, LockKeyhole } from "lucide-react";

/* ==================================================
   IMAGE IMPORT — replace with your real asset path.
================================================== */
import astronautImage from "../assets/logo/create-account-astronaut.png";

/* ==================================================
   SECTION
================================================== */
const CreateAccount = () => {
  return (
    <section className="w-full bg-[#000000]">
      <div className="mx-auto px-4 py-14 max-w-[1400px] sm:px-6 md:py-20 lg:px-10">
        <div className="overflow-hidden flex flex-col items-stretch rounded-2xl lg:flex-row">
          {/* Left image */}
          <div className="w-full shrink-0 lg:w-1/2">
            <img
              src={astronautImage}
              alt="Astronauts approaching a spacecraft"
              className="object-cover w-full h-[260px] min-h-[520px] sm:h-[360px] lg:h-full"
            />
          </div>

          {/* Right form */}
          <div className="flex items-center px-1 py-10 py-0 w-full w-1/2 bg-[#1e1c1c] sm:px-4 lg:px-12">
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <h2
  className="font-bold text-3xl text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_5%,#4DA6FF_80%)] bg-clip-text sm:text-4xl"
>
  Create Account
</h2>

              <p className="mt-4 text-gray-300 text-base leading-relaxed sm:text-lg">
                Welcome! Enter Your Details And Start Creating, Collecting
                And Selling NFTs.
              </p>

              <form className="flex flex-col gap-4 mt-8">
                <div className="relative">
                  <User className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Username"
                    className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Password"
                    className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
                  />
                </div>

                <div className="relative">
                  <LockKeyhole className="absolute left-5 top-1/2 h-5 w-5 text-gray-400 -translate-y-1/2" />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="placeholder-gray-500 pl-12 pr-5 w-full h-[52px] text-gray-900 text-base bg-white rounded-full outline-none sm:h-[55px]"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full h-[52px] text-white font-bold text-base bg-[#7a39d0] rounded-full transition-opacity hover:opacity-90 sm:h-[55px]"
                >
                  Create account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;