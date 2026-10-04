import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, Layers, Box, Scale } from 'lucide-react';
import { ProductItem } from '../data/products';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [formState, setFormState] = useState({
    name: '',
    company: '',
    country: '',
    email: '',
    phone: '',
    quantity: '500 Kg – 1 Ton',
    packaging: '25 Kg PP Bag',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (product) {
      setSubmitted(false);
      setErrorMsg('');
      setFormState((prev) => ({
        ...prev,
        message: `Enquiry for ${product.name} — Specification: ${product.specification}`,
      }));
    }
  }, [product]);

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.company.trim() || !formState.email.trim() || !formState.phone.trim()) {
      setErrorMsg('Please complete Name, Company, Email, and Phone / WhatsApp fields.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="relative w-full max-w-5xl bg-[#222222] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col lg:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-lg bg-[#181818]/90 text-neutral-300 hover:text-white border border-white/10 hover:border-[#F50008] transition-colors cursor-pointer"
          aria-label="Close Product Detail Panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Visual & Specifications */}
        <div className="lg:w-5/12 bg-[#1B1B1B] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
          <div>
            {/* Clean unboxed metadata per Zero-Pill rule */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 mb-3">
              <span className="text-[#F50008] font-semibold">{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>{product.subcategory}</span>
              <span aria-hidden="true">·</span>
              <span>{product.productType}</span>
            </div>

            <h2
              id="product-modal-title"
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2"
            >
              {product.name}
            </h2>

            <div className="mb-5 pb-4 border-b border-white/10">
              <p className="text-xs text-neutral-400">Specification / Grade</p>
              <p className="text-lg font-mono font-semibold text-white mt-0.5">
                {product.specification}
              </p>
            </div>

            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-white/10 mb-6 bg-[#141414]">
              <ResilientImage
                src={product.image}
                alt={`${product.name} - ${product.specification}`}
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-neutral-200">
                <span>Origin: India</span>
                <span className="font-mono">{product.specification}</span>
              </div>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              {product.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-neutral-300">
            <div className="flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-[#F50008] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">Available in bulk quantities.</p>
                <p className="text-neutral-400">Minimum Order Quantity: {product.minimumOrderQuantity}</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Box className="w-4 h-4 text-[#F50008] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">
                  Packaging can be customized according to requirement.
                </p>
                <p className="text-neutral-400">
                  Standard Options: 15 Kg, 25 Kg, 40 Kg, 50 Kg PP Bags
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Layers className="w-4 h-4 text-[#F50008] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">B2B Commercial Terms</p>
                <p className="text-neutral-400">
                  Rates are subject to confirmation. All rates are excluding transportation rates.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Enquiry / Request a Quote Form */}
        <div className="lg:w-7/12 p-6 sm:p-8 overflow-y-auto">
          <div className="mb-6">
            <p className="text-xs font-mono text-[#F50008] tracking-wider mb-1">
              DIRECT B2B QUOTATION ENQUIRY
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Request a Quote
            </h3>
            <p className="text-sm text-neutral-400 mt-1">
              Share your bulk quantity and packaging requirements for{' '}
              <span className="text-white font-medium">
                {product.name} ({product.specification})
              </span>
              .
            </p>
          </div>

          {submitted ? (
            <div className="bg-[#1B1B1B] border border-[#F50008]/40 rounded-xl p-6 text-center space-y-4 my-8">
              <CheckCircle2 className="w-12 h-12 text-[#F50008] mx-auto" />
              <h4 className="text-xl font-bold text-white">
                Quotation Enquiry Recorded
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{formState.name}</span> from{' '}
                <span className="text-white font-semibold">{formState.company}</span>. Your bulk requirement for{' '}
                <span className="text-white font-semibold">
                  {product.name} ({product.specification})
                </span>{' '}
                — Quantity: <span className="font-mono text-white">{formState.quantity}</span> in{' '}
                <span className="font-mono text-white">{formState.packaging}</span> has been registered.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 text-xs font-medium text-neutral-300 bg-[#2A2A2A] hover:text-white rounded-lg border border-white/10 cursor-pointer"
                >
                  Submit Another Requirement
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#F50008] hover:bg-[#D40007] rounded-lg cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-lg bg-[#F50008]/15 border border-[#F50008] text-xs text-white">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Company *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.company}
                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                    placeholder="Company / Organization Name"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.country}
                    onChange={(e) => setFormState({ ...formState, country: e.target.value })}
                    placeholder="Destination Country"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="buyer@company.com"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    placeholder="+1 / +91 ..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Required Quantity (MOQ: 500 Kg – 1 Ton)
                  </label>
                  <input
                    type="text"
                    value={formState.quantity}
                    onChange={(e) => setFormState({ ...formState, quantity: e.target.value })}
                    placeholder="e.g. 500 Kg, 1 Ton, 5 Tons, 1 FCL"
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Packaging Requirement
                  </label>
                  <select
                    value={formState.packaging}
                    onChange={(e) => setFormState({ ...formState, packaging: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white focus:outline-none focus:border-[#F50008]"
                  >
                    <option value="15 Kg PP Bag">15 Kg PP Bag</option>
                    <option value="25 Kg PP Bag">25 Kg PP Bag</option>
                    <option value="40 Kg PP Bag">40 Kg PP Bag</option>
                    <option value="50 Kg PP Bag">50 Kg PP Bag</option>
                    <option value="Customized Packaging">Customized Packaging as per Requirement</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Message / Delivery & Specification Notes
                </label>
                <textarea
                  rows={3}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Specify target port, custom packing details, or grade requirements..."
                  className="w-full px-3.5 py-2.5 text-sm bg-[#181818] border border-white/15 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#F50008]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 bg-[#F50008] hover:bg-[#D40007] text-white font-semibold text-xs tracking-wider rounded-lg shadow-[0_0_25px_rgba(245,0,8,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>REQUEST QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
