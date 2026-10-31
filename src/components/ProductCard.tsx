'use client';

import React, { useState } from 'react';
import { Star, ShoppingBag, MessageCircle, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenDetails }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Standard');
  const [isAddedAnimation, setIsAddedAnimation] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1500);
  };

  const handleWhatsAppQuickOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `*👑 Quick Order - 96K Men's Wear*\n\n` +
      `Product: *${product.name}*\n` +
      `Size: *${selectedSize}*\n` +
      `Color: *${selectedColor}*\n` +
      `Price: *₹${product.price}*\n\n` +
      `Namaste, mala ha item order karaycha aahe. Payment aani delivery details share kara.`;
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div
      onClick={() => onOpenDetails(product)}
      className="group relative rounded-2xl bg-[#14141c] border border-[#252532] hover:border-[#D4AF37]/80 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Shadow at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#14141c] via-[#14141c]/40 to-transparent pointer-events-none" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#AA820A] text-black shadow-md">
              {product.badge}
            </span>
          )}
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white shadow">
            {product.discountPercentage}% OFF
          </span>
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(product);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#D4AF37] hover:text-black"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Floating Size Pill Selector on Image Hover */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-1.5 bg-black/75 backdrop-blur-md p-1.5 rounded-xl border border-white/10"
        >
          <span className="text-[10px] font-semibold text-zinc-400 mr-1">Size:</span>
          {product.sizes.map((sz) => (
            <button
              key={sz}
              onClick={() => setSelectedSize(sz)}
              className={`text-[11px] font-bold px-2 py-0.5 rounded-md transition-all ${
                selectedSize === sz
                  ? 'bg-[#D4AF37] text-black shadow'
                  : 'text-zinc-300 hover:bg-white/10'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[11px] text-[#D4AF37]/80">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500 text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Fabric & Fit Subtitle */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-1">
            {product.fabric} • {product.fit}
          </p>

          {/* Color options preview */}
          {product.colors && product.colors.length > 0 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 mt-2.5"
            >
              <span className="text-[10px] text-zinc-500">Colors:</span>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === c.name ? 'border-[#D4AF37] scale-125 ring-1 ring-[#D4AF37]' : 'border-zinc-700'
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                />
              ))}
              <span className="text-[10px] text-zinc-400 ml-1">{selectedColor}</span>
            </div>
          )}
        </div>

        {/* Pricing & CTA Buttons */}
        <div className="pt-2 border-t border-[#22222d] space-y-2">
          
          <div className="flex items-baseline gap-2">
            <span className="text-lg sm:text-xl font-black text-white">
              ₹{product.price}
            </span>
            <span className="text-xs text-zinc-500 line-through">
              ₹{product.originalPrice}
            </span>
            <span className="text-[11px] font-bold text-emerald-400 ml-auto">
              Save ₹{product.originalPrice - product.price}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            
            {/* Quick Add To Cart */}
            <button
              onClick={handleQuickAdd}
              className={`py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 border transition-all ${
                isAddedAnimation
                  ? 'bg-emerald-600 border-emerald-500 text-white'
                  : 'bg-[#1e1e28] hover:bg-[#282836] border-[#38384a] text-white hover:border-[#D4AF37]'
              }`}
            >
              {isAddedAnimation ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add Cart</span>
                </>
              )}
            </button>

            {/* Direct WhatsApp Order */}
            <button
              onClick={handleWhatsAppQuickOrder}
              className="py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-600/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
              title="Order this directly on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
