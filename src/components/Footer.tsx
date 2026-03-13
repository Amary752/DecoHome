import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tighter uppercase">
              <span className="text-white">Deco</span>
              <span className="text-yellow-500">Home</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed text-sm">
              Artículos de decoración que transforman tus espacios. Diseños exclusivos y materiales premium para crear hogares con alma.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Enlaces Rápidos</h3>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li><a href="#products" className="hover:text-yellow-500 transition-colors">Productos</a></li>
              <li><a href="#about" className="hover:text-yellow-500 transition-colors">Nuestra Historia</a></li>
              <li><a href="#why-us" className="hover:text-yellow-500 transition-colors">Por qué elegirnos</a></li>
              <li><a href="#blog" className="hover:text-yellow-500 transition-colors">Blog de Inspiración</a></li>
              <li><a href="#faq" className="hover:text-yellow-500 transition-colors">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4 text-gray-400 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>Av. Principal 123, Ciudad de Diseño, CP 10000</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-yellow-500 shrink-0" />
                <span>hola@amarydeco.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Newsletter</h3>
            <p className="text-gray-400 font-light text-sm mb-4">
              Suscríbete para recibir tendencias, ofertas exclusivas y consejos de decoración.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
                required
              />
              <button 
                type="submit"
                className="bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
              >
                Suscribirme
              </button>
            </form>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-light">
          <p>&copy; {new Date().getFullYear()} Amary Deco & Shop Home. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos de Servicio</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[200px] bg-yellow-500/5 blur-[100px] pointer-events-none" />
    </footer>
  );
}
