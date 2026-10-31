import { Product } from '../types';

export const STORE_INFO = {
  name: "96K Men's Wear",
  tagline: "रोज काहीतरी नवीन... 🔥 Narayangaon",
  taglineEnglish: "Everyday Something New & Trending",
  whatsappNumber: "919021160336",
  displayPhone: "+91 9021160336",
  instagramUsername: "96k_mens_wear_narayangoan_",
  instagramUrl: "https://instagram.com/96k_mens_wear_narayangoan_",
  address: "Mukhy Shakha, Narayangaon, Pune - Maharashtra",
  upiId: "9021160336@ybl",
  freeDeliveryThreshold: 999,
  defaultDeliveryFee: 60,
};

export const PRODUCTS: Product[] = [
  {
    id: "96k-linen-01",
    name: "New Trending Paper Linen Shirt",
    category: "Paper Linen",
    price: 799,
    originalPrice: 1299,
    discountPercentage: 38,
    rating: 4.9,
    reviewsCount: 142,
    badge: "🔥 Trending on Reels (252K Views)",
    fabric: "100% Pure Lightweight Paper Linen",
    fit: "Regular Smart Fit",
    description: "The viral 96K Paper Linen shirt with premium breathable weave. Specially crafted for an ultra-sharp, royal look in any weather. Doesn't wrinkle easily and keeps you cool all day.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    colors: [
      { name: "Sky Blue", hex: "#7CB9E8" },
      { name: "Pista Green", hex: "#93C572" },
      { name: "Royal White", hex: "#F8F9FA" },
      { name: "Wine Maroon", hex: "#671A2E" }
    ],
    highlightFeatures: [
      "Breathable Paper Linen texture",
      "Premium wooden touch buttons",
      "Fade-resistant luxury dyes",
      "Perfect for casual & festive styling"
    ]
  },
  {
    id: "96k-bootcut-02",
    name: "Classic Acid Wash Bootcut Jeans",
    category: "Bootcut Jeans",
    price: 1199,
    originalPrice: 1899,
    discountPercentage: 37,
    rating: 4.8,
    reviewsCount: 98,
    badge: "⚡ Best Seller",
    fabric: "Heavyweight Stretch Denim",
    fit: "Bootcut Flare (Retro Fit)",
    description: "Viral 96K Retro Bootcut Jeans with washed texture. Flares gracefully over sneakers, boots, or Kolhapuris. High durability with just the right amount of comfort stretch.",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["28", "30", "32", "34", "36"],
    inStock: true,
    colors: [
      { name: "Charcoal Black Wash", hex: "#2B2B2B" },
      { name: "Vintage Indigo", hex: "#2C3E50" }
    ],
    highlightFeatures: [
      "Authentic bootcut bottom flare",
      "Reinforced double-stitch durability",
      "Comfort stretch spandex blend",
      "Custom 96K hardware & rivets"
    ]
  },
  {
    id: "96k-kdk-03",
    name: "KDK Special Festive Party Shirt",
    category: "Festive & Party",
    price: 899,
    originalPrice: 1499,
    discountPercentage: 40,
    rating: 5.0,
    reviewsCount: 215,
    badge: "👑 KDK Special Drop",
    fabric: "Lustrous Cotton Silk Blend",
    fit: "Tailored Royal Fit",
    description: "Designed for festivals, weddings, and special events. Soft sheen finish that catches the light naturally, featuring custom gold button details.",
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    inStock: true,
    colors: [
      { name: "Imperial Gold", hex: "#D4AF37" },
      { name: "Midnight Black", hex: "#121212" },
      { name: "Emerald Green", hex: "#046307" }
    ],
    highlightFeatures: [
      "Subtle royal festive sheen",
      "Structured spread collar",
      "Ideal for pairings with Nehru jackets or denim",
      "Skin-friendly anti-itch fabric"
    ]
  },
  {
    id: "96k-linen-half-04",
    name: "Summer Textured Cuban Collar Linen Shirt",
    category: "Paper Linen",
    price: 749,
    originalPrice: 1199,
    discountPercentage: 37,
    rating: 4.7,
    reviewsCount: 76,
    badge: "✨ New Arrival",
    fabric: "Slub Linen Blend",
    fit: "Relaxed Boxy Fit",
    description: "Relaxed Cuban collar design that looks effortlessly cool. Perfect for beach trips, vacations, or weekend outings.",
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1608234807905-4466023792f5?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M", "L", "XL"],
    inStock: true,
    colors: [
      { name: "Beige Cream", hex: "#F5F5DC" },
      { name: "Olive Green", hex: "#556B2F" }
    ],
    highlightFeatures: [
      "Camp / Cuban open collar",
      "Super airy breezy fabric",
      "Durable natural horn buttons"
    ]
  },
  {
    id: "96k-baggy-05",
    name: "96K Heavy Baggy Streetwear Cargo Jeans",
    category: "Bootcut Jeans",
    price: 1299,
    originalPrice: 1999,
    discountPercentage: 35,
    rating: 4.9,
    reviewsCount: 160,
    badge: "🔥 Reels Hype",
    fabric: "14oz Rugged Cotton Twill",
    fit: "Oversized Baggy Cargo",
    description: "6-pocket utilitarian baggy streetwear pants. Roomy thigh with tapered ankle finish. Built to handle everyday hustle while giving peak style.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["30", "32", "34", "36"],
    inStock: true,
    colors: [
      { name: "Military Olive", hex: "#4B5320" },
      { name: "Stealth Black", hex: "#1C1C1C" },
      { name: "Desert Sand", hex: "#C2B280" }
    ],
    highlightFeatures: [
      "6 Deep Utility Pockets",
      "Adjustable ankle cords",
      "Reinforced knee gussets"
    ]
  },
  {
    id: "96k-combo-06",
    name: "96K Viral Duo Combo (Paper Linen + Bootcut Jeans)",
    category: "Combos",
    price: 1799,
    originalPrice: 2899,
    discountPercentage: 38,
    rating: 5.0,
    reviewsCount: 310,
    badge: "💰 Maximum Value Combo",
    fabric: "Paper Linen + Heavy Denim",
    fit: "Complete Matching Outfit",
    description: "Get the iconic 96K signature look! Choose your preferred Paper Linen shirt color along with our best-selling Bootcut Jeans at a massive combo discount. Free Express Shipping included.",
    images: [
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80"
    ],
    sizes: ["M + 30", "L + 32", "XL + 34", "XXL + 36"],
    inStock: true,
    colors: [
      { name: "Blue Shirt + Black Jean", hex: "#1E3A8A" },
      { name: "White Shirt + Indigo Jean", hex: "#FFFFFF" }
    ],
    highlightFeatures: [
      "Save ₹1,100 directly on combo",
      "Pre-styled color combinations",
      "Free Express Delivery across India",
      "Complimentary 96K sticker pack"
    ]
  }
];

