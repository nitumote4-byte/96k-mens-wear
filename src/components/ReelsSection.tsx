'use client';

import React from 'react';
import { Play, Eye, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { REELS_FEED, PRODUCTS } from '../data/products';
import { Product } from '../types';

interface ReelsSectionProps {
  onSelectProduct: (product: Product) => void;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({ onSelectProduct }) => {
  return (
    <section className="py-12 bg-[#0b0b0e] border-b border-[#202029]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-950/60 border border-pink-700/40 text-pink-400 text-xs font-bold mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Instagram Reels Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              As Seen On <span className="gold-gradient-text">96K Reels 🔥</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm mt-1">
              Instagram var viral zhaleli original styling – tap to shop exact look!
            </p>
          </div>

          <a
            href="https://instagram.com/96k_mens_wear_narayangoan_/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 self-start sm:self-end"
          >
            <span>Instagram वरील सर्व Reels पहा</span>
            <span>→</span>
          </a>
        </div>

        {/* Reels Horizontal Scroll / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {REELS_FEED.map((reel) => {
            const product = PRODUCTS.find((p) => p.id === reel.productId);
            if (!product) return null;

            return (
              <div
                key={reel.id}
                className="group relative rounded-2xl overflow-hidden border border-[#262632] hover:border-[#D4AF37] transition-all duration-300 bg-[#14141c] flex flex-col cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
                onClick={() => onSelectProduct(product)}
              >
                {/* Thumbnail Image Container */}
                <div className="relative aspect-[9/16] overflow-hidden bg-zinc-900">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                  {/* Top Stats: Views */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold">
                    <Eye className="w-3 h-3 text-[#D4AF37]" />
                    <span>{reel.views}</span>
                  </div>

                  {/* Top Right: Tag */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-wide">
                    {reel.tag}
                  </div>

                  {/* Center Play Icon Glow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Meta on Video */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1.5">
                    <div className="flex items-center gap-1 text-[11px] text-pink-400 font-semibold">
                      <Heart className="w-3 h-3 fill-pink-500" />
                      <span>{reel.likes} Likes</span>
                    </div>

                    <h3 className="text-white text-xs sm:text-sm font-bold line-clamp-1 leading-snug">
                      {reel.title}
                    </h3>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-sm font-extrabold text-[#D4AF37]">
                        ₹{product.price}
                      </span>
                      <span className="text-[10px] text-zinc-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProduct(product);
                      }}
                      className="w-full mt-2 py-2 px-3 rounded-xl bg-[#D4AF37] text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow hover:brightness-110 transition-all"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Shop Look</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
