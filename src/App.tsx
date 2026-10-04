/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HeroAndTrustStrip } from './components/HeroAndTrustStrip';
import { AboutAndOriginSection } from './components/AboutAndOriginSection';
import { ProductCatalogueSection } from './components/ProductCatalogueSection';
import { SpecificationsAndBulkSection } from './components/SpecificationsAndBulkSection';
import { ConversionAndSupportSection } from './components/ConversionAndSupportSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { Footer } from './components/Footer';
import { CATEGORIES, PRODUCTS, ProductItem } from './data/products';
import { ResilientImage } from './components/ResilientImage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
}

interface PageHeaderBannerProps {
  kicker: string;
  title: string;
  subtitle: string;
  image?: string;
}

const PageHeaderBanner: React.FC<PageHeaderBannerProps> = ({
  kicker,
  title,
  subtitle,
  image,
}) => (
  <div className="relative bg-[#1B1B1B] border-b border-white/10 overflow-hidden py-14 sm:py-20">
    {image && (
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <ResilientImage src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B]/90 to-transparent" />
      </div>
    )}
    <div className="relative z-10 max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white mb-4 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 text-[#F50008]" />
        <span>BACK TO OVERVIEW</span>
      </Link>
      <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">{kicker}</p>
      <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">{title}</h1>
      <p className="text-base sm:text-lg text-neutral-300 mt-3 max-w-2xl">{subtitle}</p>
    </div>
  </div>
);

