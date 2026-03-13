import { motion } from 'motion/react';
import { Award, Gem, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Nuestra <span className="text-yellow-500 italic font-light">Tradición</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              En Amary Deco & Shop Home, creemos que cada espacio cuenta una historia. Durante más de una década, hemos seleccionado y creado piezas de decoración que no solo embellecen, sino que transforman hogares en refugios de inspiración y armonía.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Nuestra pasión por el diseño minimalista y la calidad excepcional nos impulsa a ofrecer colecciones únicas que reflejan elegancia y modernidad.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
              <Award className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold mb-2">15<span className="text-xl text-gray-500 font-light">+ Años</span></h3>
              <p className="text-sm text-gray-400">De experiencia transformando espacios</p>
            </div>
            
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-colors group">
              <Gem className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold mb-2">100<span className="text-xl text-gray-500 font-light">%</span></h3>
              <p className="text-sm text-gray-400">Materiales premium garantizados</p>
            </div>
            
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-colors group sm:col-span-2">
              <Sparkles className="w-10 h-10 text-yellow-500 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-4xl font-bold mb-2">500<span className="text-xl text-gray-500 font-light">+</span></h3>
              <p className="text-sm text-gray-400">Diseños exclusivos en nuestro catálogo</p>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
    </section>
  );
}
