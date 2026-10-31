import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';

export const metadata: Metadata = {
  title: "96-k Men's Wear Narayangaon | Trending Linen Shirts & Bootcut Jeans",
  description: "Official online store of 96K Men's Wear Narayangaon (50K+ Instagram Followers). Shop viral Paper Linen Shirts, Retro Bootcut Jeans, KDK Festive collection, and Combos with Cash on Delivery and WhatsApp order support.",
  openGraph: {
    title: "96-k Men's Wear Narayangaon 🔥",
    description: "रोज काहीतरी नवीन... Shop trending Paper Linen Shirts & Bootcut Jeans directly on WhatsApp & COD.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr-IN">
      <head>
        <meta name="theme-color" content="#0d0d11" />
      </head>
      <body className="bg-[#0d0d11] text-[#ededed] antialiased min-h-screen flex flex-col selection:bg-[#D4AF37] selection:text-black">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
