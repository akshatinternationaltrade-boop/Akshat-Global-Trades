import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Eye } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onOpenQuoteModal: (productName?: string, specification?: string) => void;
}

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Specifications', path: '/specifications' },
  { label: 'Bulk Supply', path: '/bulk-supply' },
  { label: 'Our Process', path: '/process' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({
  reducedMotion,
  onToggleReducedMotion,
  onOpenQuoteModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-200 ${
        scrolled
          ? 'bg-[#202020]/95 backdrop-blur-xl border-b border-white/10 shadow-xl'
          : 'bg-[#202020]/85 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Official Akshat Global Trades Logo */}
        <Link
          to="/"
          className="focus-visible:outline-2 focus-visible:outline-[#F50008] rounded py-1 shrink-0"
          aria-label="Akshat Global Trades Home"
        >
          <BrandLogo size="md" />
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav
          className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium text-neutral-300"
          aria-label="Primary Navigation"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-underline whitespace-nowrap shrink-0 transition-colors py-1 ${
                isActive(item.path) ? 'text-white active font-semibold' : 'hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Zone 3: Actions (Reduced Motion Toggle + Request a Quote) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
              reducedMotion
                ? 'bg-white/10 border-[#F50008] text-white'
                : 'bg-transparent border-white/15 text-neutral-400 hover:text-white hover:border-white/30'
            }`}
            title="Toggle Reduced 3D Motion Accessibility Mode"
            aria-pressed={reducedMotion}
          >
            <Eye className="w-3.5 h-3.5 text-[#F50008]" />
            <span>{reducedMotion ? 'Motion: Reduced' : '3D Motion: On'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenQuoteModal()}
            className="px-5 py-2.5 text-xs font-semibold tracking-wider text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg transition-all duration-150 shadow-[0_0_20px_rgba(245,0,8,0.3)] hover:shadow-[0_0_28px_rgba(245,0,8,0.5)] whitespace-nowrap shrink-0 cursor-pointer"
          >
            REQUEST A QUOTE
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleReducedMotion}
            className={`p-2.5 rounded-lg border text-xs ${
              reducedMotion
                ? 'bg-white/10 border-[#F50008] text-white'
                : 'border-white/15 text-neutral-400'
            }`}
            aria-label="Toggle Reduced Motion"
            title="Toggle Reduced Motion"
          >
            <Eye className="w-4 h-4 text-[#F50008]" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-lg bg-[#2A2A2A] border border-white/10 text-white hover:border-[#F50008] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1D1D1D] border-b border-white/10 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-[#F50008]/15 text-white border border-[#F50008]/40'
                    : 'bg-[#262626] text-neutral-300 hover:text-white border border-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="pt-3 flex flex-col sm:flex-row gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 text-xs font-semibold tracking-wider text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg text-center shadow-lg"
            >
              REQUEST A QUOTE
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
