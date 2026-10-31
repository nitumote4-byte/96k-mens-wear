'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, MessageCircle, Instagram, Flame, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

export const Navbar: React.FC = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0d0d11]/90 border-b border-[#25252e]">
      {/* Top Flash Announcement Bar */}
      <div className="bg-gradient-to-r from-[#AA820A] via-[#D4AF37] to-[#AA820A] text-[#0d0d11] text-xs font-bold py-1.5 px-4 text-center flex items-center justify-center gap-2 tracking-wide">
        <Flame className="w-3.5 h-3.5 fill-current animate-bounce" />
        <span>फ्री डिलिव्हरी (Free Delivery) on orders over ₹{STORE_INFO.freeDeliveryThreshold} | रोज काहीतरी नवीन! 🔥</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* Crown + 96K Icon Badge */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#1e1e24] to-[#121217] border border-[#D4AF37]/40 flex flex-col items-center justify-center shadow-lg group-hover:border-[#D4AF37] transition-all">
              <span className="text-[#D4AF37] text-[10px] leading-none">👑</span>
              <span className="font-extrabold text-base sm:text-lg tracking-tighter text-white font-display">96K</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                  96-k MEN'S WEAR
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500" title="Verified Brand"></span>
              </div>
              <span className="text-[11px] text-[#A1A1AA] tracking-wider uppercase flex items-center gap-1">
                <span className="text-[#D4AF37]">★</span> शाखा नारायणगाव (Pune)
              </span>
            </div>
          </Link>

          {/* Quick Contact & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Instagram link */}
            <a
              href={STORE_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-[#1e1e24] hover:bg-[#282832] text-pink-400 border border-[#2c2c38] transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>50.5K Followers</span>
            </a>

            {/* Direct WhatsApp Call/Chat */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Namaste%2096K%20Mens%20Wear,%20mala%20orders%20baddal%20mahiti%20havi%20aahe.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-300 border border-emerald-800/60 transition-all"
              title="Chat with Store on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-400" />
              <span className="hidden md:inline">WhatsApp Support</span>
              <span className="md:hidden">Help</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-[#1a1a22] hover:bg-[#252530] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-white flex items-center justify-center group"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-[#0d0d11] font-black text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
