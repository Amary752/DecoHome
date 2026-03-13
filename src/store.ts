import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface AppState {
  cart: CartItem[];
  isCartOpen: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  
  // Voice Agent State
  isVoiceAgentActive: boolean;
  setVoiceAgentActive: (isActive: boolean) => void;
  transcription: { role: 'user' | 'agent'; text: string }[];
  addTranscription: (role: 'user' | 'agent', text: string) => void;
  clearTranscription: () => void;
}

export const useStore = create<AppState>((set) => ({
  cart: [],
  isCartOpen: false,
  addToCart: (product, quantity = 1) => set((state) => {
    const existingItem = state.cart.find(item => item.id === product.id);
    if (existingItem) {
      return {
        cart: state.cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
        isCartOpen: true
      };
    }
    return {
      cart: [...state.cart, { ...product, quantity }],
      isCartOpen: true
    };
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  
  isVoiceAgentActive: false,
  setVoiceAgentActive: (isActive) => set({ isVoiceAgentActive: isActive }),
  transcription: [],
  addTranscription: (role, text) => set((state) => ({
    transcription: [...state.transcription, { role, text }]
  })),
  clearTranscription: () => set({ transcription: [] })
}));

export const PRODUCTS: Product[] = [
  {
    id: 'premium-1',
    name: 'Colección Premium',
    price: 35,
    image: 'https://res.cloudinary.com/dqrcd0txi/image/upload/v1772761872/Crea_una_imagen_de_producto_de_alta_calidad_usando_1c4a75fc52_iegamx.jpg',
    description: 'Piezas decorativas exclusivas como jarrones, esculturas o centros de mesa que aportan elegancia a cualquier espacio del hogar.'
  },
  {
    id: 'set-1',
    name: 'Set Decorativo',
    price: 28,
    image: 'https://res.cloudinary.com/dqrcd0txi/image/upload/v1772761872/Product_floating_with_decor_bb8ee9fdab_rglggs.jpg',
    description: 'Conjunto de artículos decorativos diseñados para crear una composición armoniosa.'
  },
  {
    id: 'season-1',
    name: 'Decoración de Temporada',
    price: 22,
    image: 'https://res.cloudinary.com/dqrcd0txi/image/upload/v1772761872/Crea_una_imagen_de_producto_de_alta_calidad_usando_1c4a75fc52_iegamx.jpg',
    description: 'Accesorios decorativos inspirados en tendencias actuales o temporadas especiales.'
  },
  {
    id: 'individual-1',
    name: 'Pieza Decorativa Individual',
    price: 15,
    image: 'https://res.cloudinary.com/dqrcd0txi/image/upload/v1772761872/Product_floating_with_decor_bb8ee9fdab_rglggs.jpg',
    description: 'Artículo decorativo único ideal para complementar salas, dormitorios, escritorios o repisas.'
  }
];
