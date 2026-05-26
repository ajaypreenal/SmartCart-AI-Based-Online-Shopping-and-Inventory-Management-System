import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, CreditCard, CheckCircle } from 'lucide-react';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckingOut(true);
    // Simulate API call for payment
    setTimeout(() => {
      setCheckingOut(false);
      setSuccess(true);
      clearCart();
      setTimeout(() => {
        setSuccess(false);
        setIsCartOpen(false);
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-surface dark:bg-dark-surface shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-primary-100 dark:border-primary-800 flex justify-between items-center bg-primary-50 dark:bg-primary-900/20">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Your Cart
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">{cart.length}</span>
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-1 hover:bg-primary-200 dark:hover:bg-primary-800 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {success ? (
            <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
              <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">Payment Successful!</h3>
              <p className="text-text-muted">Your order has been placed.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted">
              <div className="text-5xl mb-4">🛒</div>
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 p-3 rounded-xl border border-primary-100 dark:border-primary-800 bg-white/50 dark:bg-black/20">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-2xl">📦</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                  <div className="flex justify-between items-end mt-2">
                    <p className="font-bold text-primary-600 dark:text-primary-400">₹{item.price}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted">Qty: {item.quantity}</span>
                      <button 
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {!success && cart.length > 0 && (
          <div className="p-4 border-t border-primary-100 dark:border-primary-800 bg-background dark:bg-dark-background">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold text-text-muted">Total</span>
              <span className="text-2xl font-black">₹{total.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full bg-accent-500 hover:bg-accent-600 disabled:bg-accent-300 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-accent-500/30"
            >
              {checkingOut ? (
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  <CreditCard className="w-5 h-5" />
                  Checkout Now
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
