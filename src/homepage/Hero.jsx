import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Eye, Mail } from "lucide-react";

/* =========================================================
   HERO IMAGE
========================================================= */

import nftArtwork from "../assets/images/nft-artwork.png";

/* =========================================================
   TRENDING COLLECTION IMAGES
========================================================= */

// DSGN Animals
import animalMain from "../assets/images/dsgn-animals-main.png";
import animalSmall1 from "../assets/images/dsgn-animals-small-1.png";
import animalSmall2 from "../assets/images/dsgn-animals-small-2.png";
import animalAvatar from "../assets/images/mrfox-avatar.png";

// Magic Mushrooms
import mushroomMain from "../assets/images/magic-mushrooms-main.png";
import mushroomSmall1 from "../assets/images/magic-mushrooms-small-1.png";
import mushroomSmall2 from "../assets/images/magic-mushrooms-small-2.png";
import mushroomAvatar from "../assets/images/shroomie-avatar.png";

// Disco Machines
import robotMain from "../assets/images/disco-machines-main.png";
import robotSmall1 from "../assets/images/disco-machines-small-1.png";
import robotSmall2 from "../assets/images/disco-machines-small-2.png";
import robotAvatar from "../assets/images/bekind2robots-avatar.png";

/* =========================================================
   TOP CREATORS IMAGES
========================================================= */

import keepitrealAvatar from "../assets/topcreaters/keepitreal.png";
import digilabAvatar from "../assets/topcreaters/digilab.png";
import gravityoneAvatar from "../assets/topcreaters/gravityone.png";
import juanieAvatar from "../assets/topcreaters/juanie.png";
import bluewhaleAvatar from "../assets/topcreaters/bluewhale.png";
import mrfoxAvatar from "../assets/topcreaters/mrfox.png";
import shroomieAvatar from "../assets/topcreaters/shroomie.png";
import roboticaAvatar from "../assets/topcreaters/robotica.png";
import rustyrobotAvatar from "../assets/topcreaters/rustyrobot.png";
import animakidAvatar from "../assets/topcreaters/animakid.png";
import dotguAvatar from "../assets/topcreaters/dotgu.png";
import ghiblierAvatar from "../assets/topcreaters/ghiblier.png";

/* =========================================================
   BROWSE CATEGORIES IMAGES
========================================================= */

import artImage from "../assets/browse/art.png";
import collectiblesImage from "../assets/browse/collectibles.png";
import musicImage from "../assets/browse/music.png";
import photographyImage from "../assets/browse/photography.png";
import videoImage from "../assets/browse/video.png";
import utilityImage from "../assets/browse/utility.png";
import sportImage from "../assets/browse/sport.png";
import virtualWorldsImage from "../assets/browse/virtual-worlds.png";

/* =========================================================
   DISCOVER MORE NFT IMAGES
========================================================= */

import distantGalaxyImage from "../assets/images/distant-galaxy.png";
import distantGalaxyAvatar from "../assets/images/moondancer.png";

import lifeOnEdenaImage from "../assets/images/life-on-edena.png";
import lifeOnEdenaAvatar from "../assets/images/nebulakid.png";

import astroFictionImage from "../assets/images/astrofiction.png";
import astroFictionAvatar from "../assets/images/spaceone.png";

/* =========================================================
   MAGIC MUSHROOMS AUCTION IMAGES
========================================================= */

import magicMushroomsImage from "../assets/logo/magic-mushrooms-hero.png";
import shroomieAuctionAvatar from "../assets/logo/shroomie.png";

/* =========================================================
   HOW IT WORKS IMAGES
========================================================= */

import walletIllustration from "../assets/logo/setup-wallet.png";
import collectionIllustration from "../assets/logo/create-collection.png";
import earningIllustration from "../assets/logo/start-earning.png";

/* =========================================================
   WEEKLY DIGEST IMAGE
========================================================= */

import astronautImage from "../assets/logo/astronaut-newspaper.png";

/* =========================================================
   HERO STATS
========================================================= */

