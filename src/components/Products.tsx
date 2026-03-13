import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../store';

export default function Products() {
  return (
    <section id="products" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Nuestros <span className="text-yellow-500 italic font-light">Productos</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Descubre piezas únicas diseñadas para elevar la estética de tu hogar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-colors"
            >
              <div className="aspect-[4/5] overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                  <span className="text-yellow-500 font-semibold">${product.price}</span>
                </div>
              </div>

              <div className="p-6 relative z-10 -mt-12 bg-gradient-to-t from-[#111] via-[#111] to-transparent pt-12">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
                  {product.description}
                </p>
                
                <button 
                  className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2 text-sm font-medium group/btn"
                >
                  <ShoppingBag className="w-4 h-4 text-yellow-500 group-hover/btn:scale-110 transition-transform" />
                  Agregar al carrito
                </button>
                <p className="text-center text-[10px] text-gray-500 mt-2 italic">
                  * Usa a HOM (el micrófono) para agregar este producto
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
