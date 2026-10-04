import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  CheckCircle2,
  MessageSquare,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Edit3,
  Check,
  FileText,
} from 'lucide-react';
import { PRODUCTS, FAQ_ITEMS, TERMS_AND_CONDITIONS } from '../data/products';
import { BrandLogo } from './BrandLogo';

interface ConversionAndSupportSectionProps {
  preselectedProduct?: string;
  preselectedSpecification?: string;
  showQuote?: boolean;
  showTerms?: boolean;
  showFaq?: boolean;
  showContact?: boolean;
}

export const ConversionAndSupportSection: React.FC<ConversionAndSupportSectionProps> = ({
  preselectedProduct = '',
  preselectedSpecification = '',
  showQuote = true,
  showTerms = true,
  showFaq = true,
  showContact = true,
}) => {
  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phone: '',
    selectedProduct: preselectedProduct || 'Jeera / Cumin',
    specification: preselectedSpecification || 'Singapore 99%',
    requiredQuantity: '500 Kg – 1 Ton',
    packagingRequirement: '25 Kg PP Bag',
    message: '',
  });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteError, setQuoteError] = useState('');
  const [whatsappPlaceholderNotice, setWhatsappPlaceholderNotice] = useState(false);

  // Sync preselected product/spec if passed
  useEffect(() => {
    if (preselectedProduct) {
      setQuoteForm((prev) => ({
        ...prev,
        selectedProduct: preselectedProduct,
        specification: preselectedSpecification || prev.specification,
      }));
    }
  }, [preselectedProduct, preselectedSpecification]);

  // Unique product names for dropdown
  const uniqueProductNames = Array.from(new Set(PRODUCTS.map((p) => p.name)));

  // Specifications matching selected product (or all if custom)
  const matchingSpecifications = PRODUCTS.filter(
    (p) => p.name === quoteForm.selectedProduct
  ).map((p) => p.specification);

  const handleProductChange = (newProd: string) => {
    const specs = PRODUCTS.filter((p) => p.name === newProd).map((p) => p.specification);
    setQuoteForm((prev) => ({
      ...prev,
      selectedProduct: newProd,
      specification: specs[0] || 'Standard',
    }));
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !quoteForm.fullName.trim() ||
      !quoteForm.companyName.trim() ||
      !quoteForm.country.trim() ||
      !quoteForm.email.trim() ||
      !quoteForm.phone.trim()
    ) {
      setQuoteError('Please fill in all required buyer contact fields.');
      return;
    }
    setQuoteError('');
    setQuoteSubmitted(true);
  };

  // Expandable Terms & Conditions state
  const [termsExpanded, setTermsExpanded] = useState(true);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Contact Section State & Editable Placeholders (Strictly no fabricated credentials)
  const [isEditingPlaceholders, setIsEditingPlaceholders] = useState(false);
  const [businessPlaceholders, setBusinessPlaceholders] = useState({
    email: '[Editable Placeholder: Configure Official Email]',
    phoneWhatsapp: '[Editable Placeholder: Configure Official Phone / WhatsApp]',
    address: '[Editable Placeholder: Configure Official Office Address]',
    businessHours: '[Editable Placeholder: Configure Business Hours, e.g., Mon – Sat]',
  });

  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      return;
    }
    setContactSubmitted(true);
  };

  return (
    <div className="space-y-24">
      {/* SECTION 25: REQUEST A QUOTE */}
      {showQuote && (
        <section id="request-quote-section" className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 scroll-mt-24">
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#262626] via-[#202020] to-[#1A1A1A] border border-[#F50008]/40 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
                07 · DIRECT B2B PROCUREMENT DESK
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                LOOKING FOR A BULK SPICE SUPPLIER?
              </h2>
              <p className="text-base sm:text-lg text-neutral-300 mt-3">
                Share your product requirement and specifications with us.
              </p>
            </div>

            {quoteSubmitted ? (
              <div className="bg-[#181818] border border-[#F50008] rounded-xl p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#F50008] mx-auto" />
                <h3 className="text-2xl font-bold text-white">
                  Bulk Quotation Request Logged
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{quoteForm.fullName}</span> ({quoteForm.companyName}, {quoteForm.country}). We have recorded your bulk enquiry for{' '}
                  <span className="text-white font-semibold">
                    {quoteForm.selectedProduct} — {quoteForm.specification}
                  </span>{' '}
                  ({quoteForm.requiredQuantity}, {quoteForm.packagingRequirement}).
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setQuoteSubmitted(false)}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg cursor-pointer"
                  >
                    SUBMIT ANOTHER REQUIREMENT
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-5">
                {quoteError && (
                  <div className="p-3.5 rounded-lg bg-[#F50008]/15 border border-[#F50008] text-xs text-white">
                    {quoteError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.fullName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      COMPANY NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.companyName}
                      onChange={(e) => setQuoteForm({ ...quoteForm, companyName: e.target.value })}
                      placeholder="Your company / organization"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      COUNTRY *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteForm.country}
                      onChange={(e) => setQuoteForm({ ...quoteForm, country: e.target.value })}
                      placeholder="Destination country"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      required
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                      placeholder="Phone or WhatsApp number with country code"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      SELECT PRODUCT
                    </label>
                    <select
                      value={quoteForm.selectedProduct}
                      onChange={(e) => handleProductChange(e.target.value)}
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#F50008]"
                    >
                      {uniqueProductNames.map((name) => (
                        <option key={name} value={name} className="bg-[#202020]">
                          {name}
                        </option>
                      ))}
                      <option value="Multiple Products / Full Assortment" className="bg-[#202020]">
                        Multiple Products / Bulk Assortment
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      SPECIFICATION / GRADE
                    </label>
                    {matchingSpecifications.length > 0 ? (
                      <select
                        value={quoteForm.specification}
                        onChange={(e) => setQuoteForm({ ...quoteForm, specification: e.target.value })}
                        className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#F50008]"
                      >
                        {matchingSpecifications.map((spec, idx) => (
                          <option key={`${spec}-${idx}`} value={spec} className="bg-[#202020]">
                            {spec}
                          </option>
                        ))}
                        <option value="Custom / Multiple Grades" className="bg-[#202020]">
                          Custom / Multiple Grades
                        </option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={quoteForm.specification}
                        onChange={(e) => setQuoteForm({ ...quoteForm, specification: e.target.value })}
                        placeholder="Specify required grade"
                        className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      REQUIRED QUANTITY (MOQ: 500 KG – 1 TON)
                    </label>
                    <input
                      type="text"
                      value={quoteForm.requiredQuantity}
                      onChange={(e) => setQuoteForm({ ...quoteForm, requiredQuantity: e.target.value })}
                      placeholder="e.g., 500 Kg, 1 Ton, 5 Tons, 20ft FCL"
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-2">
                      PACKAGING REQUIREMENT
                    </label>
                    <select
                      value={quoteForm.packagingRequirement}
                      onChange={(e) =>
                        setQuoteForm({ ...quoteForm, packagingRequirement: e.target.value })
                      }
                      className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#F50008]"
                    >
                      <option value="15 Kg PP Bag" className="bg-[#202020]">
                        15 Kg PP Bag
                      </option>
                      <option value="25 Kg PP Bag" className="bg-[#202020]">
                        25 Kg PP Bag
                      </option>
                      <option value="40 Kg PP Bag" className="bg-[#202020]">
                        40 Kg PP Bag
                      </option>
                      <option value="50 Kg PP Bag" className="bg-[#202020]">
                        50 Kg PP Bag
                      </option>
                      <option value="Customized Packing as per Requirement" className="bg-[#202020]">
                        Customized Packing as per Requirement
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-2">
                    MESSAGE
                  </label>
                  <textarea
                    rows={4}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({ ...quoteForm, message: e.target.value })}
                    placeholder="Share target destination, custom packing notes, or additional product specifications..."
                    className="w-full px-4 py-3 text-sm bg-[#161616] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="submit"
                    className="px-8 py-4 text-xs font-semibold tracking-wider text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg shadow-[0_0_25px_rgba(245,0,8,0.4)] transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>REQUEST A QUOTE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setWhatsappPlaceholderNotice((prev) => !prev)}
                    className="px-7 py-4 text-xs font-semibold tracking-wider text-white bg-[#262626] hover:bg-[#303030] border border-white/20 rounded-lg transition-colors inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-[#F50008]" />
                    <span>WHATSAPP US</span>
                  </button>
                </div>

                {whatsappPlaceholderNotice && (
                  <div className="p-4 rounded-xl bg-[#181818] border border-white/15 text-xs text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="font-mono text-[#F50008] font-semibold">
                        WHATSAPP CONFIGURATION PLACEHOLDER:
                      </span>{' '}
                      Official WhatsApp URL placeholder active ({businessPlaceholders.phoneWhatsapp}). Configure your live WhatsApp number in the Contact section below or submit the quotation form directly.
                    </div>
                    <button
                      type="button"
                      onClick={() => setWhatsappPlaceholderNotice(false)}
                      className="text-neutral-400 hover:text-white underline shrink-0 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>
      )}

      {/* SECTION 26: TERMS & CONDITIONS */}
      {showTerms && (
        <section id="terms-section" className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <button
              type="button"
              onClick={() => setTermsExpanded((prev) => !prev)}
              className="w-full p-6 sm:p-8 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
              aria-expanded={termsExpanded}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#F50008]" />
                </div>
                <div>
                  <span className="text-xs font-mono text-[#F50008]">
                    COMMERCIAL TRADE TERMS
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">
                    TERMS & CONDITIONS
                  </h2>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                  termsExpanded ? 'rotate-180 text-white' : ''
                }`}
              />
            </button>

            {termsExpanded && (
              <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-white/10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {TERMS_AND_CONDITIONS.map((term, index) => (
                    <div
                      key={term}
                      className="p-4 rounded-xl bg-[#1A1A1A] border border-white/10 flex items-start gap-3"
                    >
                      <span className="text-xs font-mono font-bold text-[#F50008] tabular-nums mt-0.5">
                        0{index + 1}
                      </span>
                      <p className="text-sm text-white font-medium leading-snug">{term}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 27: FAQ */}
      {showFaq && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-mono tracking-widest text-[#F50008] mb-2">
              08 · FREQUENTLY ASKED QUESTIONS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              BULK SOURCING FAQ
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border transition-colors ${
                    isOpen
                      ? 'bg-[#252525] border-[#F50008]/50'
                      : 'bg-[#1D1D1D] border-white/10 hover:border-white/25'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-white">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F50008]' : 'text-neutral-400'
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/10">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SECTION 28: CONTACT SECTION */}
      {showContact && (
        <section className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 glass-panel rounded-2xl p-6 sm:p-10 border border-white/10">
            {/* Left Info & Editable Business Placeholders */}
            <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
              <div className="space-y-5">
                <p className="text-xs font-mono tracking-widest text-[#F50008]">
                  09 · B2B TRADE DESK
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  LET'S DISCUSS YOUR REQUIREMENT
                </h2>

                <div className="pt-2">
                  <BrandLogo size="md" />
                  <p className="text-sm font-semibold text-white mt-3">
                    Akshat Global Trades
                  </p>
                  <p className="text-xs text-neutral-300 mt-1">
                    Bulk Spices • Seeds • Powders • Herbs • Superfoods
                  </p>
                </div>

                {/* Editable Placeholders Block */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400">
                      DIRECT CONTACT DETAILS
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsEditingPlaceholders((prev) => !prev)}
                      className="text-xs text-[#F50008] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {isEditingPlaceholders ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Save Placeholders</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Placeholders</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* EMAIL */}
                  <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#F50008] shrink-0 mt-1" />
                    <div className="w-full">
                      <span className="block text-[10px] font-mono text-neutral-400">EMAIL</span>
                      {isEditingPlaceholders ? (
                        <input
                          type="text"
                          value={businessPlaceholders.email}
                          onChange={(e) =>
                            setBusinessPlaceholders({
                              ...businessPlaceholders,
                              email: e.target.value,
                            })
                          }
                          className="w-full mt-1 px-2 py-1 text-xs bg-[#242424] border border-white/20 rounded text-white"
                        />
                      ) : (
                        <p className="text-xs text-neutral-200 font-mono mt-0.5 break-all">
                          {businessPlaceholders.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* PHONE / WHATSAPP */}
                  <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#F50008] shrink-0 mt-1" />
                    <div className="w-full">
                      <span className="block text-[10px] font-mono text-neutral-400">
                        PHONE / WHATSAPP
                      </span>
                      {isEditingPlaceholders ? (
                        <input
                          type="text"
                          value={businessPlaceholders.phoneWhatsapp}
                          onChange={(e) =>
                            setBusinessPlaceholders({
                              ...businessPlaceholders,
                              phoneWhatsapp: e.target.value,
                            })
                          }
                          className="w-full mt-1 px-2 py-1 text-xs bg-[#242424] border border-white/20 rounded text-white"
                        />
                      ) : (
                        <p className="text-xs text-neutral-200 font-mono mt-0.5">
                          {businessPlaceholders.phoneWhatsapp}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* ADDRESS */}
                  <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#F50008] shrink-0 mt-1" />
                    <div className="w-full">
                      <span className="block text-[10px] font-mono text-neutral-400">ADDRESS</span>
                      {isEditingPlaceholders ? (
                        <input
                          type="text"
                          value={businessPlaceholders.address}
                          onChange={(e) =>
                            setBusinessPlaceholders({
                              ...businessPlaceholders,
                              address: e.target.value,
                            })
                          }
                          className="w-full mt-1 px-2 py-1 text-xs bg-[#242424] border border-white/20 rounded text-white"
                        />
                      ) : (
                        <p className="text-xs text-neutral-200 font-mono mt-0.5">
                          {businessPlaceholders.address}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* BUSINESS HOURS */}
                  <div className="p-3.5 rounded-xl bg-[#181818] border border-white/10 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#F50008] shrink-0 mt-1" />
                    <div className="w-full">
                      <span className="block text-[10px] font-mono text-neutral-400">
                        BUSINESS HOURS
                      </span>
                      {isEditingPlaceholders ? (
                        <input
                          type="text"
                          value={businessPlaceholders.businessHours}
                          onChange={(e) =>
                            setBusinessPlaceholders({
                              ...businessPlaceholders,
                              businessHours: e.target.value,
                            })
                          }
                          className="w-full mt-1 px-2 py-1 text-xs bg-[#242424] border border-white/20 rounded text-white"
                        />
                      ) : (
                        <p className="text-xs text-neutral-200 font-mono mt-0.5">
                          {businessPlaceholders.businessHours}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-[#1A1A1A] border border-white/10 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-1">Send a Direct Trade Enquiry</h3>
              <p className="text-xs text-neutral-400 mb-6">
                Connect with Akshat Global Trades regarding bulk specifications, custom packaging, or trade terms.
              </p>

              {contactSubmitted ? (
                <div className="p-6 rounded-xl bg-[#222222] border border-[#F50008]/50 text-center space-y-3 my-8">
                  <CheckCircle2 className="w-10 h-10 text-[#F50008] mx-auto" />
                  <h4 className="text-lg font-bold text-white">Message Received</h4>
                  <p className="text-xs text-neutral-300 max-w-md mx-auto">
                    Thank you, {contactForm.name}. Your trade enquiry has been recorded.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setContactSubmitted(false);
                      setContactForm({
                        name: '',
                        company: '',
                        email: '',
                        phone: '',
                        subject: '',
                        message: '',
                      });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#F50008] rounded-lg cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        COMPANY
                      </label>
                      <input
                        type="text"
                        value={contactForm.company}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, company: e.target.value })
                        }
                        placeholder="Company Name"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="buyer@company.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                        PHONE / WHATSAPP
                      </label>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        placeholder="+1 / +91 ..."
                        className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="e.g., Bulk Cumin Singapore 99% & Coriander Eagle Sortex Inquiry"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1.5">
                      MESSAGE *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Detail your bulk requirement, specifications, and preferred packaging..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#121212] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 bg-[#F50008] hover:bg-[#D40007] text-white font-semibold text-xs tracking-wider rounded-lg transition-all cursor-pointer"
                  >
                    SEND ENQUIRY
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
