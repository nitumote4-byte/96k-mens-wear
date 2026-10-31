'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroBanner } from '../components/HeroBanner';
import { ReelsSection } from '../components/ReelsSection';
import { ProductCard } from '../components/ProductCard';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { CheckoutModal } from '../components/CheckoutModal';
import { Footer } from '../components/Footer';
import { PRODUCTS, STORE_INFO } from '../data/products';
import { Category, Product } from '../types';
import { Sparkles, Search, SlidersHorizontal, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORIES: Category[] = [
  'All',
  'Paper Linen',
  'Bootcut Jeans',
  'Festive & Party',
  'Combos',
];

export default function HomePage() {
  const { totalItems, totalAmount, setIsCartOpen } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'lowToHigh' | 'highToLow'>('featured');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' ? true : item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.fabric.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'lowToHigh') return a.price - b.price;
      if (sortBy === 'highToLow') return b.price - a.price;
      return b.rating - a.rating; // default: featured / highest rating
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0d0d11]">
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Showcase */}
      <HeroBanner onSelectCategory={(cat) => setSelectedCategory(cat as Category)} />

      {/* Instagram Reels Video Section */}
      <ReelsSection onSelectProduct={(p) => setActiveProduct(p)} />

      {/* Main Catalog Section */}
      <main id="products-section" className="flex-1 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Catalog Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full Store Collection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              सर्व कलेक्शन (Trending Outfits)
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              दाखवले जात आहेत {filteredProducts.length} खास सिलेक्टेड डिझाईन्स
            </p>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Search shirt, jeans, linen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#14141c] border border-[#272736] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#14141c] border border-[#272736] rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="featured">🔥 Popular First</option>
              <option value="lowToHigh">₹ Price: Low to High</option>
              <option value="highToLow">₹ Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg'
                  : 'bg-[#14141c] text-zinc-400 border-[#262634] hover:border-zinc-500 hover:text-white'
              }`}
            >
              {cat === 'All' ? '⚡ All Products' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setActiveProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#121218] rounded-3xl border border-[#22222e] p-8">
            <p className="text-base font-semibold text-white">कोणताही प्रॉडक्ट सापडला नाही (No items found)</p>
            <p className="text-xs text-zinc-500 mt-1">दुसरा शब्द शोधून पहा किंवा कॅटेगरी बदला.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#20202c] text-xs font-bold text-amber-300 hover:bg-[#282838]"
            >
              सर्व प्रॉडक्ट्स दाखवा
            </button>
          </div>
        )}

      </main>

      {/* Sticky Mobile Quick Order Bar */}
      {totalItems > 0 && (
        <div className="sticky bottom-0 z-30 sm:hidden bg-[#101017]/95 backdrop-blur-md border-t border-[#262638] p-3 shadow-2xl">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] text-zinc-400">
                {totalItems} items in Cart
              </div>
              <div className="text-sm font-extrabold text-[#D4AF37]">
                ₹{totalAmount}
              </div>
            </div>

            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="flex-1 py-2.5 px-4 rounded-xl glow-btn text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>ऑर्डर करा (Checkout)</span>
            </button>
          </div>
        </div>
      )}

      {/* Modals & Slide-over Drawers */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onOpenCheckoutDirectly={() => setIsCheckoutOpen(true)}
      />

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* Store Footer */}
      <Footer />

    </div>
  );
}
