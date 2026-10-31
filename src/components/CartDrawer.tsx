'use client';

import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { STORE_INFO } from '../data/products';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalItems,
    subtotal,
    deliveryFee,
    totalAmount,
    generateWhatsAppOrderUrl,
  } = useCart();

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((subtotal / STORE_INFO.freeDeliveryThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, STORE_INFO.freeDeliveryThreshold - subtotal);

  const handleWhatsAppCheckout = () => {
    const url = generateWhatsAppOrderUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#13131a] border-l border-[#272736] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-[#232330] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h2 className="font-extrabold text-white text-base sm:text-lg">
                तुमची कार्ट (Your Cart)
              </h2>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#1f1f2b] text-[#D4AF37] border border-[#D4AF37]/30">
                {totalItems} items
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-xl bg-[#1c1c26] text-zinc-400 hover:text-white hover:bg-[#282836] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-4 py-3 bg-[#171722] border-b border-[#222230]">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className="text-zinc-300 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#D4AF37]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-400 font-bold">🎉 तुम्ही मोफत डिलिव्हरी मिळवली आहे! (Free Delivery Unlocked)</span>
                ) : (
                  <span>
                    अजून <strong className="text-[#D4AF37]">₹{amountNeededForFreeShipping}</strong> ची खरेदी करा, डिलिव्हरी मोफत मिळवा!
                  </span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#AA820A] to-[#D4AF37] transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-[#20202c]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#1b1b26] border border-[#2c2c3e] flex items-center justify-center text-zinc-500">
                  <ShoppingBag className="w-8 h-8 text-zinc-600" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">कार्ट रिकामी आहे (Cart is Empty)</h3>
                  <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                    96K ची ट्रेंडिंग पेपर लायनन शर्ट किंवा बूटकट जीन्स कार्टमध्ये ॲड करा!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-xl glow-btn text-black font-bold text-xs"
                >
                  शॉपिंग सुरू करा
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="pt-3 first:pt-0 flex gap-3.5 group"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-zinc-900 border border-[#2b2b3b] flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-zinc-500 hover:text-red-400 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Size & Color badges */}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#1e1e2b] text-[#D4AF37] border border-[#303042]">
                          Size: {item.selectedSize}
                        </span>
                        <span className="text-[10px] text-zinc-400">
                          {item.selectedColor}
                        </span>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="text-xs font-black text-white">
                        ₹{item.product.price * item.quantity}
                        {item.quantity > 1 && (
                          <span className="text-[10px] text-zinc-500 font-normal ml-1">
                            (₹{item.product.price} each)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center rounded-lg bg-[#1a1a24] border border-[#2d2d3e] overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)
                          }
                          className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-white/10"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-white min-w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)
                          }
                          className="px-2 py-0.5 text-zinc-400 hover:text-white hover:bg-white/10"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Total Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#232332] bg-[#101016] space-y-3">
              
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>डिलिव्हरी फी (Delivery):</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-400">मोफत (FREE)</span>
                  ) : (
                    <span className="font-bold text-white">₹{deliveryFee}</span>
                  )}
                </div>
                <div className="flex justify-between text-sm sm:text-base font-extrabold text-white pt-2 border-t border-[#252536]">
                  <span>एकूण रक्कम (Total):</span>
                  <span className="text-[#D4AF37]">₹{totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {/* Direct WhatsApp Order */}
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-white" />
                  <span>WhatsApp वर ऑर्डर पाठवा (Quick Order)</span>
                </button>

                {/* Direct Checkout (COD & Scan UPI) */}
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    onProceedToCheckout();
                  }}
                  className="w-full py-3 px-4 rounded-xl glow-btn text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>चेकआउट करा (COD / Scan UPI)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[10px] text-center text-zinc-500">
                🔒 सुरक्षित ऑर्डर • 100% ओरिजिनल 96K स्टॉक
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