const STATS = [
  {
    value: "240k+",
    label: "Total Sale",
  },
  {
    value: "100k+",
    label: "Auctions",
  },
  {
    value: "240k+",
    label: "Artists",
  },
];

/* =========================================================
   TRENDING COLLECTION DATA
========================================================= */

const collections = [
  {
    title: "DSGN Animals",
    creator: "MrFox",
    mainImage: animalMain,
    images: [animalSmall1, animalSmall2],
    avatar: animalAvatar,
  },
  {
    title: "Magic Mushrooms",
    creator: "Shroomie",
    mainImage: mushroomMain,
    images: [mushroomSmall1, mushroomSmall2],
    avatar: mushroomAvatar,
  },
  {
    title: "Disco Machines",
    creator: "BeKind2Robots",
    mainImage: robotMain,
    images: [robotSmall1, robotSmall2],
    avatar: robotAvatar,
  },
];

/* =========================================================
   TOP CREATORS DATA
========================================================= */

const creators = [
  {
    rank: 1,
    name: "Keepitreal",
    avatar: keepitrealAvatar,
  },
  {
    rank: 2,
    name: "DigiLab",
    avatar: digilabAvatar,
  },
  {
    rank: 3,
    name: "GravityOne",
    avatar: gravityoneAvatar,
  },
  {
    rank: 4,
    name: "Juanie",
    avatar: juanieAvatar,
  },
  {
    rank: 5,
    name: "BlueWhale",
    avatar: bluewhaleAvatar,
  },
  {
    rank: 6,
    name: "Mr Fox",
    avatar: mrfoxAvatar,
  },
  {
    rank: 7,
    name: "Shroomie",
    avatar: shroomieAvatar,
  },
  {
    rank: 8,
    name: "Robotica",
    avatar: roboticaAvatar,
  },
  {
    rank: 9,
    name: "RustyRobot",
    avatar: rustyrobotAvatar,
  },
  {
    rank: 10,
    name: "Animakid",
    avatar: animakidAvatar,
  },
  {
    rank: 11,
    name: "Dotgu",
    avatar: dotguAvatar,
  },
  {
    rank: 12,
    name: "Ghiblier",
    avatar: ghiblierAvatar,
  },
];

/* =========================================================
   BROWSE CATEGORIES DATA
========================================================= */

const categories = [
  {
    name: "Art",
    image: artImage,
  },
  {
    name: "Collectibles",
    image: collectiblesImage,
  },
  {
    name: "Music",
    image: musicImage,
  },
  {
    name: "Photography",
    image: photographyImage,
  },
  {
    name: "Video",
    image: videoImage,
  },
  {
    name: "Utility",
    image: utilityImage,
  },
  {
    name: "Sport",
    image: sportImage,
  },
  {
    name: "Virtual Worlds",
    image: virtualWorldsImage,
  },
];

/* =========================================================
   DISCOVER MORE NFT DATA
========================================================= */

const nfts = [
  {
    title: "Distant Galaxy",
    creator: "MoonDancer",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: distantGalaxyImage,
    avatar: distantGalaxyAvatar,
  },
  {
    title: "Life On Edena",
    creator: "NebulaKid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: lifeOnEdenaImage,
    avatar: lifeOnEdenaAvatar,
  },
  {
    title: "AstroFiction",
    creator: "Spaceone",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
    image: astroFictionImage,
    avatar: astroFictionAvatar,
  },
];

/* =========================================================
   AUCTION TIME
========================================================= */

const auctionTime = [
  {
    value: "59",
    label: "Hours",
  },
  {
    value: "59",
    label: "Minutes",
  },
  {
    value: "59",
    label: "Seconds",
  },
];

/* =========================================================
   HOW IT WORKS DATA
========================================================= */

const steps = [
  {
    image: walletIllustration,
    title: "Setup Your Wallet",
    description:
      "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
  },
  {
    image: collectionIllustration,
    title: "Create Collection",
    description:
      "Upload your work and setup your collection. Add a description, social links and floor price.",
  },
  {
    image: earningIllustration,
    title: "Start Earning",
    description:
      "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
  },
];


/* =========================================================
   REVEAL ANIMATION
   Keeps the existing layout intact and only animates
   elements when they enter the viewport.
========================================================= */

