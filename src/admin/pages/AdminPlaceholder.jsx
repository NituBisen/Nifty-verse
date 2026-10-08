import React from "react";
import { useLocation } from "react-router-dom";

const AdminPlaceholder = () => {
  const location = useLocation();

  const title = location.pathname
    .split("/")
    .filter(Boolean)
    .pop()
    .replace(/-/g, " ");

  const formattedTitle =
    title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <div className="flex min-h-[500px] items-center justify-center px-3 py-6 sm:px-5">
      <div className="w-full max-w-[min(600px,calc(100vw-24px))] rounded-3xl border border-white/10 bg-[#111113] p-5 text-center sm:p-6 md:p-8 lg:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#A259FF]/10 text-2xl sm:h-16 sm:w-16">
          ⚡
        </div>

        <h1 className="mt-6 text-[clamp(1.8rem,3vw,3rem)] font-bold">
          {formattedTitle}
        </h1>

        <p className="mx-auto mt-3 max-w-[450px] text-sm leading-6 text-[#77777C]">
          This admin module is ready for backend API integration.
        </p>

        <div className="mt-6 inline-flex rounded-full border border-[#A259FF]/30 bg-[#A259FF]/10 px-4 py-2 text-[11px] font-semibold text-[#A259FF] sm:text-xs">
          Coming Next
        </div>
      </div>
    </div>
  );
};

export default AdminPlaceholder;