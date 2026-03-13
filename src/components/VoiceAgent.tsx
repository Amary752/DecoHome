import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, MessageSquare } from 'lucide-react';
import { useStore, PRODUCTS } from '../store';
import { GoogleGenAI, Modality, Type, FunctionDeclaration } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const addToCartFunctionDeclaration: FunctionDeclaration = {
  name: "addToCart",
  parameters: {
    type: Type.OBJECT,
    description: "Agrega un producto de decoración al carrito de compras.",
    properties: {
      productId: {
        type: Type.STRING,
        description: "El ID del producto a agregar. Opciones válidas: 'premium-1', 'set-1', 'season-1', 'individual-1'.",
      },
      quantity: {
        type: Type.NUMBER,
        description: "La cantidad de productos a agregar.",
      },
    },
    required: ["productId", "quantity"],
  },
};

export default function VoiceAgent() {
  const { 
    isVoiceAgentActive, 
    setVoiceAgentActive, 
    transcription, 
    addTranscription, 
    clearTranscription,
    addToCart
  } = useStore();

  const [isConnecting, setIsConnecting] = useState(false);
  const [isMicLocked, setIsMicLocked] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const audioQueueRef = useRef<Float32Array[]>([]);
  const isPlayingRef = useRef(false);

  // Tooltip logic
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowTooltip(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (!isVoiceAgentActive) setShowTooltip(true);
    }, 10000);
  }, [isVoiceAgentActive]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer]);

  const playAudioQueue = async (ctx: AudioContext) => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;
    isPlayingRef.current = true;

    const audioData = audioQueueRef.current.shift()!;
    const audioBuffer = ctx.createBuffer(1, audioData.length, 24000);
    audioBuffer.getChannelData(0).set(audioData);

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(ctx.destination);
    
    source.onended = () => {
      isPlayingRef.current = false;
      playAudioQueue(ctx);
    };
    
    source.start();
  };

  const handleConnect = async () => {
    if (isVoiceAgentActive) {
      handleDisconnect();
      return;
    }

    setIsConnecting(true);
    clearTranscription();
    setShowTooltip(false);

    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      setAudioContext(ctx);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-09-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } },
          },
          systemInstruction: `Eres HOM, el asistente virtual de Amary Deco & Shop Home. Tu objetivo es ayudar a los clientes a encontrar y comprar artículos de decoración para el hogar. Eres amigable, elegante y eficiente. 
          
          Catálogo de productos:
          1. Colección Premium (ID: premium-1) - $35. Piezas decorativas exclusivas como jarrones, esculturas o centros de mesa.
          2. Set Decorativo (ID: set-1) - $28. Conjunto de artículos decorativos diseñados para crear una composición armoniosa.
          3. Decoración de Temporada (ID: season-1) - $22. Accesorios decorativos inspirados en tendencias actuales.
          4. Pieza Decorativa Individual (ID: individual-1) - $15. Artículo decorativo único ideal para complementar salas, dormitorios, escritorios o repisas.
          
          Si el usuario pide agregar algo al carrito, usa la herramienta addToCart. Confirma siempre lo que agregaste.`,
          tools: [{ functionDeclarations: [addToCartFunctionDeclaration] }],
          inputAudioTranscription: {},
          outputAudioTranscription: {}
        },
        callbacks: {
          onopen: () => {
            setVoiceAgentActive(true);
            setIsConnecting(false);
            
            // Initial greeting logic
            setIsMicLocked(true);
            addTranscription('agent', "¡Bienvenido! Inspírate con nuestra colección de artículos de decoración para el hogar. Encuentra detalles únicos que transformarán tus espacios y harán de tu casa un lugar aún más especial.");
            
            sessionPromise.then((session) => {
              // Send initial text to trigger greeting audio
              session.sendClientContent({
                turns: [{ role: "user", parts: [{ text: "Hola HOM, acabo de entrar a la tienda." }] }],
                turnComplete: true
              });

              setTimeout(() => setIsMicLocked(false), 5000); // Unlock after greeting

              const source = ctx.createMediaStreamSource(stream);
              const processor = ctx.createScriptProcessor(4096, 1, 1);
              processorRef.current = processor;

              processor.onaudioprocess = (e) => {
                if (isMicLocked) return;
                const inputData = e.inputBuffer.getChannelData(0);
                const pcmData = new Int16Array(inputData.length);
                for (let i = 0; i < inputData.length; i++) {
                  pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
                }
                const buffer = new Uint8Array(pcmData.buffer);
                let binary = '';
                for (let i = 0; i < buffer.byteLength; i++) {
                  binary += String.fromCharCode(buffer[i]);
                }
                const base64Data = btoa(binary);
                
                session.sendRealtimeInput({
                  media: {
                    mimeType: 'audio/pcm;rate=16000',
                    data: base64Data
                  }
                });
              };

              // Connect to dummy gain node to prevent feedback while keeping processor active
              const gainNode = ctx.createGain();
              gainNode.gain.value = 0;
              source.connect(processor);
              processor.connect(gainNode);
              gainNode.connect(ctx.destination);
            });
          },
          onmessage: async (message: any) => {
            // Handle audio output
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && ctx) {
              const binaryString = atob(base64Audio);
              const bytes = new Uint8Array(binaryString.length);
              for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
              }
              const int16Array = new Int16Array(bytes.buffer);
              const float32Array = new Float32Array(int16Array.length);
              for (let i = 0; i < int16Array.length; i++) {
                float32Array[i] = int16Array[i] / 32768;
              }
              audioQueueRef.current.push(float32Array);
              playAudioQueue(ctx);
            }

            // Handle tool calls
            const toolCall = message.serverContent?.modelTurn?.parts?.find((p: any) => p.functionCall);
            if (toolCall) {
              const { name, args } = toolCall.functionCall;
              if (name === 'addToCart') {
                const product = PRODUCTS.find(p => p.id === args.productId);
                if (product) {
                  addToCart(product, args.quantity || 1);
                  sessionPromise.then((session) => {
                    session.sendToolResponse({
                      functionResponses: [{
                        name,
                        response: { result: `Agregado ${args.quantity}x ${product.name} al carrito exitosamente.` }
                      }]
                    });
                  });
                }
              }
            }

            // Handle transcription
            const text = message.serverContent?.modelTurn?.parts?.find((p: any) => p.text)?.text;
            if (text) {
              addTranscription('agent', text);
            }
          },
          onclose: () => {
            handleDisconnect();
          },
          onerror: (error: any) => {
            console.error("Live API Error:", error);
            handleDisconnect();
          }
        }
      });
      const liveSession = await sessionPromise;
      setSession(liveSession);
    } catch (error) {
      console.error("Failed to connect:", error);
      setIsConnecting(false);
      handleDisconnect();
    }
  };

  const handleDisconnect = () => {
    if (session) {
      session.close();
      setSession(null);
    }
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContext && audioContext.state !== 'closed') {
      audioContext.close();
    }
    setAudioContext(null);
    setVoiceAgentActive(false);
    setIsConnecting(false);
    setIsMicLocked(false);
    audioQueueRef.current = [];
    isPlayingRef.current = false;
  };

  return (
    <>
      {/* Floating Mic Button */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
        <AnimatePresence>
          {showTooltip && !isVoiceAgentActive && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-4 rounded-2xl shadow-2xl max-w-[250px] text-sm relative"
            >
              <p>¿Buscas inspiración para tu hogar? Descubre nuestras piezas de decoración y transforma tus espacios. Haz clic en el micrófono para pedir hablando conmigo.</p>
              <div className="absolute -bottom-2 left-6 w-4 h-4 bg-white/10 border-b border-r border-white/20 transform rotate-45"></div>
              <button 
                onClick={() => setShowTooltip(false)}
                className="absolute top-2 right-2 text-white/50 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleConnect}
          disabled={isMicLocked || isConnecting}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isVoiceAgentActive 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-white text-black hover:scale-105'
          } ${isMicLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isConnecting ? (
            <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : isVoiceAgentActive ? (
            <MicOff className="w-6 h-6" />
          ) : (
            <Mic className="w-6 h-6" />
          )}
          
          {/* Pulse effect when active */}
          {isVoiceAgentActive && !isMicLocked && (
            <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-75"></span>
          )}
        </button>
      </div>

      {/* Transcription Glassmorphism Box */}
      <AnimatePresence>
        {isVoiceAgentActive && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-28 left-6 z-40 w-80 max-h-[400px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white font-medium text-sm tracking-wide">HOM IA</span>
              </div>
              <MessageSquare className="w-4 h-4 text-white/50" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
              {transcription.length === 0 ? (
                <div className="text-white/50 text-sm text-center py-4 italic">
                  Escuchando...
                </div>
              ) : (
                transcription.map((msg, idx) => (
                  <div 
                    key={idx} 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                      msg.role === 'user' 
                        ? 'bg-white/10 text-white self-end rounded-tr-sm' 
                        : 'bg-yellow-500/20 text-yellow-50 self-start rounded-tl-sm border border-yellow-500/20'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
