import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpRight, RotateCcw, ArrowUpDown, Eye } from 'lucide-react';
import { CATEGORIES, PRODUCTS, ProductItem, CategoryInfo } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductCatalogueSectionProps {
  initialCategorySlug?: string;
  showCategoryCards?: boolean;
  onSelectProduct: (product: ProductItem) => void;
  onRequestQuoteForProduct: (productName: string, specification: string) => void;
}

const SPECIFICATION_QUICK_FILTERS = [
  'All',
  'Regular',
  'Organic',
  'Bold',
  'Small',
  'Green',
  'Europe',
  'Japan',
  'Singapore',
  '99%',
  'Sortex',
  'Curcumin',
  'ASTA',
  'SHU',
  'Standard',
];

const PRODUCT_TYPE_FILTERS = [
  'All',
  'Whole Spice',
  'Ground / Powder',
  'Chilli Flakes',
  'Split / Husk',
  'Agricultural Seed',
  'Botanical / Herb',
];

export const ProductCatalogueSection: React.FC<ProductCatalogueSectionProps> = ({
  initialCategorySlug = 'all',
  showCategoryCards = true,
  onSelectProduct,
  onRequestQuoteForProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategorySlug);
  const [selectedProductType, setSelectedProductType] = useState<string>('All');
  const [selectedSpecFilter, setSelectedSpecFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'category' | 'az'>('category');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(initialCategorySlug || 'all');
  }, [initialCategorySlug]);

  const handleCategoryCardClick = (cat: CategoryInfo) => {
    setSelectedCategory(cat.slug);
    const el = document.getElementById('complete-product-catalogue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.categorySlug !== selectedCategory) {
        return false;
      }

      // Product Type filter
      if (selectedProductType !== 'All' && product.productType !== selectedProductType) {
        return false;
      }

      // Specification / Grade quick filter
      if (selectedSpecFilter !== 'All') {
        const specTarget = selectedSpecFilter.toLowerCase();
        const inSpec = product.specification.toLowerCase().includes(specTarget);
        const inTags = product.tags.some((t) => t.toLowerCase().includes(specTarget));
        const inName = product.name.toLowerCase().includes(specTarget);
        if (!inSpec && !inTags && !inName) {
          return false;
        }
      }

      // Search query across Product name, Category, Subcategory, Specification, and Tags
      if (q) {
        const haystack = [
          product.name,
          product.category,
          product.subcategory,
          product.specification,
          product.productType,
          ...product.tags,
        ]
          .join(' ')
          .toLowerCase();

        return haystack.includes(q);
      }

      return true;
    });

    if (sortBy === 'az') {
      return [...list].sort((a, b) => {
        const cmp = a.name.localeCompare(b.name);
        if (cmp !== 0) return cmp;
        return a.specification.localeCompare(b.specification);
      });
    }

    return list;
  }, [searchQuery, selectedCategory, selectedProductType, selectedSpecFilter, sortBy]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedProductType('All');
    setSelectedSpecFilter('All');
    setSortBy('category');
  };

  const activeFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedProductType !== 'All' ? 1 : 0) +
    (selectedSpecFilter !== 'All' ? 1 : 0) +
    (searchQuery.trim() !== '' ? 1 : 0);

  return (
    <div className="space-y-20">
      {/* SECTION 9: 8 LARGE PREMIUM 3D CATEGORY CARDS */}
      {showCategoryCards && (
        <section id="product-categories" className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
                02 · CORE COMMODITY PORTFOLIO
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                OUR PRODUCT RANGE
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 mt-3 max-w-2xl">
                Explore our range of Indian spices, seeds, powders, herbs and superfoods.
              </p>
            </div>
            <div className="text-xs font-mono text-neutral-400 tabular-nums">
              <span>8 COMMODITY GROUPS</span>
              <span className="mx-2">·</span>
              <span className="text-white font-semibold">{PRODUCTS.length} TOTAL SPECIFICATIONS</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <div
                  key={cat.id}
                  onClick={() => handleCategoryCardClick(cat)}
                  className={`group relative rounded-2xl overflow-hidden bg-[#242424] border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 ${
                    isSelected
                      ? 'border-[#F50008] shadow-[0_15px_35px_rgba(245,0,8,0.22)]'
                      : 'border-white/10 hover:border-[#F50008]/60 shadow-lg'
                  }`}
                >
                  {/* Image Container (65%+ height emphasis) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#181818]">
                    <ResilientImage
                      src={cat.image}
                      alt={`${cat.title} - Indian Bulk Spice Category`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#242424] via-black/35 to-transparent" />

                    {/* Top-right unboxed product count */}
                    <div className="absolute top-3.5 right-3.5 bg-[#181818]/90 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 text-xs font-mono text-white tabular-nums">
                      {cat.productCount} {cat.productCount === 1 ? 'Product' : 'Products'}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#F50008] transition-colors">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {cat.subtitle}
                      </p>

                      {/* Clean unboxed highlights with middle dot separator */}
                      <div className="mt-3 pt-3 border-t border-white/10 text-[11px] text-neutral-300 flex flex-wrap items-center gap-x-1.5 gap-y-1">
                        {cat.highlights.map((hl, i) => (
                          <React.Fragment key={hl}>
                            <span>{hl}</span>
                            {i < cat.highlights.length - 1 && (
                              <span className="text-[#F50008]" aria-hidden="true">
                                ·
                              </span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCategoryCardClick(cat);
                        }}
                        className="text-xs font-semibold tracking-wider text-white group-hover:text-[#F50008] transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
                      >
                        <span>VIEW PRODUCTS</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <Link
                        to={`/products/${cat.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-[11px] text-neutral-400 hover:text-white underline underline-offset-4 whitespace-nowrap"
                      >
                        Category Page
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 10: COMPLETE SEARCHABLE & FILTERABLE PRODUCT CATALOGUE */}
      <section
        id="complete-product-catalogue"
        className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-white/10">
          {/* Catalogue Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <p className="text-xs font-mono tracking-widest text-[#F50008] mb-1.5">
                COMPLETE B2B SPECIFICATION DIRECTORY
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                COMPLETE PRODUCT CATALOGUE
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Search and filter across all {PRODUCTS.length} Indian spice, seed, powder, and botanical specifications.
              </p>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Search Bar */}
              <div className="relative flex-1 sm:w-80">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products... (e.g. Jeera, 99%, Organic, Chilli)"
                  aria-label="Search products"
                  className="w-full pl-10 pr-8 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008] transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white px-1 cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#181818] border border-white/15 rounded-lg px-3 py-2 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-[#F50008]" />
                <span className="text-xs text-neutral-400 whitespace-nowrap">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'category' | 'az')}
                  aria-label="Sort products"
                  className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
                >
                  <option value="category" className="bg-[#202020]">
                    Category
                  </option>
                  <option value="az" className="bg-[#202020]">
                    A–Z
                  </option>
                </select>
              </div>

              {/* Mobile Collapsible Filter Toggle */}
              <button
                type="button"
                onClick={() => setMobileFiltersOpen((prev) => !prev)}
                className="lg:hidden flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2A2A2A] border border-white/15 rounded-lg"
              >
                <SlidersHorizontal className="w-4 h-4 text-[#F50008]" />
                <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
              </button>
            </div>
          </div>

          {/* Filter Bars (Always visible on desktop, collapsible on mobile) */}
          <div className={`${mobileFiltersOpen ? 'block' : 'hidden'} lg:block pt-6 space-y-5`}>
            {/* 1. Category Filter Tabs */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-neutral-400">FILTER BY CATEGORY</span>
                {activeFilterCount > 0 && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="text-xs text-[#F50008] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All Filters</span>
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#F50008] text-white font-semibold shadow-sm'
                      : 'bg-[#1B1B1B] text-neutral-300 hover:text-white border border-white/10'
                  }`}
                >
                  All Categories ({PRODUCTS.length})
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedCategory === cat.slug
                        ? 'bg-[#F50008] text-white font-semibold shadow-sm'
                        : 'bg-[#1B1B1B] text-neutral-300 hover:text-white border border-white/10'
                    }`}
                  >
                    {cat.shortName} ({cat.productCount})
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Product Type & Grade/Specification Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-2 border-t border-white/5">
              {/* Product Type */}
              <div className="lg:col-span-5">
                <span className="block text-xs font-mono text-neutral-400 mb-2">
                  PRODUCT TYPE
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRODUCT_TYPE_FILTERS.map((pt) => (
                    <button
                      key={pt}
                      type="button"
                      onClick={() => setSelectedProductType(pt)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedProductType === pt
                          ? 'bg-white text-[#202020] font-semibold'
                          : 'bg-[#181818] text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specification / Grade Quick Filter */}
              <div className="lg:col-span-7">
                <span className="block text-xs font-mono text-neutral-400 mb-2">
                  GRADE / SPECIFICATION
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {SPECIFICATION_QUICK_FILTERS.map((spec) => (
                    <button
                      key={spec}
                      type="button"
                      onClick={() => setSelectedSpecFilter(spec)}
                      className={`px-3 py-1.5 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        selectedSpecFilter === spec
                          ? 'bg-[#F50008] text-white font-semibold'
                          : 'bg-[#181818] text-neutral-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {spec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-400">
            <div className="font-mono tabular-nums">
              Showing <span className="text-white font-semibold">{filteredProducts.length}</span> of{' '}
              <span className="text-white font-semibold">{PRODUCTS.length}</span> B2B products
              {selectedCategory !== 'all' && (
                <span>
                  {' '}
                  in{' '}
                  <strong className="text-[#F50008]">
                    {CATEGORIES.find((c) => c.slug === selectedCategory)?.title}
                  </strong>
                </span>
              )}
              {searchQuery && (
                <span>
                  {' '}
                  matching <strong className="text-white">"{searchQuery}"</strong>
                </span>
              )}
            </div>
            <div className="text-neutral-400">
              MOQ: <span className="text-white font-mono">500 Kg – 1 Ton</span> · Packaging:{' '}
              <span className="text-white font-mono">15 / 25 / 40 / 50 Kg PP Bags & Custom</span>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <p className="text-lg font-semibold text-white">
                No products matched your current filter combination.
              </p>
              <p className="text-sm text-neutral-400 max-w-md mx-auto">
                Try clearing your search query or resetting the category and specification filters to view all 85 products.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg cursor-pointer"
              >
                Show All {PRODUCTS.length} Products
              </button>
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="group bg-[#1E1E1E] border border-white/10 hover:border-[#F50008]/60 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(0,0,0,0.65)] cursor-pointer"
                >
                  <div>
                    {/* Product Thumbnail */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#151515]">
                      <ResilientImage
                        src={product.image}
                        alt={`${product.name} — ${product.specification}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E1E] via-transparent to-black/30" />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(product);
                        }}
                        className="absolute top-2.5 right-2.5 p-1.5 rounded-md bg-black/65 text-neutral-300 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Inspect Product Details"
                        aria-label={`Inspect ${product.name} (${product.specification})`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Product Metadata & Title */}
                    <div className="p-4">
                      {/* Clean unboxed metadata with typographic separator */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-1.5 truncate">
                        <span className="text-neutral-300 font-medium">{product.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate">{product.subcategory}</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-[#F50008] transition-colors">
                        {product.name}
                      </h3>

                      <div className="mt-2.5 pt-2.5 border-t border-white/10">
                        <span className="block text-[10px] font-mono text-neutral-400">
                          SPECIFICATION / GRADE
                        </span>
                        <p className="text-xs font-mono font-semibold text-white mt-0.5">
                          {product.specification}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="px-4 pb-4 pt-1 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-neutral-400 font-mono tabular-nums">
                      MOQ: 500 Kg–1T
                    </span>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRequestQuoteForProduct(product.name, product.specification);
                      }}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#2B2B2B] group-hover:bg-[#F50008] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