export const REELS_FEED = [
  {
    id: "reel-1",
    title: "New Trending Paper Linen Drop 🔥",
    views: "252K",
    likes: "34.5K",
    productId: "96k-linen-01",
    thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    tag: "Viral Paper Linen"
  },
  {
    id: "reel-2",
    title: "Bootcut Jeans Fit Check ⚡",
    views: "189K",
    likes: "22.1K",
    productId: "96k-bootcut-02",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    tag: "Bootcut Vibe"
  },
  {
    id: "reel-3",
    title: "KDK Special Festive Shirt 👑",
    views: "128K",
    likes: "19.8K",
    productId: "96k-kdk-03",
    thumbnail: "https://images.unsplash.com/photo-1620012253295-c15c429f66bf?auto=format&fit=crop&w=600&q=80",
    tag: "Festive King"
  },
  {
    id: "reel-4",
    title: "Complete 96K Outfit Combo Deal",
    views: "95K",
    likes: "14.2K",
    productId: "96k-combo-06",
    thumbnail: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=600&q=80",
    tag: "Duo Offer"
  }
];

export const TESTIMONIALS = [
  {
    id: "t1",
    name: "Rohit Babar",
    location: "Pune",
    rating: 5,
    comment: "Paper Linen shirt chi quality ek number aahe! Fitting ekdum perfect aali. Reels var baghitla hota, actual shirt pan tasech aahe.",
    verified: true,
  },
  {
    id: "t2",
    name: "Akshay Patil",
    location: "Nashik",
    rating: 5,
    comment: "Bootcut jeans flare is unbelievable. WhatsApp var order kela hota, 2 divsat delivery bhetli. 96K brand rock!",
    verified: true,
  },
  {
    id: "t3",
    name: "Pratik Gorde",
    location: "Narayangaon",
    rating: 5,
    comment: "96k is always top in trend. Kadak collection and fast response on WhatsApp. 10/10 recommended.",
    verified: true,
  }
];
