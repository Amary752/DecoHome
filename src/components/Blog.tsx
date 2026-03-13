import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: "Tendencias en decoración del hogar para 2026",
      excerpt: "Descubre los colores, texturas y estilos que dominarán el diseño de interiores este año.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800",
      date: "15 Oct 2025"
    },
    {
      title: "Cómo elegir los accesorios decorativos ideales",
      excerpt: "Guía práctica para seleccionar piezas que complementen tu estilo sin sobrecargar el espacio.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=800",
      date: "02 Nov 2025"
    },
    {
      title: "Consejos para seleccionar jarrones y portavelas",
      excerpt: "Aprende a combinar formas y materiales para crear centros de mesa espectaculares.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      date: "20 Nov 2025"
    }
  ];

  return (
    <section id="blog" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Inspiración para tu <span className="text-yellow-500 italic font-light">Hogar</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg font-light"
            >
              Ideas, consejos y tendencias para decorar y transformar tus espacios.
            </motion.p>
          </div>
          <motion.button 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors font-medium group"
          >
            Ver todos los artículos
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-yellow-500 text-sm font-medium">{post.date}</span>
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
              <h3 className="text-2xl font-bold mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-gray-400 font-light leading-relaxed line-clamp-2">
                {post.excerpt}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
