export type Category = 'All' | 'Paper Linen' | 'Bootcut Jeans' | 'Festive & Party' | 'Combos' | 'Oversized Tees';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewsCount: number;
  description: string;
  fabric: string;
  fit: string;
  badge?: string; // e.g. "Trending Reel", "Bestseller", "New Drop"
  images: string[];
  sizes: string[];
  inStock: boolean;
  colors: { name: string; hex: string }[];
  reelVideoUrl?: string;
  highlightFeatures: string[];
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
}

export type PaymentMethod = 'whatsapp' | 'cod' | 'upi_qr';

export interface Order {
  id: string;
  date: string;
  customer: CustomerDetails;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  deliveryCharge: number;
  paymentMethod: PaymentMethod;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered';
}
