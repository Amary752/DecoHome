import { motion } from 'motion/react';
import { CheckCircle2, Info } from 'lucide-react';

export default function ProductInfo() {
  return (
    <section id="product-info" className="py-24 md:py-32 bg-[#0a0a0a] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
          >
            Detalles que <span className="text-yellow-500 italic font-light">Importan</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Conoce más sobre la calidad y el cuidado que ponemos en cada una de nuestras piezas decorativas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Info className="text-yellow-500 w-6 h-6" />
                Características Principales
              </h3>
              <ul className="space-y-4 text-gray-400 font-light">
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold mt-1">•</span>
                  <span><strong>Material:</strong> Cerámica de alta temperatura, vidrio soplado artesanalmente, madera noble y metales con acabados premium.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold mt-1">•</span>
                  <span><strong>Dimensiones:</strong> Variadas según el artículo. Diseñadas para encajar perfectamente en espacios modernos.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold mt-1">•</span>
                  <span><strong>Peso:</strong> Optimizado para estabilidad sin sacrificar la delicadeza visual.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-yellow-500 font-bold mt-1">•</span>
                  <span><strong>Uso Recomendado:</strong> Ideal para salas de estar, comedores, dormitorios, oficinas o estanterías.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-yellow-500 w-6 h-6" />
                Beneficios
              </h3>
              <p className="text-gray-400 font-light leading-relaxed">
                Nuestros artículos no solo decoran, sino que mejoran la estética y el ambiente de tu hogar. Aportan estilo, armonía y personalidad a tus espacios, creando un entorno donde te sentirás verdaderamente a gusto.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-6">Especificaciones Técnicas</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-black/50 border-b border-white/10">
                    <tr>
                      <th scope="col" className="px-6 py-4 rounded-tl-xl">Característica</th>
                      <th scope="col" className="px-6 py-4 rounded-tr-xl">Detalle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5 bg-black/20">
                      <td className="px-6 py-4 font-medium text-white">Acabado</td>
                      <td className="px-6 py-4">Mate, Brillante o Texturizado</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-black/10">
                      <td className="px-6 py-4 font-medium text-white">Mantenimiento</td>
                      <td className="px-6 py-4">Limpieza con paño seco o ligeramente húmedo</td>
                    </tr>
                    <tr className="border-b border-white/5 bg-black/20">
                      <td className="px-6 py-4 font-medium text-white">Resistencia</td>
                      <td className="px-6 py-4">Alta durabilidad en interiores</td>
                    </tr>
                    <tr className="bg-black/10">
                      <td className="px-6 py-4 font-medium text-white rounded-bl-xl">Garantía</td>
                      <td className="px-6 py-4 rounded-br-xl">1 año contra defectos de fábrica</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-yellow-500/10 p-8 rounded-3xl border border-yellow-500/20">
              <h3 className="text-xl font-bold mb-4 text-yellow-500">¿Por qué elegirnos frente a otros?</h3>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                A diferencia de los artículos decorativos producidos en masa, en Amary Deco priorizamos el diseño exclusivo y la calidad artesanal. Cada pieza es seleccionada para asegurar que no solo sea un adorno, sino una obra de arte que perdure en el tiempo y eleve el estándar de tu decoración.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
