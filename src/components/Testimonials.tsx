import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Laura Gómez",
      text: "Los jarrones de la colección premium transformaron por completo mi sala. La calidad es excepcional y el diseño es exactamente lo que buscaba para un estilo minimalista.",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Carlos Martínez",
      text: "El set decorativo que compré para mi oficina le dio un toque de elegancia increíble. Además, la atención de HOM fue muy útil para decidirme.",
      image: "https://i.pravatar.cc/150?img=11"
    },
    {
      name: "Ana Silva",
      text: "Me encanta la decoración de temporada. Siempre encuentro piezas únicas que hacen que mi hogar se sienta renovado y acogedor. ¡Totalmente recomendado!",
      image: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Lo que dicen <span className="text-yellow-500 italic font-light">nuestros clientes</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-colors flex flex-col items-center text-center relative"
            >
              <div className="absolute -top-10 w-20 h-20 rounded-full overflow-hidden border-4 border-black">
                <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex gap-1 mb-6 mt-8 text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed font-light italic mb-6 flex-1">
                "{testimonial.text}"
              </p>
              
              <h3 className="text-lg font-bold">{testimonial.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/3 pointer-events-none" />
    </section>
  );
}
