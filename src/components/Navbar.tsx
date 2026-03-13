import { motion } from 'motion/react';
import { ShoppingCart } from 'lucide-react';
import { useStore } from '../store';

export default function Navbar() {
  const { cart, toggleCart } = useStore();
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 mix-blend-difference text-white"
    >
      <div className="text-xl font-bold tracking-tighter cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        DecoHome
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <button onClick={() => scrollTo('products')} className="hover:opacity-70 transition-opacity">Productos</button>
        <button onClick={() => scrollTo('about')} className="hover:opacity-70 transition-opacity">Nosotros</button>
        <button onClick={() => scrollTo('why-us')} className="hover:opacity-70 transition-opacity">Por qué elegirnos</button>
        <button onClick={() => scrollTo('testimonials')} className="hover:opacity-70 transition-opacity">Reviews</button>
        <button onClick={() => scrollTo('blog')} className="hover:opacity-70 transition-opacity">Blog</button>
      </div>

      <button 
        onClick={toggleCart}
        className="relative p-2 hover:opacity-70 transition-opacity"
      >
        <ShoppingCart className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-white text-black text-[10px] font-bold flex items-center justify-center rounded-full">
            {itemCount}
          </span>
        )}
      </button>
    </motion.nav>
  );
}
