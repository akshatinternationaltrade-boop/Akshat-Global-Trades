import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { TERMS_AND_CONDITIONS } from '../data/products';

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<'terms' | 'privacy' | null>(null);

  return (
    <footer className="bg-[#181818] border-t border-white/10 text-neutral-300">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="inline-block" aria-label="Akshat Global Trades">
              <BrandLogo size="lg" />
            </Link>
            <div>
              <p className="text-lg font-bold text-white tracking-tight">
                AKSHAT GLOBAL TRADES
              </p>
              <p className="text-xs font-mono tracking-widest text-[#F50008] mt-1">
                INDIAN SPICES. GLOBAL STANDARDS.
              </p>
            </div>
            <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
              Premium Indian spices, seeds, powders, herbs and superfoods for bulk B2B supply.
            </p>
            <div className="text-xs font-mono text-neutral-400 pt-1">
              MOQ: 500 Kg – 1 Ton · Packaging: 15 / 25 / 40 / 50 Kg PP Bags & Custom
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-mono tracking-wider text-white font-semibold">
              NAVIGATION
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-neutral-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-neutral-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/specifications"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Specifications
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-supply"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  Bulk Supply
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-neutral-400 hover:text-white transition-colors">
                  Our Process
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-mono tracking-wider text-white font-semibold">
              PRODUCT CATEGORIES
            </h3>
            <div className="grid grid-cols-2 gap-2.5 text-sm">
              <Link
                to="/products/cumin"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Cumin
              </Link>
              <Link
                to="/products/fennel"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Fennel
              </Link>
              <Link
                to="/products/coriander"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Coriander
              </Link>
              <Link
                to="/products/turmeric"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Turmeric
              </Link>
              <Link
                to="/products/chilli"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Chilli
              </Link>
              <Link
                to="/products/powders"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Powders
              </Link>
              <Link
                to="/products/seeds"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Seeds
              </Link>
              <Link
                to="/products/herbs"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Herbs
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© {new Date().getFullYear()} Akshat Global Trades. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalModal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              type="button"
              onClick={() => setLegalModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <Link to="/quote" className="text-[#F50008] hover:underline font-semibold">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {legalModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-xl bg-[#222222] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setLegalModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-[#181818] text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {legalModal === 'terms' ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Terms & Conditions</h3>
                <p className="text-xs text-neutral-400">
                  Official Commercial Terms — Akshat Global Trades
                </p>
                <ul className="space-y-2.5 pt-2">
                  {TERMS_AND_CONDITIONS.map((line) => (
                    <li
                      key={line}
                      className="p-3 rounded-lg bg-[#181818] border border-white/10 text-sm text-white"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Privacy Policy</h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Akshat Global Trades collects buyer contact details, company information, and bulk product specification inquiries solely for the purpose of responding to B2B quotation requests and commercial trade communication.
                </p>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  Information submitted through our Request a Quote and Contact forms is handled confidentially and is never sold to third parties.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
