import React, { useState } from 'react';
import {
  ClipboardList,
  CheckSquare,
  FileSpreadsheet,
  Package,
  Truck,
  ArrowRight,
  Sliders,
} from 'lucide-react';
import { SPECIFICATION_CARDS, SpecificationCardData } from '../data/products';
import { ThreeBulkWarehouseScene } from './ThreeBulkWarehouseScene';
import { ThreeGlobalTradeGlobe } from './ThreeGlobalTradeGlobe';

interface SpecificationsAndBulkSectionProps {
  reducedMotion: boolean;
  onOpenQuoteModal: (productName?: string, specification?: string) => void;
  showSpecs?: boolean;
  showBulk?: boolean;
  showGlobalTrade?: boolean;
  showProcess?: boolean;
}

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'PRODUCT REQUIREMENT',
    description:
      'Submit your target Indian spice, seed, powder, or botanical product along with required order volume.',
    icon: ClipboardList,
  },
  {
    step: '02',
    title: 'SPECIFICATION CONFIRMATION',
    description:
      'Align on the exact grade, purity percentage, Curcumin content, SHU/ASTA parameters, or organic specification.',
    icon: CheckSquare,
  },
  {
    step: '03',
    title: 'QUOTATION',
    description:
      'Receive a structured commercial B2B quotation based on confirmed product grade, quantity, and packaging.',
    icon: FileSpreadsheet,
  },
  {
    step: '04',
    title: 'ORDER & PACKAGING',
    description:
      'Order processing and bulk packing in 15 Kg, 25 Kg, 40 Kg, or 50 Kg PP Bags, or customized buyer packaging.',
    icon: Package,
  },
  {
    step: '05',
    title: 'DISPATCH / LOGISTICS',
    description:
      'Coordinated bulk dispatch and logistics handover structured for domestic or international B2B trade.',
    icon: Truck,
  },
];

const BAG_SIZES: ('15 KG' | '25 KG' | '40 KG' | '50 KG')[] = ['15 KG', '25 KG', '40 KG', '50 KG'];

