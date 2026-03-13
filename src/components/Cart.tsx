import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useStore } from '../store';

export default function Cart() {
  const { cart, isCartOpen, toggleCart, removeFromCart, clearCart } = useStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={toggleCart}
          />
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 right-0 md:bottom-6 md:right-6 w-full md:w-[400px] max-h-[80vh] bg-[#1A1A1A] border border-white/10 rounded-t-3xl md:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-yellow-500 w-6 h-6" />
                <h2 className="text-xl font-bold text-white tracking-tight">Tu Carrito</h2>
              </div>
              <button 
                onClick={toggleCart}
                className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-white/50">
                  <ShoppingBag className="w-12 h-12 mb-4 opacity-20" />
                  <p>Tu carrito está vacío</p>
                  <p className="text-sm mt-2">Usa el micrófono para agregar productos</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={item.id} 
                    className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded-xl"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.name}</h3>
                      <p className="text-white/50 text-xs mt-1">Cantidad: {item.quantity}</p>
                      <p className="text-yellow-500 font-semibold mt-1">${item.price * item.quantity}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-400 hover:bg-red-400/10 rounded-full transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white/70">Total</span>
                  <span className="text-2xl font-bold text-white">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                    Proceder al Pago
                  </button>
                  <button className="w-full py-4 bg-[#0070BA] text-white font-bold rounded-xl hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Pagar con PayPal
                  </button>
                  <button 
                    onClick={clearCart}
                    className="w-full py-3 text-white/50 hover:text-white text-sm font-medium transition-colors"
                  >
                    Vaciar Carrito
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
