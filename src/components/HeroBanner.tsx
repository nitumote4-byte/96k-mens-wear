'use client';

import React from 'react';
import { Sparkles, MessageCircle, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { STORE_INFO } from '../data/products';

interface HeroBannerProps {
  onSelectCategory: (category: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onSelectCategory }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#14141a] via-[#0f0f14] to-[#0d0d11] border-b border-[#25252e] pt-6 pb-12 sm:pt-10 sm:pb-16">
      {/* Decorative Gold Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-5">
            
            {/* Top Tag Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1e1e26] border border-[#D4AF37]/40 shadow-inner">
              <span className="text-[#D4AF37] text-xs">👑</span>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-widest">
                Official 96K Men's Wear Store
              </span>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-bold px-1.5 py-0.5 rounded">
                50.5K IG Family
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              रोज काहीतरी <span className="gold-gradient-text">नवीन...</span>
              <br />
              <span className="text-2xl sm:text-4xl text-zinc-300 font-semibold">
                Trending Linen & Bootcut Jeans
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Instagram Reels var viral zhaleli original styling aani pure fabric collection. Direct from our Narayangaon branch to your doorstep anywhere in India.
            </p>

            {/* Call to action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  const element = document.getElementById('products-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl glow-btn flex items-center justify-center gap-2 font-bold text-sm tracking-wide shadow-lg"
              >
                <span>एक्सप्लोर करा (Explore Collection)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Namaste%2096K,%20mala%20latest%20stock%20aani%20catalog%20pathva.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#1e1e26] hover:bg-[#282833] text-white border border-[#343444] hover:border-[#D4AF37] flex items-center justify-center gap-2 text-sm font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp वर चॅट करा</span>
              </a>
            </div>

            {/* Quick Categories Bar */}
            <div className="pt-3">
              <span className="text-xs text-zinc-500 block mb-2 font-medium uppercase tracking-wider">Quick Pick:</span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {['Paper Linen', 'Bootcut Jeans', 'Festive & Party', 'Combos'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      onSelectCategory(cat);
                      const el = document.getElementById('products-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[#181820] hover:bg-[#D4AF37] text-zinc-300 hover:text-black border border-[#2b2b36] hover:border-[#D4AF37] transition-all font-medium"
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Hero Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md">
              
              {/* Highlight Card */}
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 bg-[#16161d] p-3 shadow-2xl relative group">
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
                    alt="Paper Linen Shirt"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d11] via-transparent to-black/30" />
                  
                  {/* Floating Badges */}
                  <div className="absolute top-3 left-3 bg-red-600/90 text-white text-[11px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow">
                    🔥 252K Views on Reel
                  </div>

                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold px-2.5 py-1 rounded-full">
                    👑 96K Special
                  </div>

                  {/* Card Bottom Meta */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0f0f14]/85 backdrop-blur-md border border-[#2d2d38]">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-bold text-sm">Paper Linen Shirt</h4>
                        <p className="text-xs text-zinc-400">Pure Breathable Summer & Festive Wear</p>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#D4AF37]">₹799</span>
                        <span className="text-[11px] text-zinc-500 line-through block">₹1,299</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Verified Badge */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#1a1a24] border border-[#D4AF37]/40 rounded-xl p-3 shadow-xl flex items-center gap-2.5 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-bold text-white">100% Genuine Fabric</div>
                  <div className="text-[10px] text-zinc-400">Direct From Shop Stock</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Brand Promises / Value Props */}
        <div className="mt-12 pt-8 border-t border-[#20202a] grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141c]/60 border border-[#22222e]">
            <Truck className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <div className="text-xs font-bold text-white">All India Delivery</div>
              <div className="text-[11px] text-zinc-400">Fast 2-4 Days Shipping</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141c]/60 border border-[#22222e]">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-xs font-bold text-white">Verified Brand</div>
              <div className="text-[11px] text-zinc-400">50,000+ Happy Customers</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141c]/60 border border-[#22222e]">
            <MessageCircle className="w-5 h-5 text-green-400" />
            <div>
              <div className="text-xs font-bold text-white">Direct WhatsApp</div>
              <div className="text-[11px] text-zinc-400">Easy Size & Fit Support</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#14141c]/60 border border-[#22222e]">
            <RefreshCw className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">Hassle-Free Exchange</div>
              <div className="text-[11px] text-zinc-400">Size fitting guarantee</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