const Reveal = ({ children, className = "", delay = 0 }) => {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  

  React.useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-show" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/* =========================================================
   TRENDING COLLECTION CARD
========================================================= */

const CollectionCard = ({
  title,
  creator,
  mainImage,
  images,
  avatar,
}) => {
  return (
    <div className="w-full cursor-pointer">

      {/* Main Image */}
      <div className="overflow-hidden w-full rounded-2xl aspect-square">
        <img
          src={mainImage}
          alt={title}
          className="object-cover h-full w-full transition-transform duration-700 cursor-pointer hover:scale-110"
        />
      </div>

      {/* Small Images */}
      <div className="grid grid-cols-3 gap-3 mt-4 sm:gap-4">

        <div className="overflow-hidden rounded-xl aspect-square">
          <img
            src={images[0]}
            alt={`${title} preview 1`}
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="overflow-hidden rounded-xl aspect-square">
          <img
            src={images[1]}
            alt={`${title} preview 2`}
            className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex items-center justify-center bg-[#7e28ee] rounded-xl aspect-square">
          <span className="text-sm font-bold text-white sm:text-base md:text-lg">
            1025+
          </span>
        </div>

      </div>

      {/* Collection Title */}
      <h3 className="mt-4 text-2xl font-bold text-white sm:mt-5">
        {title}
      </h3>

      {/* Creator */}
      <div className="flex items-center gap-2 mt-2">
        <img
          src={avatar}
          alt={creator}
          className="object-cover w-8 h-8 rounded-full shrink-0"
        />

        <span className="text-sm text-gray-300 sm:text-base">
          {creator}
        </span>
      </div>

    </div>
  );
};

/* =========================================================
   TOP CREATOR CARD
========================================================= */

const CreatorCard = ({
  rank,
  name,
  avatar,
}) => {
  return (
    <div className="relative flex flex-col items-center px-4 pt-6 pb-6 bg-[#212020] rounded-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl sm:px-5 md:px-6">

      {/* Ranking Badge */}
      <div className="absolute left-4 top-5 flex items-center justify-center w-9 h-9 bg-[#000000] rounded-full sm:left-5 md:left-6">
        <span className="text-xs font-medium text-[#AFAFAF] sm:text-sm">
          {rank}
        </span>
      </div>

      {/* Avatar */}
      <div className="overflow-hidden w-[100px] h-[100px] h-[120px] h-[140px] h-[150px] rounded-full sm:w-[120px] md:w-[140px] lg:w-[150px]">
        <img
          src={avatar}
          alt={name}
          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Name */}
      <h3 className="mt-4 text-xl font-bold text-center text-white sm:mt-5 md:text-2xl">
        {name}
      </h3>

      {/* Total Sales */}
      <p className="mt-2 text-xs text-center sm:text-sm md:text-base">
        <span className="text-[#AFAFAF]">
          Total Sales:{" "}
        </span>

        <span className="text-white">
          34.53 ETH
        </span>
      </p>

    </div>
  );
};

/* =========================================================
   CATEGORY CARD
========================================================= */

const CategoryCard = ({
  name,
  image,
}) => {
  return (
    <div className="overflow-hidden rounded-2xl cursor-pointer group">

      {/* Image */}
      <div className="overflow-hidden relative w-full aspect-square">
        <img
          src={image}
          alt={name}
          className="object-cover h-full w-full transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>

      {/* Title */}
      <div className="flex items-center px-4 py-5 min-h-[80px] bg-[#1e1b1b] sm:px-6">
        <h3 className="text-base font-bold text-white sm:text-lg md:text-xl lg:text-2xl">
          {name}
        </h3>
      </div>

    </div>
  );
};

/* =========================================================
   DISCOVER MORE NFT CARD
========================================================= */

const NFTCard = ({
  title,
  creator,
  price,
  highestBid,
  image,
  avatar,
}) => {
  return (
    <div className="overflow-hidden bg-[#242222] rounded-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl group">

      {/* Artwork - NO CROP */}
      <img
        src={image}
        alt={title}
        className="object-contain block w-full h-auto"
      />

      {/* Information */}
      <div className="px-5 pt-5 pb-6 sm:px-6">

        <h3 className="text-xl font-bold text-white sm:text-2xl">
          {title}
        </h3>

        {/* Creator */}
        <div className="flex items-center gap-2 mt-3">

          <img
            src={avatar}
            alt={creator}
            className="object-cover w-7 h-7 h-8 rounded-full shrink-0 sm:w-8"
          />

          <span className="text-sm text-gray-300 sm:text-base">
            {creator}
          </span>

        </div>

        {/* Price / Bid */}
        <div className="flex items-center justify-between gap-4 mt-6">

          <div className="min-w-0">

            <p className="text-xs text-gray-400 sm:text-sm">
              Price
            </p>

            <p className="mt-1 text-sm font-medium text-white sm:text-base">
              {price}
            </p>

          </div>

          <div className="min-w-0 text-right">

            <p className="text-xs text-gray-400 sm:text-sm">
              Highest Bid
            </p>

            <p className="mt-1 text-sm font-medium text-white sm:text-base">
              {highestBid}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

/* =========================================================
   MAGIC MUSHROOMS AUCTION
========================================================= */

/* =========================================================
   MAGIC MUSHROOMS AUCTION
========================================================= */

const MagicMushroomsAuction = () => {
  return (
    <Reveal>
    <section className="overflow-hidden w-full bg-black">

      <div className="relative w-full">

        {/* =================================================
            MAGIC MUSHROOM IMAGE
        ================================================= */}

        <img
          src={magicMushroomsImage}
          alt="Magic Mushrooms"
          className="object-cover object-center block w-full h-[500px] sm:h-[560px] md:h-[620px] lg:h-[700px] xl:h-[760px]"
        />

        {/* =================================================
            PURPLE GRADIENT
        ================================================= */}

        <div
          className="z-[1] absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(162, 89, 255, 0) 0%, #A259FF 100%)",
          }}
        />

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="z-10 absolute inset-0">

          <div
            className="relative mx-auto px-5 h-full max-w-[1400px] sm:px-8 lg:px-10"
          >

            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <div
              className="absolute left-5 bottom-8 bottom-10 bottom-12 bottom-14 bottom-16 flex flex-col items-start sm:left-8 md:left-10 lg:left-10 xl:left-0"
            >

              {/* Creator Pill */}

              <div
                className="flex items-center gap-2 px-3 py-2 bg-[#000000] rounded-full backdrop-blur-sm sm:px-4"
              >

                <img
                  src={shroomieAuctionAvatar}
                  alt="Shroomie"
                  className="object-cover w-7 h-7 h-8 rounded-full shrink-0 sm:w-8"
                />

                <span
                  className="text-sm font-medium text-white sm:text-base"
                >
                  Shroomie
                </span>

              </div>

              {/* =================================================
                  TITLE
              ================================================= */}

              <h1
                className="mt-5 text-4xl leading-[1.05] font-bold text-white whitespace-nowrap sm:text-5xl md:text-6xl lg:text-[64px]"
              >
                Magic Mushrooms
              </h1>

              {/* =================================================
                  SEE NFT BUTTON
              ================================================= */}

              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 mt-6 w-[180px] h-[60px] text-[#1A1A1A] text-base font-bold bg-white rounded-[20px] transition-all duration-300 hover:bg-gray-100 hover:scale-[1.02]"
              >

                <Eye
                  className="w-5 h-5 text-[#A259FF]"
                />

                See NFT

              </button>

            </div>

            {/* =================================================
                AUCTION CARD
            ================================================= */}

            <div
              className="absolute right-5 bottom-8 bottom-10 bottom-12 bottom-14 bottom-16 sm:right-8 md:right-10 lg:right-10 xl:right-0"
            >

              <div
                className="px-6 py-6 w-[300px] bg-[#323131] rounded-[20px] shadow-xl backdrop-blur-md sm:w-[320px] md:w-[340px] lg:w-[350px]"
              >

                {/* Auction Heading */}

                <p
                  className="text-xs text-white font-normal sm:text-sm"
                >
                  Auction ends in:
                </p>

                {/* =================================================
                    COUNTDOWN
                ================================================= */}

                <div
                  className="flex items-start justify-between mt-3"
                >

                  {auctionTime.map((item, index) => (
                    <React.Fragment key={item.label}>

                      {/* Number + Label */}

                      <div className="flex flex-col items-start">

                        <span
                          className="text-3xl leading-none font-bold text-white tabular-nums sm:text-4xl md:text-[44px]"
                        >
                          {item.value}
                        </span>

                        <span
                          className="mt-2 text-[11px] text-white sm:text-xs"
                        >
                          {item.label}
                        </span>

                      </div>

                      {/* Colon */}

                      {index < auctionTime.length - 1 && (
                        <span
                          className="px-1 text-3xl leading-none font-bold text-white text-4xl sm:px-2 md:text-[44px]"
                        >
                          :
                        </span>
                      )}

                    </React.Fragment>
                  ))}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
    </Reveal>
  );
};

/* =========================================================
   HOW IT WORKS CARD
========================================================= */

const HowItWorksCard = ({ image, title, description }) => {
  return (
    <div
      className="flex flex-col items-center px-5 py-7 py-8 h-full text-center bg-[#272525] rounded-[20px] transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-xl sm:px-8 md:py-9"
    >
      <img
        src={image}
        alt={title}
        className="object-contain w-36 h-auto shrink-0 sm:w-40 md:w-44 lg:w-48"
      />

      <h3
        className="mt-6 text-xl font-bold text-white text-2xl sm:mt-7"
      >
        {title}
      </h3>

      <p
        className="mt-3 max-w-xs text-sm leading-relaxed text-gray-300 sm:text-base"
      >
        {description}
      </p>
    </div>
  );
};

/* =========================================================
   HOW IT WORKS SECTION
========================================================= */

const HowItWorks = () => {
  return (
    <Reveal>
    <section className="overflow-hidden w-full bg-[#000000]">
      <div
        className="mx-auto px-4 py-14 max-w-[1400px] sm:px-6 md:py-20 lg:px-10"
      >
        {/* Header */}
        <div className="text-left">
         <h2
  className="text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_10%,#4DA6FF_50%)] bg-clip-text sm:text-4xl md:text-[40px]"
>
  How It Works
</h2>

          <p
            className="mt-3 text-lg font-normal text-gray-300 sm:text-xl md:text-[26px]"
          >
            Find Out How To Get Started
          </p>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 items-stretch gap-6 gap-8 mt-10 mt-14 sm:gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {steps.map((step) => (
            <HowItWorksCard
              key={step.title}
              {...step}
            />
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  );
};

/* =========================================================
   WEEKLY DIGEST
========================================================= */

const WeeklyDigest = () => {
  return (
    <section className="overflow-hidden w-full bg-[#000000]">
      <div
        className="mx-auto px-4 py-14 max-w-[1400px] sm:px-6 md:py-20 lg:px-10"
      >
        {/* =================================================
            MAIN CARD
        ================================================= */}

        <div
          className="flex-row items-center gap-8 gap-12 px-5 py-8 py-10 px-8 px-12 py-12 bg-[#302e2e] rounded-[24px] /* ========================= TABLET */ LAPTOP - KEEP ORIGINAL sm:px-8 md:flex lg:flex-row"
        >
          {/* =================================================
              LEFT IMAGE
          ================================================= */}

          <div
            className="w-full shrink-0 /* ========================= TABLET */ LAPTOP - ORIGINAL md:w-[46%] lg:w-[48%] xl:w-[530px]"
          >
            <img
              src={astronautImage}
              alt="Astronaut reading a newspaper"
              className="object-cover block h-[260px] w-full rounded-[20px] /* ========================= TABLET */ LAPTOP - ORIGINAL sm:h-[320px] md:h-[300px] lg:h-[390px]"
            />
          </div>

          {/* =================================================
              RIGHT CONTENT
          ================================================= */}

          <div
            className="flex flex-col items-center justify-center mt-8 mt-0 w-full w-[54%] text-center text-left /* ========================= TABLET */ LAPTOP - ORIGINAL md:items-start lg:items-start"
          >
            {/* =================================================
                HEADING
            ================================================= */}

           <h2
  className="text-3xl font-bold leading-[1.4] text-transparent bg-[linear-gradient(90deg,#F7C6E7_10%,#A259FF_30%,#4DA6FF_100%)] bg-clip-text sm:text-4xl md:text-[30px] lg:text-[46px]"
>
  Join Our Weekly
  <br />
  Digest
</h2>
            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <p
              className="mt-5 max-w-md text-base leading-relaxed text-gray-300 leading-[1.5] /* ========================= TABLET */ LAPTOP - ORIGINAL sm:text-lg md:text-[17px] lg:text-[24px]"
            >
              Get Exclusive Promotions &amp; Updates
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Straight To Your Inbox.
            </p>

            {/* =================================================
                SUBSCRIPTION FORM
            ================================================= */}

           <form
  className="flex flex-row gap-0 mt-7 w-full max-w-[560px] h-[76px]"
>
  {/* EMAIL INPUT */}
  <input
    type="email"
    placeholder="Enter your email here"
    className="px-6 placeholder-[#2B2B2B] h-full w-full min-w-0 text-[20px] text-[#2B2B2B] bg-white rounded-[20px] outline-none lg:rounded-r-[20px]"
  />

  {/* SUBSCRIBE BUTTON */}
  <button
    type="submit"
    className="z-10 flex items-center justify-center gap-3 h-full w-[190px] text-[20px] font-bold text-white bg-[#A259FF] rounded-[20px] transition-all duration-300 cursor-pointer -ml-[40px] shrink-0 hover:bg-[#9147E6] hover:scale-[1.02]"
  >
    <Mail className="h-7 w-7" />
    Subscribe
  </button>
</form>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   HERO
========================================================= */

const Hero = () => {
   const navigate = useNavigate();
  return (
    <>
      {/* ===================================================
          HERO SECTION
      =================================================== */}

      <Reveal>
      <section className="overflow-hidden w-full bg-[#000000]">

        <div className="px-4 py-16 mx-auto py-28 max-w-[1300px] sm:px-6 md:py-20 lg:px-10">

          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row">

            {/* LEFT CONTENT */}
            <div className="flex flex-col items-center w-full w-1/2 text-center text-left lg:items-start">

             <h1 className="max-w-xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
  Discover
  <br />
  Digital Art &amp;
  <br />
  <span className="text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#FFFFFF_5%,#A259FF_50%)] bg-clip-text">
    Collect NFTs
  </span>
</h1>

              <p className="mt-6 max-w-md text-base leading-relaxed text-gray-300 md:text-lg">
                NFT Marketplace UI Created With Anima For
                Figma. Collect, Buy And Sell Art From More
                Than 20k NFT Artists.
              </p>

              {/* Get Started */}
              <button
  type="button"
  onClick={() => navigate("/create-account")}
  className="inline-flex items-center gap-2 px-7 py-3.5 mt-8 text-base font-semibold text-white bg-[#6922c6] rounded-full transition-all duration-300 cursor-pointer hover:opacity-90 hover:-translate-y-1"
>
  <Rocket className="w-5 h-5" />
  Get Started
</button>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-5 mt-12 w-full max-w-md sm:gap-10">

                {STATS.map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center lg:text-left"
                  >

                    <p
  className="text-[30px] font-bold text-transparent bg-[linear-gradient(90deg,#00D9FF_10%,#087CFF_20%,#8B2CFF_70%,#F000FF_100%)] bg-clip-text sm:text-[35px]"
>
  {stat.value}
</p>
                   <p className="mt-1 text-sm text-[#d5bc57] sm:text-base">
  {stat.label}
</p>
                  </div>
                ))}

              </div>

            </div>

            {/* RIGHT NFT CARD */}
            <div className="flex justify-center w-full w-1/2 hero-card-scene lg:justify-end">

              <div className="overflow-hidden w-[280px] bg-[#242323] rounded-2xl shadow-2xl hero-float sm:w-[340px] md:w-[480px]">

                <div className="overflow-hidden w-full rounded-t-2xl aspect-square">

                  <img
                    src={nftArtwork}
                    alt="Space Walking NFT artwork"
                    className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                  />

                </div>

                <div className="flex items-center gap-3 px-5 py-4">

                  <img
                    src={animakidAvatar}
                    alt="animakid avatar"
                    className="object-cover w-9 h-9 rounded-full shrink-0"
                  />

                  <div>

                    <p className="text-sm font-semibold text-white">
                      animakid
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      Total Sales:{" "}
                      <span className="text-gray-300">
                        34.53 ETH
                      </span>
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
      </Reveal>

      {/* ===================================================
          TRENDING COLLECTION
      =================================================== */}

      <Reveal>
      <section className="w-full bg-[#000000]">

        <div className="px-4 py-14 mx-auto max-w-[1400px] sm:px-6 md:py-20 lg:px-10">

          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-[40px]">
            Trending Collection
          </h2>

          <p className="mt-3 text-base text-gray-300 sm:text-lg md:text-2xl">
            Checkout Our Weekly Updated Trending Collection.
          </p>

          <div className="grid grid-cols-1 gap-10 mt-14 md:grid-cols-2 lg:grid-cols-3">

            {collections.map((collection) => (
              <CollectionCard
                key={collection.title}
                {...collection}
              />
            ))}

          </div>

        </div>

      </section>
      </Reveal>

      {/* ===================================================
          TOP CREATORS
      =================================================== */}

      <Reveal>
      <section className="w-full bg-[#000000]">

        <div className="px-4 py-14 mx-auto max-w-[1400px] sm:px-6 md:py-20 lg:px-10">

          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

            <div className="min-w-0">

             <h2
  className="text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#F7C6E7_0%,#A259FF_10%,#4DA6FF_80%)] bg-clip-text sm:text-4xl md:text-[40px]"
>
  Top Creators
</h2>
              <p className="mt-3 text-base font-normal text-gray-300 sm:text-lg md:text-2xl">
                Checkout Top Rated Creators On The NFT Marketplace
              </p>

            </div>

           <button
      type="button"
      onClick={() => navigate("/ranking-page")}
      className="inline-flex items-center justify-center self-start gap-2 px-6 w-[247px] h-[60px] text-base font-semibold text-white bg-transparent rounded-[20px] border-2 border-[#A259FF] transition-all duration-300 cursor-pointer shrink-0 hover:bg-[#A259FF]/10 hover:-translate-y-1 md:self-center"
    >
      <Rocket className="w-5 h-5 text-[#A259FF]" />

      View Rankings
    </button>

          </div>

          <div className="grid grid-cols-1 gap-7 mt-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">

            {creators.map((creator) => (
              <CreatorCard
                key={creator.rank}
                {...creator}
              />
            ))}

          </div>

        </div>

      </section>
      </Reveal>

      {/* ===================================================
          BROWSE CATEGORIES
      =================================================== */}

      <Reveal>
      <section className="w-full bg-[#000000]">

        <div className="px-4 py-14 mx-auto max-w-[1400px] sm:px-6 md:py-20 lg:px-10">

          <h2 className="text-3xl font-bold text-left text-white sm:text-4xl md:text-[40px]">
            Browse Categories
          </h2>

          <div className="grid grid-cols-2 gap-4 mt-10 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">

            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                {...category}
              />
            ))}

          </div>

        </div>

      </section>
      </Reveal>

      {/* ===================================================
          DISCOVER MORE NFTS
      =================================================== */}

      <Reveal>
      <section className="w-full bg-[#000000]">

        <div className="px-4 py-14 mx-auto max-w-[1400px] sm:px-6 md:py-20 lg:px-10">

          {/* Header */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

            <div>

              <h2
  className="text-3xl font-bold text-transparent bg-[linear-gradient(90deg,#F7C6E7_10%,#A259FF_30%,#4DA6FF_100%)] bg-clip-text sm:text-4xl md:text-[40px]"
>
  Discover More NFTs
</h2>

              <p className="mt-3 text-base font-normal text-gray-300 sm:text-lg md:text-2xl">
                Explore New Trending NFTs
              </p>

            </div>

            {/* See All */}
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 px-6 w-full h-[50px] h-[60px] text-base font-semibold text-white bg-transparent rounded-[24px] border-2 border-[#A259FF] transition-all duration-300 cursor-pointer hover:bg-[#A259FF]/10 hover:-translate-y-1 shrink-0 md:w-[180px]"
            >

              <Eye className="w-5 h-5 text-[#A259FF]" />

              See All

            </button>

          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 gap-6 gap-8 mt-10 mt-14 md:grid-cols-2 lg:grid-cols-3">

            {nfts.map((nft) => (
              <NFTCard
                key={nft.title}
                {...nft}
              />
            ))}

          </div>

        </div>

      </section>
      </Reveal>

      {/* ===================================================
          MAGIC MUSHROOMS AUCTION
      =================================================== */}

      <MagicMushroomsAuction />

      {/* ===================================================
          HOW IT WORKS
      =================================================== */}

      <HowItWorks />

      {/* ===================================================
          WEEKLY DIGEST
      =================================================== */}

      <WeeklyDigest />

      {/* ===================================================
          HERO CARD ANIMATION
      =================================================== */}

      <style>{`
        /* =====================================================
           SCROLL REVEAL
           Animation only — does not change section dimensions.
        ===================================================== */

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .reveal-show {
          opacity: 1;
          transform: translateY(0);
        }

        /* =====================================================
           GENERAL INTERACTIVE CURSOR / MICRO ANIMATION
        ===================================================== */

        button,
        a,
        [role="button"] {
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        /* =====================================================
           CARD HOVER
        ===================================================== */

        .group {
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        .group:hover {
          transform: translateY(-4px);
        }

        /* =====================================================
           HERO CARD
        ===================================================== */

        .hero-float:hover {
          box-shadow:
            0 25px 60px rgba(162, 89, 255, 0.18),
            0 0 30px rgba(162, 89, 255, 0.08);
        }

        /* =====================================================
           BUTTON PRESS
        ===================================================== */

        button {
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            background-color 0.25s ease,
            opacity 0.25s ease;
        }

        button:active {
          transform: scale(0.97);
        }

        /* =====================================================
           REDUCED MOTION
        ===================================================== */

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* =====================================================
           MOBILE REVEAL
        ===================================================== */

        @media (max-width: 767px) {
          .reveal {
            transform: translateY(22px);
          }
        }


        .hero-card-scene {
          perspective: 1200px;
        }

        .hero-float {
          transform-style: preserve-3d;
          transform-origin: center;
          animation: hero-float 8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes hero-float {

          0% {
            transform:
              rotateY(8deg)
              rotateX(1deg)
              translateY(0px);
          }

          20% {
            transform:
              rotateY(-10deg)
              rotateX(-1.5deg)
              translateY(8px);
          }

          50% {
            transform:
              rotateY(0deg)
              rotateX(0deg)
              translateY(-6px);
          }

          75% {
            transform:
              rotateY(10deg)
              rotateX(1.5deg)
              translateY(6px);
          }

          100% {
            transform:
              rotateY(8deg)
              rotateX(1deg)
              translateY(0px);
          }

        }

        @media (max-width: 767px) {

          .hero-card-scene {
            perspective: 900px;
          }

          .hero-float {
            animation-name: hero-float-mobile;
          }

          @keyframes hero-float-mobile {

            0% {
              transform:
                rotateY(4deg)
                translateY(0px);
            }

            20% {
              transform:
                rotateY(-5deg)
                translateY(4px);
            }

            50% {
              transform:
                rotateY(0deg)
                translateY(-3px);
            }

            75% {
              transform:
                rotateY(5deg)
                translateY(3px);
            }

            100% {
              transform:
                rotateY(4deg)
                translateY(0px);
            }

          }

        }

        @media (prefers-reduced-motion: reduce) {

          .hero-float {
            animation: none;
          }

        }

      `}</style>

    </>
  );
};

export default Hero;