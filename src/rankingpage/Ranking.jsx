import { useState } from "react";

/* ------------------------------------------------------------------
   Creator images — update the file names/extensions to match your assets.
   The reference reuses three avatars for ranks 18–20, so only 17 unique
   imports are needed (18 → creator1, 19 → creator10, 20 → creator3).
------------------------------------------------------------------- */
import creator1 from "../assets/ranking/creator1.png";
import creator2 from "../assets/ranking/creator2.png";
import creator3 from "../assets/ranking/creator3.png";
import creator4 from "../assets/ranking/creator4.png";
import creator5 from "../assets/ranking/creator5.png";
import creator6 from "../assets/ranking/creator6.png";
import creator7 from "../assets/ranking/creator7.png";
import creator8 from "../assets/ranking/creator8.png";
import creator9 from "../assets/ranking/creator9.png";
import creator10 from "../assets/ranking/creator10.png";
import creator11 from "../assets/ranking/creator11.png";
import creator12 from "../assets/ranking/creator12.png";
import creator13 from "../assets/ranking/creator13.png";
import creator14 from "../assets/ranking/creator14.png";
import creator15 from "../assets/ranking/creator15.png";
import creator16 from "../assets/ranking/creator16.png";
import creator17 from "../assets/ranking/creator17.png";

/* ------------------------------ Data ------------------------------ */

const TABS = ["Today", "This Week", "This Month", "All Time"];

const CHANGE = "+1.41%";
const SOLD = "602";
const VOLUME = "12.4 ETH";

// Same data is shown for every tab for now. Swap in per-tab data when available.
const creators = [
  { rank: 1, name: "Jaydon Ekstrom Bothman", image: creator1 },
  { rank: 2, name: "Ruben Carder", image: creator2 },
  { rank: 3, name: "Alfredo Septimus", image: creator3 },
  { rank: 4, name: "Davis Franci", image: creator4 },
  { rank: 5, name: "Livia Rosser", image: creator5 },
  { rank: 6, name: "Kianna Donin", image: creator6 },
  { rank: 7, name: "Phillip Lipshutz", image: creator7 },
  { rank: 8, name: "Maria Rosser", image: creator8 },
  { rank: 9, name: "Kianna Stanton", image: creator9 },
  { rank: 10, name: "Angel Lubin", image: creator10 },
  { rank: 11, name: "Allison Torff", image: creator11 },
  { rank: 12, name: "Davis Workman", image: creator12 },
  { rank: 13, name: "Lindsey Lipshutz", image: creator13 },
  { rank: 14, name: "Randy Carder", image: creator14 },
  { rank: 15, name: "Lydia Culhane", image: creator15 },
  { rank: 16, name: "Rayna Bator", image: creator16 },
  { rank: 17, name: "Jocelyn Westervelt", image: creator17 },
  { rank: 18, name: "Marilyn Torff", image: creator1 },
  { rank: 19, name: "Skylar Levin", image: creator10 },
  { rank: 20, name: "Terry Dorwart", image: creator3 },
].map((creator) => ({
  ...creator,
  change: CHANGE,
  sold: SOLD,
  volume: VOLUME,
}));

/* ------------------------ Shared class strings ---------------------
   Breakpoints (exclusive ranges so nothing overlaps):
   - Desktop: > 1024px  -> base classes
   - Tablet:  601–1024px -> min-[601px]:max-[1024px]:
   - Mobile:  <= 600px   -> max-[600px]:
------------------------------------------------------------------- */

const FONT_SANS = "font-['Work_Sans',ui-sans-serif,system-ui,sans-serif]";
const FONT_MONO =
  "font-['Space_Mono',ui-monospace,SFMono-Regular,Menlo,monospace]";

// Column layout shared by the header and every row so they always line up.
const GRID_COLS =
  "grid grid-cols-[minmax(0,2.7fr)_repeat(3,minmax(0,1fr))] items-center pl-5 min-[601px]:max-[1024px]:pl-3";

// "# + avatar + name" cluster
const ARTIST_CELL =
  "flex min-w-0 items-center gap-5 min-[601px]:max-[1024px]:gap-3 max-[600px]:gap-3";

// Width of the rank circle (also used by the "#" in the header)
const RANK_BOX =
  "flex h-[26px] w-[26px] shrink-0 items-center justify-center min-[601px]:max-[1024px]:h-[22px] min-[601px]:max-[1024px]:w-[22px] max-[600px]:h-6 max-[600px]:w-6";

/* --------------------------- Components --------------------------- */