function MainWebsiteContent() {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  const [selectedProductForModal, setSelectedProductForModal] = useState<ProductItem | null>(null);
  const [quotePrefill, setQuotePrefill] = useState<{ product: string; spec: string }>({
    product: '',
    spec: '',
  });

  // Soft desktop cursor glow
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  useEffect(() => {
    if (reducedMotion) return;
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [reducedMotion]);

  const scrollToCatalogue = () => {
    const el = document.getElementById('complete-product-catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/products');
    }
  };

  const handleOpenQuoteSection = (productName?: string, specification?: string) => {
    if (productName) {
      setQuotePrefill({ product: productName, spec: specification || '' });
    }
    const el = document.getElementById('request-quote-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/quote');
    }
  };

  const renderCategoryRoute = (
    slug: 'cumin' | 'fennel' | 'coriander' | 'turmeric' | 'chilli' | 'powders' | 'seeds' | 'herbs'
  ) => {
    const cat = CATEGORIES.find((c) => c.slug === slug)!;
    return (
      <div className="pb-20 space-y-16">
        <PageHeaderBanner
          kicker={`B2B COMMODITY CATEGORY · ${cat.productCount} SPECIFICATIONS`}
          title={cat.title}
          subtitle={cat.subtitle}
          image={cat.image}
        />
        <ProductCatalogueSection
          initialCategorySlug={slug}
          showCategoryCards={false}
          onSelectProduct={(prod) => setSelectedProductForModal(prod)}
          onRequestQuoteForProduct={(name, spec) => {
            const found = PRODUCTS.find((p) => p.name === name && p.specification === spec);
            if (found) {
              setSelectedProductForModal(found);
            } else {
              handleOpenQuoteSection(name, spec);
            }
          }}
        />
        <ConversionAndSupportSection
          preselectedProduct={
            PRODUCTS.find((p) => p.categorySlug === slug)?.name || cat.shortName
          }
          showQuote={true}
          showTerms={true}
          showFaq={false}
          showContact={false}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#202020] text-white relative">
      <ScrollToTop />

      {/* Subtle Desktop Cursor Glow */}
      {!reducedMotion && (
        <div
          className="hidden lg:block fixed w-[420px] h-[420px] rounded-full pointer-events-none z-30 transition-transform duration-75"
          style={{
            background: 'radial-gradient(circle, rgba(245,0,8,0.06) 0%, rgba(245,0,8,0) 70%)',
            transform: `translate3d(${cursorPos.x - 210}px, ${cursorPos.y - 210}px, 0)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Sticky Navigation */}
      <Navbar
        reducedMotion={reducedMotion}
        onToggleReducedMotion={() => setReducedMotion((prev) => !prev)}
        onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
      />

      {/* Main Route Content */}
      <main className="flex-1">
        <Routes>
          {/* / — FULL FLAGSHIP B2B WEBSITE */}
          <Route
            path="/"
            element={
              <div className="space-y-24 pb-16">
                <HeroAndTrustStrip
                  reducedMotion={reducedMotion}
                  onExploreProducts={scrollToCatalogue}
                  onRequestQuote={() => handleOpenQuoteSection()}
                />

                <AboutAndOriginSection onExploreProducts={scrollToCatalogue} />

                <ProductCatalogueSection
                  initialCategorySlug="all"
                  showCategoryCards={true}
                  onSelectProduct={(prod) => setSelectedProductForModal(prod)}
                  onRequestQuoteForProduct={(name, spec) => {
                    const found = PRODUCTS.find(
                      (p) => p.name === name && p.specification === spec
                    );
                    if (found) {
                      setSelectedProductForModal(found);
                    } else {
                      handleOpenQuoteSection(name, spec);
                    }
                  }}
                />

                <SpecificationsAndBulkSection
                  reducedMotion={reducedMotion}
                  onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
                />

                <ConversionAndSupportSection
                  preselectedProduct={quotePrefill.product}
                  preselectedSpecification={quotePrefill.spec}
                />
              </div>
            }
          />

          {/* /about */}
          <Route
            path="/about"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="AKSHAT GLOBAL TRADES"
                  title="FROM INDIAN ORIGIN TO GLOBAL DEMAND"
                  subtitle="Premium Indian spices, seeds, powders, herbs and superfoods for bulk B2B supply."
                />
                <AboutAndOriginSection onExploreProducts={() => navigate('/products')} />
                <SpecificationsAndBulkSection
                  reducedMotion={reducedMotion}
                  onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
                  showSpecs={false}
                  showBulk={false}
                  showGlobalTrade={true}
                  showProcess={true}
                />
                <ConversionAndSupportSection
                  showQuote={true}
                  showTerms={false}
                  showFaq={false}
                  showContact={false}
                />
              </div>
            }
          />

          {/* /products */}
          <Route
            path="/products"
            element={
              <div className="space-y-16 pb-20">
                <PageHeaderBanner
                  kicker="COMPLETE B2B CATALOGUE · 85 SPECIFICATIONS"
                  title="OUR PRODUCT RANGE"
                  subtitle="Explore our range of Indian spices, seeds, powders, herbs and superfoods."
                />
                <ProductCatalogueSection
                  initialCategorySlug="all"
                  showCategoryCards={true}
                  onSelectProduct={(prod) => setSelectedProductForModal(prod)}
                  onRequestQuoteForProduct={(name, spec) => {
                    const found = PRODUCTS.find(
                      (p) => p.name === name && p.specification === spec
                    );
                    if (found) {
                      setSelectedProductForModal(found);
                    } else {
                      handleOpenQuoteSection(name, spec);
                    }
                  }}
                />
                <ConversionAndSupportSection
                  preselectedProduct={quotePrefill.product}
                  preselectedSpecification={quotePrefill.spec}
                  showQuote={true}
                  showTerms={true}
                  showFaq={false}
                  showContact={false}
                />
              </div>
            }
          />

          {/* 8 Category Routes */}
          <Route path="/products/cumin" element={renderCategoryRoute('cumin')} />
          <Route path="/products/fennel" element={renderCategoryRoute('fennel')} />
          <Route path="/products/coriander" element={renderCategoryRoute('coriander')} />
          <Route path="/products/turmeric" element={renderCategoryRoute('turmeric')} />
          <Route path="/products/chilli" element={renderCategoryRoute('chilli')} />
          <Route path="/products/powders" element={renderCategoryRoute('powders')} />
          <Route path="/products/seeds" element={renderCategoryRoute('seeds')} />
          <Route path="/products/herbs" element={renderCategoryRoute('herbs')} />

          {/* /specifications */}
          <Route
            path="/specifications"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="QUALITY & SPECIFICATIONS"
                  title="SPECIFICATIONS FOR DIFFERENT MARKET REQUIREMENTS"
                  subtitle="Explore Curcumin, ASTA, SHU, Purity, Grade, Sortex, Green, Grinding, and Organic parameters across our product range."
                />
                <SpecificationsAndBulkSection
                  reducedMotion={reducedMotion}
                  onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
                  showSpecs={true}
                  showBulk={false}
                  showGlobalTrade={false}
                  showProcess={false}
                />
                <ConversionAndSupportSection
                  preselectedProduct={quotePrefill.product}
                  preselectedSpecification={quotePrefill.spec}
                  showQuote={true}
                  showTerms={true}
                  showFaq={false}
                  showContact={false}
                />
              </div>
            }
          />

          {/* /bulk-supply */}
          <Route
            path="/bulk-supply"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="WHOLESALE MOQ & PACKAGING"
                  title="BUILT FOR BULK B2B REQUIREMENTS"
                  subtitle="500 Kg – 1 Ton Minimum Order Quantity with 15 Kg, 25 Kg, 40 Kg, and 50 Kg PP Bags and customized packaging options."
                />
                <SpecificationsAndBulkSection
                  reducedMotion={reducedMotion}
                  onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
                  showSpecs={false}
                  showBulk={true}
                  showGlobalTrade={true}
                  showProcess={false}
                />
                <ConversionAndSupportSection
                  preselectedProduct={quotePrefill.product}
                  preselectedSpecification={quotePrefill.spec}
                  showQuote={true}
                  showTerms={true}
                  showFaq={false}
                  showContact={false}
                />
              </div>
            }
          />

          {/* /process */}
          <Route
            path="/process"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="5-STEP B2B EXECUTION"
                  title="OUR PROCESS"
                  subtitle="From initial product requirement and specification confirmation to quotation, bulk packaging, and dispatch."
                />
                <SpecificationsAndBulkSection
                  reducedMotion={reducedMotion}
                  onOpenQuoteModal={(prod, spec) => handleOpenQuoteSection(prod, spec)}
                  showSpecs={false}
                  showBulk={true}
                  showGlobalTrade={false}
                  showProcess={true}
                />
                <ConversionAndSupportSection
                  showQuote={true}
                  showTerms={true}
                  showFaq={false}
                  showContact={false}
                />
              </div>
            }
          />

          {/* /faq */}
          <Route
            path="/faq"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="FREQUENTLY ASKED QUESTIONS"
                  title="B2B SOURCING & TRADE FAQ"
                  subtitle="Answers regarding minimum order quantities, packaging options, grades, and bulk quotation requests."
                />
                <ConversionAndSupportSection
                  showQuote={true}
                  showTerms={true}
                  showFaq={true}
                  showContact={false}
                />
              </div>
            }
          />

          {/* /contact */}
          <Route
            path="/contact"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="CONTACT AKSHAT GLOBAL TRADES"
                  title="LET'S DISCUSS YOUR REQUIREMENT"
                  subtitle="Bulk Spices • Seeds • Powders • Herbs • Superfoods"
                />
                <ConversionAndSupportSection
                  showQuote={false}
                  showTerms={true}
                  showFaq={false}
                  showContact={true}
                />
              </div>
            }
          />

          {/* /quote */}
          <Route
            path="/quote"
            element={
              <div className="space-y-20 pb-20">
                <PageHeaderBanner
                  kicker="B2B QUOTATION DESK"
                  title="LOOKING FOR A BULK SPICE SUPPLIER?"
                  subtitle="Share your product requirement and specifications with us."
                />
                <ConversionAndSupportSection
                  preselectedProduct={quotePrefill.product}
                  preselectedSpecification={quotePrefill.spec}
                  showQuote={true}
                  showTerms={true}
                  showFaq={true}
                  showContact={false}
                />
              </div>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
      />

      {/* Mobile Sticky Bottom Request Quote Bar (Compact, under 15% mobile sticky cap) */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-[#1A1A1A]/95 backdrop-blur-md border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="text-xs">
          <span className="font-semibold text-white block">Bulk B2B Supply</span>
          <span className="text-[11px] font-mono text-neutral-400">MOQ: 500 Kg – 1 Ton</span>
        </div>
        <button
          type="button"
          onClick={() => handleOpenQuoteSection()}
          className="px-4 py-2 text-xs font-semibold tracking-wider text-white bg-[#F50008] rounded-lg inline-flex items-center gap-1.5 shrink-0"
        >
          <span>REQUEST A QUOTE</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MainWebsiteContent />
    </BrowserRouter>
  );
}
