'use client';

import React, { useState } from 'react';
import { X, CheckCircle, Truck, QrCode, MessageCircle, ShieldCheck, ArrowRight, Copy, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CustomerDetails, PaymentMethod } from '../types';
import { STORE_INFO } from '../data/products';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, deliveryFee, totalAmount, clearCart, generateWhatsAppOrderUrl } = useCart();

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('whatsapp');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [copiedUpi, setCopiedUpi] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(STORE_INFO.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customer.name || !customer.phone || !customer.address || !customer.pincode) {
      alert('कृपया सर्व आवश्यक माहिती (नाव, फोन, पत्ता, पिनकोड) भरा.');
      return;
    }

    const generatedId = `96K-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // ignore
    }

    if (paymentMethod === 'whatsapp') {
      const waUrl = generateWhatsAppOrderUrl(customer.name, customer.phone, customer.address, customer.pincode);
      window.open(waUrl, '_blank');
    }

    setIsSubmitted(true);
  };

  const handleFinish = () => {
    clearCart();
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#13131b] border border-[#2b2b3d] rounded-3xl overflow-hidden shadow-2xl my-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#1e1e2b] hover:bg-[#2c2c3d] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-1">
                <span>👑 96K Men's Wear Direct Checkout</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                ऑर्डर तपशील (Order & Shipping Details)
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                पेमेंट गेटवेची गरज नाही! WhatsApp, COD किंवा थेट UPI ने ऑर्डर कन्फर्म करा.
              </p>
            </div>

            {/* Customer Information Inputs */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                १. पत्ता आणि संपर्क (Shipping Info)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    पूर्ण नाव (Full Name) *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="उदा. राहुल जाधव"
                    value={customer.name}
                    onChange={handleInputChange}
                    className="w-full bg-[#0d0d12] border border-[#2b2b3d] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    WhatsApp मोबाईल नंबर *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    maxLength={10}
                    placeholder="उदा. 98XXXXXXXX"
                    value={customer.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#0d0d12] border border-[#2b2b3d] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1">
                  घर/दुकान नंबर आणि गल्ली (Full Delivery Address) *
                </label>
                <textarea
                  name="address"
                  required
                  rows={2}
                  placeholder="उदा. फ्लॅट क्र. ४, साई रेसिडेन्सी, कॉलेज रोड..."
                  value={customer.address}
                  onChange={handleInputChange}
                  className="w-full bg-[#0d0d12] border border-[#2b2b3d] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    गाव / शहर (City / Town) *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="उदा. नारायणगाव, पुणे"
                    value={customer.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#0d0d12] border border-[#2b2b3d] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    ६-अंकी पिनकोड (Pincode) *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    placeholder="उदा. 410504"
                    value={customer.pincode}
                    onChange={handleInputChange}
                    className="w-full bg-[#0d0d12] border border-[#2b2b3d] rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-2 border-t border-[#232332]">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                २. पेमेंट पद्धत निवडा (Choose Payment Mode)
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                {/* Method 1: WhatsApp Direct */}
                <div
                  onClick={() => setPaymentMethod('whatsapp')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'whatsapp'
                      ? 'bg-emerald-950/50 border-emerald-500 ring-1 ring-emerald-500'
                      : 'bg-[#181822] border-[#29293a] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">WhatsApp Order</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    ऑर्डर डिटेल्स थेट WhatsApp वर पाठवून कन्फर्म करा.
                  </p>
                </div>

                {/* Method 2: Cash On Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'bg-[#20202e] border-[#D4AF37] ring-1 ring-[#D4AF37]'
                      : 'bg-[#181822] border-[#29293a] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span className="text-xs font-bold text-white">Cash on Delivery</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    पार्सल घरी आल्यावर रोख किंवा स्कॅन करून पैसे द्या.
                  </p>
                </div>

                {/* Method 3: Direct Scan & Pay UPI */}
                <div
                  onClick={() => setPaymentMethod('upi_qr')}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'upi_qr'
                      ? 'bg-amber-950/50 border-amber-500 ring-1 ring-amber-500'
                      : 'bg-[#181822] border-[#29293a] hover:border-zinc-600'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <QrCode className="w-4 h-4 text-amber-400" />
                    <span className="text-xs font-bold text-white">Scan & Pay (UPI)</span>
                  </div>
                  <p className="text-[11px] text-zinc-400">
                    PhonePe / Google Pay QR कोड स्कॅन करून भरा.
                  </p>
                </div>

              </div>

              {/* UPI QR Display box if upi_qr selected */}
              {paymentMethod === 'upi_qr' && (
                <div className="p-4 rounded-2xl bg-[#0f0f15] border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center gap-4">
                  <div className="bg-white p-2.5 rounded-xl shadow-md">
                    {/* Generates a clean dynamic QR representation */}
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=upi://pay?pa=${STORE_INFO.upiId}&pn=96k%20Mens%20Wear&am=${totalAmount}&cu=INR`}
                      alt="UPI QR Code"
                      className="w-28 h-28"
                    />
                  </div>

                  <div className="space-y-1.5 text-center sm:text-left text-xs">
                    <div className="font-bold text-amber-300">
                      स्कॅन करा: ₹{totalAmount} (PhonePe, GPay, Paytm)
                    </div>
                    <div className="text-zinc-400 text-[11px]">
                      दुकानदाराचा UPI ID:
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <code className="bg-[#1b1b24] px-2.5 py-1 rounded-md text-amber-200 font-mono text-xs border border-zinc-800">
                        {STORE_INFO.upiId}
                      </code>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="p-1 rounded bg-[#222230] text-zinc-300 hover:text-white"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] text-zinc-500 pt-1">
                      पेमेंट झाल्यावर खालील बटनावर क्लिक करा.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Order Price Summary */}
            <div className="p-4 rounded-2xl bg-[#0f0f14] border border-[#222230] space-y-1.5 text-xs">
              <div className="flex justify-between text-zinc-400">
                <span>एकूण वस्तू (Items):</span>
                <span>{cart.length} प्रकारचे कपडे</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>Subtotal:</span>
                <span className="font-bold text-white">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-zinc-400">
                <span>डिलिव्हरी फी (Shipping):</span>
                <span className={deliveryFee === 0 ? 'text-emerald-400 font-bold' : 'text-white'}>
                  {deliveryFee === 0 ? 'मोफत (FREE)' : `₹${deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-zinc-800">
                <span>देय एकूण रक्कम (Total):</span>
                <span className="text-[#D4AF37]">₹{totalAmount}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl glow-btn text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl"
            >
              <span>ऑर्डर कन्फर्म करा (Confirm Order ₹{totalAmount})</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>
        ) : (
          /* Order Placed Success Screen */
          <div className="p-8 sm:p-12 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
                ऑर्डर यशस्वीरित्या नोंदवली गेली!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                धन्यवाद, {customer.name}! 👑
              </h2>
              <p className="text-xs text-zinc-400">
                तुमचा ऑर्डर आयडी आहे: <strong className="text-white font-mono">{orderId}</strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0f15] border border-[#242436] text-xs text-left max-w-md mx-auto space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">पेमेंट पद्धत:</span>
                <span className="font-bold text-white uppercase">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">मोबाईल:</span>
                <span className="font-bold text-white">{customer.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">डिलिव्हरी पत्ता:</span>
                <span className="text-right font-medium text-zinc-200 line-clamp-1">{customer.address}, {customer.city}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-zinc-800 font-bold">
                <span className="text-zinc-300">एकूण बिल:</span>
                <span className="text-[#D4AF37] text-sm">₹{totalAmount}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 max-w-md mx-auto">
              <a
                href={generateWhatsAppOrderUrl(customer.name, customer.phone, customer.address, customer.pincode)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp वर थेट अपडेट मिळवा</span>
              </a>

              <button
                onClick={handleFinish}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1e1e28] hover:bg-[#282836] text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-700 transition-colors"
              >
                दुकान पेजवर परत जा (Back to Store)
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
