import React from 'react';
import { ArrowRight, Boxes, PackageCheck, Sliders, Layers, Scale } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { ThreeHeroScene } from './ThreeHeroScene';
import { CATEGORY_IMAGES } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface HeroAndTrustStripProps {
  reducedMotion: boolean;
  onExploreProducts: () => void;
  onRequestQuote: () => void;
}

const TRUST_STRIP_ITEMS = [
  { label: 'BULK B2B SUPPLY', icon: Boxes },
  { label: 'CUSTOMIZED PACKAGING', icon: PackageCheck },
  { label: 'MULTIPLE GRADES', icon: Sliders },
  { label: 'WHOLE & GROUND PRODUCTS', icon: Layers },
  { label: '500 KG – 1 TON MOQ', icon: Scale },
];

export const HeroAndTrustStrip: React.FC<HeroAndTrustStripProps> = ({
  reducedMotion,
  onExploreProducts,
  onRequestQuote,
}) => {
  return (
    <div>
      {/* SECTION 6: CINEMATIC FULL-SCREEN 3D HERO */}
      <section className="relative min-h-[calc(100vh-5rem)] flex items-center bg-[#202020] overflow-hidden border-b border-white/10">
        {/* 3D WebGL Spice & World Globe Canvas */}
        <ThreeHeroScene reducedMotion={reducedMotion} />

        {/* Subtle radial red ambient light & dark contrast scrim */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          style={{
            background:
              'radial-gradient(circle at 72% 45%, rgba(245,0,8,0.14) 0%, rgba(32,32,32,0.5) 45%, rgba(32,32,32,0.92) 100%)',
          }}
        />

        {/* Semantic DOM Content Layer */}
        <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Brand Logo, Headline, Supporting Copy, CTAs */}
            <div className="lg:col-span-7 space-y-7">
              {/* Official Brand Logo */}
              <div className="inline-block p-3.5 rounded-xl bg-[#1A1A1A]/85 backdrop-blur-md border border-white/10 shadow-xl">
                <BrandLogo size="lg" />
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05]">
                INDIAN SPICES.
                <br />
                <span className="text-white">GLOBAL </span>
                <span className="text-[#F50008]">STANDARDS.</span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-xl text-neutral-200 max-w-2xl leading-relaxed font-normal">
                Premium Indian spices, seeds, powders, herbs and superfoods supplied for bulk B2B requirements.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={onExploreProducts}
                  className="px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg shadow-[0_0_30px_rgba(245,0,8,0.4)] hover:shadow-[0_0_40px_rgba(245,0,8,0.6)] transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <span>EXPLORE PRODUCTS</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onRequestQuote}
                  className="px-8 py-4 text-xs sm:text-sm font-semibold tracking-wider text-white bg-[#282828]/90 hover:bg-[#323232] border border-white/20 hover:border-[#F50008] rounded-lg backdrop-blur-md transition-all inline-flex items-center justify-center cursor-pointer"
                >
                  REQUEST A QUOTE
                </button>
              </div>

              {/* Below Buttons Line */}
              <div className="pt-2">
                <p className="text-xs sm:text-sm font-mono text-neutral-300 tracking-wide">
                  Bulk Supply • Customized Packaging • B2B Trade
                </p>
              </div>
            </div>

            {/* Right Column: Floating 3D Glass Commodity Showcase Card over 3D Globe */}
            <div className="lg:col-span-5">
              <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div>
                    <span className="text-[11px] font-mono text-[#F50008] block">
                      INDIAN-ORIGIN COMMODITIES
                    </span>
                    <h2 className="text-base font-bold text-white">
                      Whole Spices · Powders · Seeds · Herbs
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-neutral-300 tabular-nums">
                    85 Grades
                  </span>
                </div>

                {/* 2x2 Floating Product Visual Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={onExploreProducts}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 cursor-pointer"
                  >
                    <ResilientImage
                      src={CATEGORY_IMAGES.cumin}
                      alt="Indian Cumin / Jeera Bulk Supply"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-xs font-bold text-white">Cumin / Jeera</p>
                      <p className="text-[10px] font-mono text-neutral-300">
                        Singapore 99.5% · Europe · PR
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={onExploreProducts}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 cursor-pointer"
                  >
                    <ResilientImage
                      src={CATEGORY_IMAGES.chilli}
                      alt="Indian Whole Chilli, Powder & Flakes"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-xs font-bold text-white">Chilli & Flakes</p>
                      <p className="text-[10px] font-mono text-neutral-300">
                        Teja S17 · 30K–50K+ SHU
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={onExploreProducts}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 cursor-pointer"
                  >
                    <ResilientImage
                      src={CATEGORY_IMAGES.turmeric}
                      alt="Indian Turmeric / Haldi 2% to 3% Curcumin"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-xs font-bold text-white">Turmeric / Haldi</p>
                      <p className="text-[10px] font-mono text-neutral-300">
                        2% · 2.5% · 3% Curcumin
                      </p>
                    </div>
                  </div>

                  <div
                    onClick={onExploreProducts}
                    className="group relative rounded-xl overflow-hidden aspect-[4/3] border border-white/10 cursor-pointer"
                  >
                    <ResilientImage
                      src={CATEGORY_IMAGES.fennel}
                      alt="Indian Fennel / Saunf & Coriander"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <p className="text-xs font-bold text-white">Fennel & Coriander</p>
                      <p className="text-[10px] font-mono text-neutral-300">
                        Europe Green · Eagle Sortex
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-neutral-300 font-mono">
                  <span>MOQ: 500 KG – 1 TON</span>
                  <span className="text-[#F50008]">15 / 25 / 40 / 50 KG PP BAGS</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PREMIUM HORIZONTAL TRUST STRIP */}
      <section className="bg-[#1B1B1B] border-b border-white/10">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x lg:divide-white/10">
            {TRUST_STRIP_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center justify-start lg:justify-center gap-3 px-3 py-1.5 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#262626] border border-white/10 group-hover:border-[#F50008] flex items-center justify-center shrink-0 transition-colors">
                    <Icon className="w-4 h-4 text-[#F50008]" />
                  </div>
                  <span className="text-xs font-mono font-semibold tracking-wider text-white whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
