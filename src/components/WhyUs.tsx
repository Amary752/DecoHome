import { motion } from 'motion/react';
import { Palette, ShieldCheck, Headset, Truck } from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      icon: <Palette className="w-8 h-8 text-yellow-500" />,
      title: "Diseños Únicos",
      description: "Piezas exclusivas que no encontrarás en otro lugar, diseñadas para destacar."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      title: "Materiales de Calidad",
      description: "Seleccionamos cuidadosamente cada material para garantizar durabilidad y elegancia."
    },
    {
      icon: <Headset className="w-8 h-8 text-yellow-500" />,
      title: "Atención Personalizada",
      description: "Nuestro agente de voz HOM está disponible para ayudarte a encontrar lo que buscas."
    },
    {
      icon: <Truck className="w-8 h-8 text-yellow-500" />,
      title: "Entrega Rápida",
      description: "Envíos seguros y veloces para que disfrutes de tu decoración sin demoras."
    }
  ];

  return (
    <section id="why-us" className="py-24 md:py-32 bg-black text-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            ¿Por qué <span className="text-yellow-500 italic font-light">Amary Deco</span>?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-colors group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-yellow-500/5 rounded-full blur-[150px] pointer-events-none" />
    </section>
  );
}
