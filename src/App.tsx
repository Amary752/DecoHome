/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Products from './components/Products';
import WhyUs from './components/WhyUs';
import ProductInfo from './components/ProductInfo';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Footer from './components/Footer';
import VoiceAgent from './components/VoiceAgent';
import Cart from './components/Cart';
import WhatsAppButton from './components/WhatsAppButton';

export default function App() {
  // Smooth scroll behavior for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId) {
          document.querySelector(targetId)?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30 selection:text-yellow-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <WhyUs />
        <ProductInfo />
        <Testimonials />
        <Blog />
      </main>
      <Footer />
      
      {/* Floating Elements */}
      <VoiceAgent />
      <Cart />
      <WhatsAppButton />
    </div>
  );
}
