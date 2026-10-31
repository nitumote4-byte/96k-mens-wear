'use client';

import React from 'react';
import { Instagram, MessageCircle, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO, TESTIMONIALS } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0d] border-t border-[#1e1e28] text-zinc-400 text-xs">
      
      {/* Customer Reviews Spotlight */}
      <div className="border-b border-[#181822] py-10 bg-[#0e0e13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
              Customer Love
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              आमच्या ग्राहकांचे अनुभव (What Customers Say) ⭐
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-[#14141d] border border-[#232332] flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-zinc-300 text-xs italic leading-relaxed">
                  "{t.comment}"
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800 text-[11px]">
                  <div>
                    <span className="font-bold text-white block">{t.name}</span>
                    <span className="text-zinc-500">{t.location}</span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e1e24] to-[#121217] border border-[#D4AF37]/50 flex flex-col items-center justify-center">
                <span className="text-[#D4AF37] text-[10px]">👑</span>
                <span className="font-extrabold text-sm text-white">96K</span>
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">96-k MEN'S WEAR</h4>
                <p className="text-[11px] text-[#D4AF37]">रोज काहीतरी नवीन... 🔥</p>
              </div>
            </div>

            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm">
              Trending Paper Linen Shirts, Bootcut Jeans, and Festive Outfits. Official store for Instagram's fastest-growing menswear community.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={STORE_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181822] hover:bg-pink-950/60 hover:text-pink-400 border border-zinc-800 transition-colors text-white text-xs font-semibold"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>50.5K on Instagram</span>
              </a>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181822] hover:bg-emerald-950/60 hover:text-emerald-400 border border-zinc-800 transition-colors text-white text-xs font-semibold"
              >
                <MessageCircle className="w-4 h-4 text-emerald-500" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>

          {/* Owners & Shop Info */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              शाखा आणि संपर्क (Store Info)
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>{STORE_INFO.displayPhone}</span>
              </li>
              <li className="pt-2 text-zinc-400">
                <span className="text-zinc-500 block text-[11px]">Store Owners:</span>
                <span className="text-white font-medium">@saurabhauti 96k</span> & <span className="text-white font-medium">@digu auti 96k</span>
              </li>
            </ul>
          </div>

          {/* Customer Support & Policies */}
          <div className="space-y-3">
            <h5 className="font-bold text-white uppercase tracking-wider text-xs">
              कस्टमर केअर (Support)
            </h5>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-white transition-colors cursor-pointer">
                ✓ Size Fitting & Measurement Guide
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                ✓ Cash on Delivery (COD) Rules
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                ✓ 7-Day Size Exchange Guarantee
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                ✓ All India Courier Tracking
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-10 pt-6 border-t border-[#1a1a24] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} 96K Men's Wear. सर्व हक्क राखीव (All Rights Reserved).</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for 96K Brand Fans</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
