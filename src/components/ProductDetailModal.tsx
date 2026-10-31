'use client';

import React, { useState } from 'react';
import { X, Star, Truck, ShieldCheck, MessageCircle, ShoppingBag, Check, MapPin, ChevronRight, Ruler } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data/products';
import { useCart } from '../context/CartContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenCheckoutDirectly?: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenCheckoutDirectly,
}) => {
  const { addToCart, setIsCartOpen } = useCart();
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  // Initialize selected values whenever product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0]);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]?.name || 'Standard');
      setQuantity(1);
      setPincodeStatus(null);
      setIsAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6) {
      setPincodeStatus('error');
      return;
    }
    // Realistic Indian delivery check:
    if (pincode.startsWith('41') || pincode.startsWith('40')) {
      setPincodeStatus('fast_mh'); // Maharashtra / Pune / Mumbai
    } else {
      setPincodeStatus('standard');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
    setIsCartOpen(true);
    if (onOpenCheckoutDirectly) {
      onOpenCheckoutDirectly();
    }
  };

  const handleWhatsAppOrder = () => {
    const msg = `*👑 Direct Order - 96K Men's Wear*\n\n` +
      `Product: *${product.name}*\n` +
      `Category: ${product.category}\n` +
      `Size: *${selectedSize}*\n` +
      `Color: *${selectedColor}*\n` +
      `Qty: ${quantity}\n` +
      `Price: *₹${product.price * quantity}*\n\n` +
      `*Pincode:* ${pincode ? pincode : 'Maharashtra'}\n\n` +
      `Namaste! Mala ha piece book karaycha aahe. Payment QR aani delivery timeline pathva please.`;
    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#14141c] border border-[#2e2e3e] rounded-3xl overflow-hidden shadow-2xl my-8">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-4 sm:p-6 bg-[#0f0f14] flex flex-col gap-3">
            
            {/* Main Preview Image */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#252533] bg-zinc-950">
              <img
                src={selectedImage || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-[#AA820A] text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`relative w-16 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === img ? 'border-[#D4AF37] scale-105' : 'border-zinc-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality stamp */}
            <div className="flex items-center justify-around py-3 px-2 rounded-xl bg-[#181822] border border-[#262635] text-center text-xs text-zinc-300">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine</span>
              </div>
              <div className="text-zinc-600">•</div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                <span>Fast Dispatch</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Info & Order actions */}
          <div className="p-5 sm:p-8 flex flex-col justify-between space-y-6 max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Category & Rating */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-[#1e1e28] px-2.5 py-1 rounded-full border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-zinc-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                {product.name}
              </h2>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-3 border-b border-[#252535]">
                <span className="text-2xl sm:text-3xl font-black text-white">
                  ₹{product.price}
                </span>
                <span className="text-sm text-zinc-500 line-through">
                  ₹{product.originalPrice}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {product.discountPercentage}% OFF
                </span>
              </div>

              {/* Fabric & Fit badges */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#1a1a24] border border-[#2b2b3a]">
                  <span className="text-zinc-500 block text-[10px]">Fabric</span>
                  <span className="font-semibold text-zinc-200">{product.fabric}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-[#1a1a24] border border-[#2b2b3a]">
                  <span className="text-zinc-500 block text-[10px]">Fit Style</span>
                  <span className="font-semibold text-zinc-200">{product.fit}</span>
                </div>
              </div>

              {/* Size Selector + Size Chart link */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-zinc-300">
                    Select Size: <span className="text-[#D4AF37]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setShowSizeChart(!showSizeChart)}
                    className="text-xs text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>{showSizeChart ? 'Hide Size Chart' : 'Size Chart (इंच)'}</span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-12 py-2 px-3 rounded-xl font-bold text-sm border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg scale-105'
                          : 'bg-[#181822] text-zinc-300 border-[#2b2b3b] hover:border-[#D4AF37]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Size Chart Popup / Dropdown */}
                {showSizeChart && (
                  <div className="mt-3 p-3 rounded-xl bg-[#0e0e14] border border-[#D4AF37]/40 text-xs">
                    <div className="font-bold text-[#D4AF37] mb-2">📏 Indian Standard Sizing (Inches):</div>
                    <table className="w-full text-left border-collapse text-zinc-300">
                      <thead>
                        <tr className="border-b border-zinc-800 text-[11px] text-zinc-500">
                          <th className="py-1">Size</th>
                          <th className="py-1">Chest (छाती)</th>
                          <th className="py-1">Length (लांबी)</th>
                          <th className="py-1">Shoulder</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900 text-xs">
                        <tr>
                          <td className="py-1 font-bold text-white">M</td>
                          <td className="py-1">38 - 40"</td>
                          <td className="py-1">28"</td>
                          <td className="py-1">17.5"</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-bold text-white">L</td>
                          <td className="py-1">40 - 42"</td>
                          <td className="py-1">29"</td>
                          <td className="py-1">18.5"</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-bold text-white">XL</td>
                          <td className="py-1">42 - 44"</td>
                          <td className="py-1">30"</td>
                          <td className="py-1">19.5"</td>
                        </tr>
                        <tr>
                          <td className="py-1 font-bold text-white">XXL</td>
                          <td className="py-1">44 - 46"</td>
                          <td className="py-1">31"</td>
                          <td className="py-1">20.5"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Color Selector */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <span className="text-xs font-bold text-zinc-300 block mb-2">
                    Select Color: <span className="text-zinc-100">{selectedColor}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                          selectedColor === c.name
                            ? 'bg-[#222230] border-[#D4AF37] text-white ring-1 ring-[#D4AF37]'
                            : 'bg-[#181822] border-[#2a2a38] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-300">Quantity:</span>
                <div className="flex items-center rounded-xl bg-[#181822] border border-[#2e2e3e] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-zinc-300 hover:bg-white/10 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-bold text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-zinc-300 hover:bg-white/10 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Pincode Delivery Check */}
              <div className="p-3 rounded-2xl bg-[#161622] border border-[#272738] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Check Delivery Date & COD:</span>
                </div>
                <form onSubmit={handlePincodeCheck} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (उदा. 410504)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    className="flex-1 bg-[#0f0f15] border border-[#303042] rounded-xl px-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl bg-[#252536] hover:bg-[#D4AF37] hover:text-black text-xs font-bold text-zinc-200 transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeStatus === 'fast_mh' && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    ✓ Express Delivery in 2-3 Days to Maharashtra! Cash on Delivery available.
                  </p>
                )}
                {pincodeStatus === 'standard' && (
                  <p className="text-[11px] text-blue-400 flex items-center gap-1">
                    ✓ Delivery available in 4-6 business days via Delhivery/Shiprocket.
                  </p>
                )}
                {pincodeStatus === 'error' && (
                  <p className="text-[11px] text-red-400">
                    कृपया योग्य ६ अंकी पिनकोड टाका.
                  </p>
                )}
              </div>

            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-4 border-t border-[#222232]">
              
              <div className="grid grid-cols-2 gap-2.5">
                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all ${
                    isAdded
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-[#1c1c28] hover:bg-[#252535] border-[#38384d] text-white hover:border-[#D4AF37]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {/* Buy Now (Direct Checkout) */}
                <button
                  onClick={handleBuyNow}
                  className="py-3 px-4 rounded-xl glow-btn text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>Buy Now</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Direct WhatsApp Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current text-white" />
                <span>WhatsApp वर थेट ऑर्डर करा (Direct WhatsApp Order)</span>
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
