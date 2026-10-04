import React from 'react';
import { Globe2, Layers, PackageCheck, Compass, ShieldCheck, Boxes, ArrowRight } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface AboutAndOriginSectionProps {
  onExploreProducts: () => void;
}

const WHY_CARDS = [
  {
    num: '01',
    title: 'DIVERSE PRODUCT RANGE',
    description:
      'Comprehensive single-source portfolio covering 85+ specifications across whole spices, ground powders, chilli flakes, oilseeds, and botanical herbs.',
    icon: Boxes,
  },
  {
    num: '02',
    title: 'MULTIPLE GRADES & SPECIFICATIONS',
    description:
      'From Singapore 99.5% and Europe-grade Cumin to Eagle/Parrot Coriander, 2%–3% Curcumin Turmeric, and 30K–50K+ SHU / 100–180+ ASTA Chillies.',
    icon: Layers,
  },
  {
    num: '03',
    title: 'BULK B2B SUPPLY',
    description:
      'Structured specifically for wholesale importers, spice processors, food manufacturers, and bulk trade with a 500 Kg – 1 Ton minimum order quantity.',
    icon: ShieldCheck,
  },
  {
    num: '04',
    title: 'CUSTOMIZED PACKAGING',
    description:
      'Available in 15 Kg, 25 Kg, 40 Kg, and 50 Kg PP Bags, with customized packing configurations arranged according to buyer requirement.',
    icon: PackageCheck,
  },
  {
    num: '05',
    title: 'PRODUCT-FOCUSED SOURCING',
    description:
      'Direct focus on physical purity, seed grading, sortex cleaning, grinding suitability, and botanical integrity for Indian-origin agricultural commodities.',
    icon: Compass,
  },
  {
    num: '06',
    title: 'GLOBAL B2B APPROACH',
    description:
      'Clear specification confirmation, transparent commercial terms, and structured quotation workflows built for domestic and international bulk buyers.',
    icon: Globe2,
  },
];