export const SpecificationsAndBulkSection: React.FC<SpecificationsAndBulkSectionProps> = ({
  reducedMotion,
  onOpenQuoteModal,
  showSpecs = true,
  showBulk = true,
  showGlobalTrade = true,
  showProcess = true,
}) => {
  const [activeSpec, setActiveSpec] = useState<SpecificationCardData>(SPECIFICATION_CARDS[0]);
  const [selectedBagSize, setSelectedBagSize] = useState<'15 KG' | '25 KG' | '40 KG' | '50 KG'>('25 KG');

  return (
    <div className="space-y-24">
      {/* SECTION 20: QUALITY & SPECIFICATIONS */}
      {showSpecs && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
                03 · TECHNICAL GRADING PARAMETERS
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                SPECIFICATIONS FOR DIFFERENT MARKET REQUIREMENTS
              </h2>
              <p className="text-base text-neutral-300 mt-3 max-w-3xl">
                Specifications vary by product and buyer requirement. Select any parameter below to inspect how grades are categorized across our B2B product catalogue.
              </p>
            </div>
          </div>

          {/* Interactive 9-Card Grid + Active Specification Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 9 Specification Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {SPECIFICATION_CARDS.map((spec) => {
                const isActive = activeSpec.id === spec.id;
                return (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => setActiveSpec(spec)}
                    className={`text-left p-5 rounded-xl border transition-all duration-150 flex flex-col justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#2A2A2A] border-[#F50008] shadow-[0_10px_28px_rgba(245,0,8,0.2)] -translate-y-0.5'
                        : 'bg-[#1F1F1F] border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-base font-bold text-white">{spec.title}</span>
                        <Sliders
                          className={`w-4 h-4 ${
                            isActive ? 'text-[#F50008]' : 'text-neutral-500'
                          }`}
                        />
                      </div>
                      <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                        {spec.summary}
                      </p>
                    </div>

                    <div className="mt-4 pt-2.5 border-t border-white/10 text-[11px] font-mono text-neutral-300 truncate">
                      {spec.metricTag}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Specification Detail Panel */}
            <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 border border-white/15">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono text-[#F50008]">
                    PARAMETER SPECIFICATION BRIEF
                  </span>
                  <h3 className="text-2xl font-bold text-white mt-1">{activeSpec.title}</h3>
                </div>
                <span className="text-xs font-mono text-neutral-300 bg-[#181818] px-3 py-1.5 rounded border border-white/10">
                  {activeSpec.metricTag}
                </span>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {activeSpec.details}
              </p>

              <div className="space-y-2.5 mb-6">
                <p className="text-xs font-mono text-neutral-400">
                  APPLICABLE CATALOGUE PRODUCTS:
                </p>
                <div className="space-y-2">
                  {activeSpec.applicableProducts.map((prod) => (
                    <div
                      key={prod}
                      className="px-3.5 py-2.5 rounded-lg bg-[#191919] border border-white/10 flex items-center justify-between text-xs text-white"
                    >
                      <span>{prod}</span>
                      <span className="font-mono text-[#F50008]">Available</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-neutral-400">
                  Specifications vary by product and buyer requirement.
                </p>
                <button
                  type="button"
                  onClick={() => onOpenQuoteModal(activeSpec.applicableProducts[0], activeSpec.title)}
                  className="px-4 py-2.5 text-xs font-semibold text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Enquire for {activeSpec.title}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 21: BULK SUPPLY */}
      {showBulk && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl p-6 sm:p-10 lg:p-12 border border-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: MOQ & Packaging Options */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
                    04 · WHOLESALE VOLUME & PACKAGING
                  </p>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    BUILT FOR BULK B2B REQUIREMENTS
                  </h2>
                </div>

                {/* Main MOQ Figure */}
                <div className="bg-[#1A1A1A] border border-[#F50008]/40 rounded-xl p-6 shadow-[0_0_30px_rgba(245,0,8,0.12)]">
                  <p className="text-xs font-mono text-neutral-400">Minimum Order Quantity</p>
                  <p className="text-3xl sm:text-5xl font-bold font-mono text-white tracking-tight mt-1 tabular-nums">
                    500 KG – 1 TON
                  </p>
                </div>

                {/* Packaging Section */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-white">PP Bags Available</span>
                    <span className="text-xs font-mono text-neutral-400">
                      Click size to preview 3D stack
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {BAG_SIZES.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedBagSize(size)}
                        className={`py-4 px-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedBagSize === size
                            ? 'bg-[#F50008] border-[#F50008] text-white shadow-lg'
                            : 'bg-[#1B1B1B] border-white/15 text-neutral-200 hover:border-white/40'
                        }`}
                      >
                        <span className="block text-xl font-bold font-mono tabular-nums">
                          {size}
                        </span>
                        <span className="block text-[11px] opacity-85 mt-0.5">PP Bag</span>
                      </button>
                    ))}
                  </div>

                  <p className="text-sm text-neutral-200 font-medium mt-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F50008]" />
                    <span>Customized packing available as per requirement.</span>
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(undefined, `${selectedBagSize} PP Bag — Bulk Order`)}
                    className="px-6 py-3.5 text-xs font-semibold tracking-wider text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg inline-flex items-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>REQUEST BULK PACKAGING QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: 3D Warehouse / Spice Bag / Container Scene */}
              <div className="lg:col-span-6">
                <ThreeBulkWarehouseScene
                  selectedBagSize={selectedBagSize}
                  reducedMotion={reducedMotion}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 22: GLOBAL TRADE SECTION */}
      {showGlobalTrade && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#1D1D1D] border border-white/10 rounded-2xl p-6 sm:p-10">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-mono tracking-widest text-[#F50008]">
                05 · INTERNATIONAL B2B SOURCING
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                INDIAN ORIGIN. GLOBAL OPPORTUNITY.
              </h2>
              <p className="text-base text-neutral-300 leading-relaxed">
                Supporting bulk buyers seeking Indian-origin spices and agricultural products.
              </p>

              <div className="space-y-3 pt-3 border-t border-white/10 text-xs text-neutral-300">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">Origin Sourcing Hub</span>
                  <span className="font-mono text-white font-semibold">India</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-neutral-400">Supply Structure</span>
                  <span className="font-mono text-white">Bulk B2B Trade (500 Kg – 1 Ton MOQ)</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-400">Product Forms</span>
                  <span className="font-mono text-white">Whole · Split · Ground · Flakes · Roots & Leaves</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ThreeGlobalTradeGlobe reducedMotion={reducedMotion} />
            </div>
          </div>
        </section>
      )}

      {/* SECTION 23: OUR PROCESS */}
      {showProcess && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
              06 · B2B EXECUTION WORKFLOW
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              OUR PROCESS
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 mt-2 max-w-2xl">
              A transparent 5-step B2B procurement workflow from initial product inquiry to bulk dispatch.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {PROCESS_STEPS.map((item) => {
              const StepIcon = item.icon;
              return (
                <div
                  key={item.step}
                  className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-mono font-bold text-[#F50008] tabular-nums">
                        {item.step}
                      </span>
                      <div className="w-11 h-11 rounded-xl bg-[#1A1A1A] border border-white/10 group-hover:border-[#F50008] flex items-center justify-center transition-colors">
                        <StepIcon className="w-5 h-5 text-white group-hover:text-[#F50008] transition-colors" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-white tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-neutral-400">
                    <span>STAGE {item.step}</span>
                    <span className="text-[#F50008]">→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
