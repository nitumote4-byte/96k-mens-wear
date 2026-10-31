'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { STORE_INFO } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  generateWhatsAppOrderUrl: (customerName?: string, phone?: string, address?: string, pincode?: string) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('96k_cart');
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('96k_cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, selectedSize: string, selectedColor: string, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prevCart, { product, selectedSize, selectedColor, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedSize: string, selectedColor: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      )
    );
  };

  const updateQuantity = (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize, selectedColor);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal >= STORE_INFO.freeDeliveryThreshold || subtotal === 0 ? 0 : STORE_INFO.defaultDeliveryFee;
  const totalAmount = subtotal + deliveryFee;

  const generateWhatsAppOrderUrl = (name = '', phone = '', address = '', pincode = '') => {
    let message = `*👑 नवीन ऑर्डर - 96K Men's Wear*\n\n`;
    message += `*ग्राहक तपशील (Customer Details):*\n`;
    if (name) message += `👤 नाव (Name): ${name}\n`;
    if (phone) message += `📞 फोन (Phone): ${phone}\n`;
    if (address) message += `🏠 पत्ता (Address): ${address}\n`;
    if (pincode) message += `📍 पिनकोड (Pincode): ${pincode}\n`;
    message += `\n*🛒 निवडलेले कपडे (Order Items):*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}*\n`;
      message += `   • Size: ${item.selectedSize} | Color: ${item.selectedColor}\n`;
      message += `   • Qty: ${item.quantity} x ₹${item.product.price} = ₹${item.quantity * item.product.price}\n`;
    });

    message += `\n───────────────\n`;
    message += `*Subtotal:* ₹${subtotal}\n`;
    message += `*Delivery:* ${deliveryFee === 0 ? 'FREE 🚚' : `₹${deliveryFee}`}\n`;
    message += `*💰 TOTAL AMOUNT: ₹${totalAmount}*\n\n`;
    message += `कृपया पेमेंट पद्धत (GPay/PhonePe QR किंवा Cash on Delivery) आणि कन्फर्मेशन पाठवा. धन्यवाद! 🙏`;

    return `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        totalItems,
        subtotal,
        deliveryFee,
        totalAmount,
        generateWhatsAppOrderUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