export const AboutAndOriginSection: React.FC<AboutAndOriginSectionProps> = ({
  onExploreProducts,
}) => {
  return (
    <div className="space-y-24">
      {/* SECTION 8: ABOUT SECTION */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-mono tracking-widest text-[#F50008]">
              01 · ABOUT AKSHAT GLOBAL TRADES
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.12]">
              FROM INDIAN ORIGIN TO GLOBAL DEMAND
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
              Akshat Global Trades focuses on sourcing and supplying Indian spices, seeds, powders, herbs and superfoods for bulk B2B requirements. Our product range covers multiple grades and specifications to support different market and processing requirements.
            </p>

            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/10">
              <div className="pt-4">
                <p className="text-xs font-mono text-neutral-400">PRODUCT GROUPS</p>
                <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                  08 Categories
                </p>
              </div>
              <div className="pt-4">
                <p className="text-xs font-mono text-neutral-400">CATALOGUE GRADES</p>
                <p className="text-2xl font-bold font-mono text-white mt-1 tabular-nums">
                  85 Specs
                </p>
              </div>
              <div className="pt-4 col-span-2 sm:col-span-1">
                <p className="text-xs font-mono text-neutral-400">MINIMUM ORDER</p>
                <p className="text-2xl font-bold font-mono text-[#F50008] mt-1 tabular-nums">
                  500 Kg–1T
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onExploreProducts}
                className="px-6 py-3 text-xs font-semibold tracking-wider text-white bg-[#2A2A2A] hover:bg-[#F50008] border border-white/15 hover:border-[#F50008] rounded-lg transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE PRODUCT SPECIFICATIONS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right 3D Visual Diagram: India Map -> Spice Products -> World Globe */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/10">
                <BrandLogo size="sm" />
                <span className="text-xs font-mono text-neutral-400">
                  B2B COMMODITY SUPPLY ARCHITECTURE
                </span>
              </div>

              {/* 3-Stage 3D Spatial Pipeline: India Origin -> Multi-Grade Spices -> Global B2B Supply */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch relative">
                {/* Stage 1: Indian Origin */}
                <div className="bg-[#1B1B1B] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#F50008]/50 transition-colors">
                  <div>
                    <span className="text-[11px] font-mono text-[#F50008]">STAGE 01</span>
                    <h3 className="text-base font-bold text-white mt-1">Indian Origin</h3>
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                      Agricultural sourcing of whole spices, oilseeds, and botanicals from India.
                    </p>
                  </div>

                  {/* Stylized Vector India Subcontinent Outline */}
                  <div className="my-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 120 130"
                      className="w-24 h-24 text-[#F50008]"
                      fill="none"
                      aria-label="Indian Origin Map Vector"
                    >
                      <path
                        d="M52 12 L68 18 L64 32 L78 42 L98 40 L92 56 L78 62 L72 82 L58 118 L46 92 L36 68 L22 56 L32 42 L44 34 Z"
                        fill="rgba(245,0,8,0.14)"
                        stroke="#F50008"
                        strokeWidth="2"
                      />
                      <circle cx="56" cy="62" r="4.5" fill="#FFFFFF" />
                      <circle
                        cx="56"
                        cy="62"
                        r="11"
                        stroke="#F50008"
                        strokeWidth="1.2"
                        strokeDasharray="3 2"
                      />
                    </svg>
                  </div>

                  <div className="text-[11px] font-mono text-neutral-300 border-t border-white/10 pt-2.5">
                    Origin: India
                  </div>
                </div>

                {/* Stage 2: Multi-Grade Spice Products */}
                <div className="bg-[#1B1B1B] border border-[#F50008]/40 rounded-xl p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(245,0,8,0.12)]">
                  <div>
                    <span className="text-[11px] font-mono text-[#F50008]">STAGE 02</span>
                    <h3 className="text-base font-bold text-white mt-1">Grade & Spec Alignment</h3>
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                      Whole, split, sortex, ground, and organic grades packed for bulk trade.
                    </p>
                  </div>

                  <div className="my-4 space-y-1.5 text-xs font-mono">
                    <div className="px-2.5 py-1.5 rounded bg-[#252525] text-neutral-200 flex justify-between">
                      <span>Spices & Seeds</span>
                      <span className="text-[#F50008]">Whole</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded bg-[#252525] text-neutral-200 flex justify-between">
                      <span>Powders & Flakes</span>
                      <span className="text-[#F50008]">Ground</span>
                    </div>
                    <div className="px-2.5 py-1.5 rounded bg-[#252525] text-neutral-200 flex justify-between">
                      <span>Superfoods & Herbs</span>
                      <span className="text-[#F50008]">Botanical</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-neutral-300 border-t border-white/10 pt-2.5">
                    15 / 25 / 40 / 50 Kg PP
                  </div>
                </div>

                {/* Stage 3: World Globe / Bulk Demand */}
                <div className="bg-[#1B1B1B] border border-white/10 rounded-xl p-5 flex flex-col justify-between hover:border-[#F50008]/50 transition-colors">
                  <div>
                    <span className="text-[11px] font-mono text-[#F50008]">STAGE 03</span>
                    <h3 className="text-base font-bold text-white mt-1">Global B2B Supply</h3>
                    <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                      Structured for importers, wholesalers, processors, and bulk buyers.
                    </p>
                  </div>

                  <div className="my-4 flex items-center justify-center">
                    <svg
                      viewBox="0 0 120 120"
                      className="w-24 h-24"
                      fill="none"
                      aria-label="Global B2B Trade Vector"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="44"
                        fill="rgba(255,255,255,0.03)"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1.5"
                      />
                      <ellipse
                        cx="60"
                        cy="60"
                        rx="22"
                        ry="44"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                      />
                      <line
                        x1="16"
                        y1="60"
                        x2="104"
                        y2="60"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M68 48 Q45 25 28 45"
                        stroke="#F50008"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M68 48 Q88 30 96 58"
                        stroke="#F50008"
                        strokeWidth="2"
                        fill="none"
                      />
                      <circle cx="68" cy="48" r="4" fill="#F50008" />
                    </svg>
                  </div>

                  <div className="text-[11px] font-mono text-neutral-300 border-t border-white/10 pt-2.5">
                    MOQ: 500 Kg – 1 Ton
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 24: WHY AKSHAT GLOBAL TRADES */}
      <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
            B2B SOURCING ADVANTAGE
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            WHY AKSHAT GLOBAL TRADES
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.num}
                className="glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-[#F50008] tabular-nums">
                      {card.num}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
