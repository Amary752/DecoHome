import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Scale from 1.2 to 1
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  
  // Opacity from 1 to 0
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  // Blur effect from 10px to 0px
  const blur = useTransform(scrollYProgress, [0, 0.3], ["blur(10px)", "blur(0px)"]);
  
  // Y translation for parallax text
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Video Background */}
        <motion.div 
          style={{ scale }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-black/40 z-10" /> {/* Dark overlay for better text contrast */}
          <video
            src="https://res.cloudinary.com/dqrcd0txi/video/upload/v1772762248/Elevated_ceramic_vase_transition_e8205dcc1b_ketgai.mp4"
            muted
            playsInline
            autoPlay
            loop
            preload="auto"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div 
          style={{ opacity, y }}
          className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1 
            style={{ filter: blur }}
            className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-6 uppercase"
          >
            <span className="text-white">Deco</span>
            <span className="text-yellow-500">Home</span>
          </motion.h1>
          
          <p className="text-lg md:text-2xl text-gray-200 font-light max-w-2xl mx-auto mb-10">
            Artículos de decoración que transforman tus espacios
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button 
              onClick={scrollToProducts}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wide hover:bg-gray-200 transition-colors w-full sm:w-auto"
            >
              Explorar Colección
            </button>
            <button 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-transparent border border-white text-white font-semibold text-sm tracking-wide hover:bg-white/10 transition-colors w-full sm:w-auto"
            >
              Nuestra Historia
            </button>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