function RankingTabs({ activeTab, onChange }) {
  return (
    <div
      role="tablist"
      aria-label="Ranking period"
      className="overflow-x-auto flex mt-10 min-[601px]:max-[1024px]:mt-8 max-[600px]:mt-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab)}
            className={`${FONT_SANS} flex-1 whitespace-nowrap border-b-2 px-3 py-4 text-[16px] font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white/60 min-[601px]:max-[1024px]:py-3.5 min-[601px]:max-[1024px]:text-[15px] max-[600px]:px-3 max-[600px]:py-3 max-[600px]:text-[13px] ${
              isActive
                ? "border-white text-white"
                : "border-transparent text-[#858585] hover:text-white/80"
            }`}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

function RankingHeader() {
  return (
    <div
      className={`${FONT_MONO} ${GRID_COLS} mt-10 h-11 rounded-[20px] border border-white/[0.08] text-[15px] text-[#858585] min-[601px]:max-[1024px]:mt-7 min-[601px]:max-[1024px]:h-9 min-[601px]:max-[1024px]:rounded-2xl min-[601px]:max-[1024px]:text-xs max-[600px]:hidden`}
    >
      <div className={ARTIST_CELL}>
        <span className={`${RANK_BOX} justify-center`}>#</span>
        <span>Artist</span>
      </div>
      <span>Change</span>
      <span>NFTs Sold</span>
      <span>Volume</span>
    </div>
  );
}

// A single numeric cell. The label is only visible on mobile,
// where the column header is hidden.
function Stat({ label, align = "", valueClass = "text-[#D9D9D9]", children }) {
  return (
    <div
      className={`${FONT_MONO} min-w-0 text-[15px] min-[601px]:max-[1024px]:text-xs max-[600px]:border-t max-[600px]:border-white/[0.08] max-[600px]:pt-3 max-[600px]:text-[13px] ${align}`}
    >
      <span className="hidden mb-0.5 max-[600px]:block text-[11px] text-[#858585]">
        {label}
      </span>
      <span className={`block truncate ${valueClass}`}>{children}</span>
    </div>
  );
}

function CreatorRow({ creator }) {
  return (
    <li
      className={`${GRID_COLS} h-[78px] rounded-[18px] bg-[#1c1b1b] transition-colors duration-200 hover:bg-[#444444] min-[601px]:max-[1024px]:h-16 min-[601px]:max-[1024px]:rounded-[14px] max-[600px]:h-auto max-[600px]:grid-cols-3 max-[600px]:gap-y-3 max-[600px]:rounded-xl max-[600px]:p-3`}
    >
      <div className={`${ARTIST_CELL} max-[600px]:col-span-3`}>
        <span
          className={`${RANK_BOX} ${FONT_MONO} rounded-full bg-[#000000] text-[13px] text-[#858585] min-[601px]:max-[1024px]:text-[11px] max-[600px]:text-[11px]`}
        >
          {creator.rank}
        </span>
        <img
          src={creator.image}
          alt={creator.name}
          loading="lazy"
          className="object-cover h-14 w-14 min-[601px]:max-[1024px]:h-10 min-[601px]:max-[1024px]:w-10 max-[600px]:h-11 max-[600px]:w-11 rounded-full shrink-0"
        />
        <span
          className={`${FONT_SANS} truncate text-[20px] font-semibold text-white min-[601px]:max-[1024px]:text-[15px] max-[600px]:text-base`}
        >
          {creator.name}
        </span>
      </div>

      <Stat label="Change" align="max-[600px]:text-left" valueClass="text-[#00AC6A]">
        {creator.change}
      </Stat>
      <Stat label="NFTs Sold" align="max-[600px]:text-center">
        {creator.sold}
      </Stat>
      <Stat label="Volume" align="max-[600px]:text-right">
        {creator.volume}
      </Stat>
    </li>
  );
}

/* ----------------------------- Section ---------------------------- */

export default function Rankings() {
  const [activeTab, setActiveTab] = useState("Today");

  // Swap this for per-tab data when you have it, e.g. dataByTab[activeTab].
  const visibleCreators = creators;

  return (
    <section className="py-20 w-full min-[601px]:max-[1024px]:py-14 max-[600px]:py-10 bg-[#000000]">
      <div className="mx-auto px-8 w-full max-w-[1040px] min-[601px]:max-[1024px]:px-6 max-[600px]:px-4">
        {/* Heading */}
        <div className="max-[600px]:text-center text-left">
          <h2
  className={`${FONT_SANS} text-[40px] font-semibold leading-tight bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_4%,#4DA6FF_100%)] bg-clip-text text-transparent min-[601px]:max-[1024px]:text-[32px] max-[600px]:text-[28px]`}
>
  Top Creators
</h2>
          <p
            className={`${FONT_SANS} mt-3 text-[16px] text-white min-[601px]:max-[1024px]:text-[15px] max-[600px]:mt-2 max-[600px]:text-sm`}
          >
            Check out top ranking NFT artists on the NFT Marketplace.
          </p>
        </div>

        <RankingTabs activeTab={activeTab} onChange={setActiveTab} />
        <RankingHeader />

        {/* Rows */}
        <ul
          role="tabpanel"
          aria-label={`${activeTab} top creators`}
          className="flex flex-col gap-[19px] mt-5 min-[601px]:max-[1024px]:mt-4 min-[601px]:max-[1024px]:gap-3 max-[600px]:mt-5 max-[600px]:gap-2.5"
        >
          {visibleCreators.map((creator) => (
            <CreatorRow key={creator.rank} creator={creator} />
          ))}
        </ul>
      </div>
    </section>
  );
}