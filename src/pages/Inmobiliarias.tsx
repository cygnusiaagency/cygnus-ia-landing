import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Plus, X, 
  MessageSquare, Cable, Calendar, 
  RefreshCw, Bot, Linkedin, Mail, 
  ChevronRight, ArrowUpRight, ShieldCheck 
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ConstellationMark from '../components/ConstellationMark';
import CustomCursor from '../components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const dolores = [
  { code: 'ID-01', title: 'Fugas en Fin de Semana', body: 'Nadie contesta a tiempo. El 78% de los leads eligen al primer agente que responde, sin importar la marca.' },
  { code: 'ID-02', title: 'WhatsApp Saturation', body: 'Comerciales perdiendo 2.4 horas diarias en conversaciones que no terminan en visita.' },
  { code: 'ID-03', title: 'Base de Datos Inerte', body: 'Miles de contactos acumulando polvo en tu CRM que nunca han sido re-contactados.' },
  { code: 'ID-04', title: 'Leads de Baja Calidad', body: 'Pagas fortunas a Idealista para recibir curiosos que no tienen financiación aprobada.' }
];

const servicios = [
  { icon: MessageSquare, title: 'Cualificación 24/7', desc: 'Presupuesto, zona e hipoteca filtrados en tiempo real.', metric: '< 60s Latencia', size: 'large' },
  { icon: Cable, title: 'Inmo-Sync CRM', desc: 'Idealista y Fotocasa directo a tu base de datos.', metric: 'Cero fugas', size: 'small' },
  { icon: Calendar, title: 'Agenda Autónoma', desc: 'Visitas bloqueadas en el calendario del comercial.', metric: '+23% Conversión', size: 'small' },
  { icon: RefreshCw, title: 'Re-activación Masiva', desc: 'Despertamos leads antiguos con agentes digitales.', metric: 'ROI Inmediato', size: 'small' },
  { icon: Bot, title: 'Nurturing Post-Visita', desc: 'Seguimiento automático para empujar el cierre.', metric: '100% Cobertura', size: 'large' },
];

const faq = [
  { q: '¿Necesito cambiar de CRM?', a: 'No. Nos integramos con Inmovilla, Witei, Inmoweb o el sistema que ya utilices hoy.' },
  { q: '¿Hay que formar al equipo?', a: '60 minutos de setup grabado. El comercial no cambia su forma de trabajar, solo recibe mejores leads.' },
  { q: '¿Y si no me funciona?', a: 'Garantía Cygnus: 14 días de prueba real. Si no ahorras horas medibles, no facturamos.' },
  { q: '¿Sustituye a mis comerciales?', a: 'No. Los libera del ruido administrativo para que se enfoquen únicamente en vender.' },
  { q: '¿Tiempo de despliegue?', a: 'Operativo en 5-7 días laborables tras la llamada inicial de diagnóstico.' }
];

const casos = [
  { name: 'Sergio M.', role: 'Agencia Valencia', agents: '12 agentes', quote: 'Pasamos de perder leads el domingo a agendar visitas antes del lunes mañana.', metric: '+23% Visitas' },
  { name: 'Valeria G.', role: 'Franquicia Madrid', agents: '18 agentes', quote: 'El re-engagement nos recuperó 4 operaciones que dábamos por muertas en 15 días.', metric: '4 Cierres' },
  { name: 'Francisco R.', role: 'Captación Sevilla', agents: '8 agentes', quote: 'No es una promesa de IA genérica, es un Excel que muestra las horas ahorradas.', metric: '86h/mes' }
];

// --- Sub-components ---

const MagneticButton = ({ children, className = '', href = '#' }: { children: React.ReactNode, className?: string, href?: string }) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden group ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[power3.out]" />
    </motion.a>
  );
};

const StatusDot = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
  </span>
);

// --- Main Page ---

export default function Inmobiliarias() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Entry animations
      gsap.from('.reveal', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal',
          start: 'top 85%',
        }
      });

      // Special Hero reveal
      gsap.from('.hero-text', {
        x: -50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
      });
      
      gsap.from('.hero-asset', {
        x: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        delay: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-ink min-h-screen text-cream font-sans selection:bg-accent selection:text-cream overflow-x-hidden">
      <CustomCursor />
      
      {/* 1px Noise Overlay */}
      <div className="fixed inset-0 opacity-[0.04] pointer-events-none z-[9999] mix-blend-overlay">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* --- HEADER --- */}
      <header className="fixed top-0 left-0 w-full z-50 px-5 py-6">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center bg-ink/40 backdrop-blur-xl border border-white/10 rounded-[2rem] px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center gap-2.5">
            <ConstellationMark size={24} variant="cream" />
            <span className="font-display font-semibold text-[17px] tracking-tight">Cygnus IA</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-[12px] font-mono uppercase tracking-widest text-cream/60">
            <a href="#problema" className="hover:text-cream transition-colors">Problema</a>
            <a href="#servicios" className="hover:text-cream transition-colors">Sistemas</a>
            <a href="#precio" className="hover:text-cream transition-colors">Precio</a>
          </nav>
          <MagneticButton href="#precio" className="bg-cream text-ink px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider shadow-xl">
            Prueba 14 días
          </MagneticButton>
        </div>
      </header>

      {/* 1. HERO (Asymmetric) */}
      <section className="relative min-h-[100dvh] flex items-center px-5 sm:px-10 lg:px-16 pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
          <div className="hero-text">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full mb-8">
              <StatusDot />
              <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Despliegue Activo v2.4</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.92] tracking-[-0.04em] mb-8 font-normal">
              Tu agencia pierde leads <br/>
              <span className="text-cream/30 italic font-light">cada noche.</span> <br/>
              Nosotros los cualificamos.
            </h1>
            <p className="text-[18px] sm:text-[20px] leading-[1.5] text-cream/70 max-w-[48ch] mb-12">
              Asistente autónomo conectado a WhatsApp e Idealista. Filtra curiosos, cualifica hipotecas y agenda visitas reales sin intervención humana.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <MagneticButton href="#precio" className="bg-accent text-cream px-10 py-5 rounded-[2.5rem] font-bold text-[16px] shadow-2xl shadow-accent/20">
                Empieza gratis 14 días <ArrowRight className="w-5 h-5" />
              </MagneticButton>
              <div className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-cream/40 mb-1">Garantía Cygnus</span>
                <span className="text-[13px] text-accent font-medium">Si no ahorras horas, no facturamos.</span>
              </div>
            </div>
          </div>
          <div className="hero-asset hidden lg:block relative">
            <div className="aspect-square bg-gradient-to-br from-white/5 to-transparent rounded-[3rem] border border-white/10 p-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(184,52,30,0.1),transparent)]" />
              <div className="relative h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center border border-accent/30">
                    <ShieldCheck className="text-accent" />
                  </div>
                  <div className="font-mono text-[10px] text-cream/30 text-right">TELEMETRY_FEED<br/>ID_847_INMO</div>
                </div>
                <div className="space-y-4">
                  {[47, 82, 15].map((w, i) => (
                    <div key={i} className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${w}%` }}
                        transition={{ duration: 2, delay: 0.5 + i * 0.2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 3 }}
                        className="h-full bg-accent/40" 
                      />
                    </div>
                  ))}
                </div>
                <div className="font-display text-[42px] leading-none text-cream/20 select-none">DATA_PROTOCOL_02</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRUEBA SOCIAL */}
      <section className="reveal py-16 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-ink bg-white/5 overflow-hidden grayscale hover:grayscale-0 transition-all cursor-pointer">
                  <img src={`https://i.pravatar.cc/150?u=inmo${i}`} alt="Partner" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="font-mono text-[12px] uppercase tracking-wider text-cream/50">
              Operativo en <strong className="text-cream">24 agencias</strong> inmobiliarias en España
            </p>
          </div>
          <div className="h-px w-full md:w-32 bg-white/10 hidden lg:block" />
          <div className="font-display text-[24px] text-cream/40 italic">Para los que cierran, no los que esperan.</div>
        </div>
      </section>

      {/* 3. DOLORES (Bento-style Grid) */}
      <section id="problema" className="py-32 px-5 sm:px-10 lg:px-16">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 reveal">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] max-w-[15ch]">
              Pierdes operaciones por <span className="text-accent">fricción operativa.</span>
            </h2>
            <div className="font-mono text-[12px] uppercase tracking-[0.3em] text-cream/30 pb-4 border-b border-white/10">PROTOCOL_ERROR_LOG</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {dolores.map((dolor, i) => (
              <div key={i} className="reveal bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="font-mono text-[10px] text-accent mb-12 flex justify-between items-center">
                  <span>{dolor.code}</span>
                  <div className="w-1 h-1 rounded-full bg-accent group-hover:scale-[3] transition-transform" />
                </div>
                <h3 className="font-display text-[26px] mb-4 text-cream leading-[1.1]">{dolor.title}</h3>
                <p className="text-[15px] text-cream/50 leading-[1.5]">{dolor.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICIOS (Bento Grid) */}
      <section id="servicios" className="py-32 px-5 sm:px-10 lg:px-16 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-20 reveal">
            <div className="font-mono text-[11px] uppercase tracking-widest text-accent mb-4">Sistemas de Alto Rendimiento</div>
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]">Qué hace Cygnus por ti.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
            {servicios.map((srv, i) => (
              <div 
                key={i} 
                className={`reveal group relative bg-ink border border-white/10 rounded-[3rem] p-10 flex flex-col justify-between overflow-hidden shadow-2xl transition-all hover:border-accent/40 ${
                  srv.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'
                }`}
              >
                <div className="absolute top-0 right-0 p-8">
                  <srv.icon className="w-8 h-8 text-cream/10 group-hover:text-accent transition-colors duration-500" />
                </div>
                <div>
                  <h3 className="font-display text-[24px] text-cream mb-4">{srv.title}</h3>
                  <p className="text-cream/60 text-[16px] leading-[1.5] max-w-[30ch]">{srv.desc}</p>
                </div>
                <div className="pt-8 border-t border-white/5 mt-12 flex justify-between items-center">
                  <span className="font-mono text-[11px] text-accent uppercase tracking-widest">{srv.metric}</span>
                  <ChevronRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CÓMO FUNCIONA */}
      <section className="py-32 px-5 sm:px-10 lg:px-16 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em] mb-20">Despliegue en 3 pasos.</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {[
              { step: '01', title: 'Llamada de Setup (20min)', desc: 'Auditoría de tu flujo actual y definición de los protocolos de cualificación.' },
              { step: '02', title: 'Integración CRM/API', desc: 'Conectamos el motor IA a tu WhatsApp e Idealista sin tocar tu software actual.' },
              { step: '03', title: 'Onboarding 14 días', desc: 'El sistema empieza a operar. El día 15 revisas el Excel de rentabilidad y decides.' },
            ].map((s, i) => (
              <div key={i} className="reveal group">
                <div className="font-display text-[100px] text-white/5 leading-none mb-8 group-hover:text-accent/10 transition-colors">{s.step}</div>
                <h3 className="font-display text-[24px] text-cream mb-4">{s.title}</h3>
                <p className="text-cream/50 text-[16px] leading-[1.6]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. MÉTRICA DOMINANTE */}
      <section className="py-40 bg-accent relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,0,0,0.2),transparent)]" />
        <div className="max-w-[1400px] mx-auto px-5 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: 'power4.out' }}
          >
            <h2 className="font-display text-[clamp(6rem,18vw,16rem)] leading-[0.75] text-cream tracking-tighter mb-8">78%</h2>
            <p className="font-display text-[clamp(1.5rem,4vw,3.5rem)] text-cream/90 max-w-[20ch] mx-auto leading-[1.1] mb-12">
              de los clientes eligen a quien responde primero.
            </p>
            <MagneticButton href="#precio" className="mx-auto bg-ink text-cream px-12 py-5 rounded-full font-bold text-[15px] uppercase tracking-[0.2em]">
              Cualifica ahora
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* 7. CASOS DE ÉXITO */}
      <section className="py-32 px-5 sm:px-10 lg:px-16 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-end mb-20 reveal">
            <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1] tracking-[-0.03em]">Agencias en alta.</h2>
            <div className="hidden md:block font-mono text-[11px] text-cream/20 uppercase tracking-widest">REAL_TIME_VALIDATION</div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {casos.map((caso, i) => (
              <div key={i} className="reveal bg-ink-soft/40 p-10 rounded-[3rem] border border-white/5 hover:border-white/10 transition-colors shadow-2xl">
                <div className="flex items-center gap-2 mb-8">
                  {[1,2,3,4,5].map(star => <div key={star} className="w-1.5 h-1.5 rounded-full bg-accent" />)}
                </div>
                <p className="text-[19px] text-cream italic leading-[1.6] mb-10 font-fraunces">"{caso.quote}"</p>
                <div className="flex items-center gap-4 pt-8 border-t border-white/5">
                  <div className="w-12 h-12 rounded-full bg-white/5 overflow-hidden grayscale">
                    <img src={`https://i.pravatar.cc/150?u=case${i}`} alt={caso.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-semibold text-[15px] text-cream">{caso.name}</div>
                    <div className="text-[12px] text-cream/40 uppercase tracking-wider">{caso.role} · {caso.agents}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FOUNDER */}
      <section className="py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="reveal relative">
            <div className="aspect-[4/5] bg-white/5 rounded-[3rem] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
              <img src="https://images.unsplash.com/photo-1600880210119-75155b629880?q=80&w=1470&auto=format&fit=crop" alt="Kevin Enriquez" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent p-8 rounded-[2rem] shadow-2xl hidden md:block">
              <div className="font-display text-[24px] text-cream leading-tight">Contacto <br/>Directo</div>
            </div>
          </div>
          <div className="reveal">
            <div className="font-mono text-[11px] text-accent uppercase tracking-widest mb-6">Agencia Boutique</div>
            <h2 className="font-display text-[42px] leading-[1.1] text-cream mb-8">No busco volumen de clientes, busco volumen de facturación.</h2>
            <p className="text-[18px] text-cream/60 leading-[1.7] mb-10">
              Hola, soy Kevin. En Cygnus IA opero de forma personalizada con cada director de agencia. Mi sistema no es un software genérico de 50€ al mes; es una infraestructura de IA diseñada para mover la aguja de tu cuenta de resultados. 
            </p>
            <div className="flex flex-col gap-4">
              <a href="#" className="flex items-center gap-3 text-cream group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cream group-hover:text-ink transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span className="font-mono text-[12px] uppercase tracking-widest">Connect on LinkedIn</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-cream group">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cream group-hover:text-ink transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="font-mono text-[12px] uppercase tracking-widest">hola@cygnusia.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. COMPARATIVA */}
      <section className="py-32 px-5 sm:px-10 lg:px-16 bg-white/[0.01]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="reveal text-center font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] mb-20">Protocolo de Eficiencia.</h2>
          <div className="reveal border border-white/10 rounded-[3rem] overflow-hidden bg-ink shadow-3xl">
            {[
              ['Latencia de Respuesta', 'Promedio: 4.2 horas', '< 60 segundos (Fijo)'],
              ['Filtrado de Leads', 'Manual / Sesgado', 'IA Basada en Protocolo'],
              ['Agendamiento', 'WhatsApp/Llamada manual', 'Auto-bloqueo de Agenda'],
              ['Métricas', 'Estimadas / "Vibe"', 'Exactas (Ahorro en €)'],
              ['Garantía', 'Inexistente', 'Pago por Resultado']
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-3 border-b border-white/5 last:border-0 hover:bg-white/[0.01] transition-colors">
                <div className="p-8 text-[14px] font-mono uppercase tracking-wider text-cream bg-white/[0.02] flex items-center">{row[0]}</div>
                <div className="p-8 text-[15px] text-cream/40 flex items-center gap-3"><X className="w-4 h-4 text-accent/50" /> {row[1]}</div>
                <div className="p-8 text-[15px] text-cream flex items-center gap-3 bg-accent/5"><ArrowUpRight className="w-4 h-4 text-accent" /> {row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. PRICING */}
      <section id="precio" className="py-32 px-5 sm:px-10 lg:px-16">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="reveal font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] mb-8">Inversión Transparente.</h2>
          <p className="reveal text-cream/50 text-[18px] mb-16 max-w-[45ch] mx-auto">
            Prueba el sistema 14 días. Si los números no dan, lo apagamos y no nos debes nada. Así de simple.
          </p>
          
          <div className="reveal bg-white/[0.02] p-12 sm:p-20 rounded-[4rem] border border-white/10 relative shadow-3xl">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-cream font-mono text-[11px] px-6 py-2 rounded-full uppercase tracking-widest shadow-xl">
              14 Días Free Pass
            </div>
            
            <div className="mb-12">
              <div className="flex items-baseline justify-center gap-3 mb-2">
                <span className="font-display text-[80px] leading-none text-cream">1.500€</span>
                <span className="text-cream/40 font-mono text-[14px] uppercase tracking-widest">Setup</span>
              </div>
              <div className="text-[20px] text-cream/60">+ 500€ / mes (Retainer de Operaciones)</div>
            </div>
            
            <div className="bg-ink p-8 rounded-[2.5rem] border border-white/5 mb-12 text-left relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />
              <h4 className="font-bold text-[17px] text-cream mb-2 flex items-center gap-2">
                Cláusula de Garantía de Ahorro:
              </h4>
              <p className="text-[15px] text-cream/50 leading-[1.6]">
                Si el panel de control no certifica un ahorro neto en horas de equipo equivalente al coste del retainer, **la mensualidad queda bonificada al 100%.**
              </p>
            </div>

            <MagneticButton href="#" className="w-full bg-cream text-ink py-6 rounded-full font-bold text-[18px] justify-center shadow-2xl">
              Activar Prueba 14 Días
            </MagneticButton>
            <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/20">Slot Disponible: 02/03 Agencias este mes</div>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <section className="py-32 px-5 sm:px-10 lg:px-16 border-t border-white/5">
        <div className="max-w-[800px] mx-auto">
          <h2 className="reveal text-center font-display text-[42px] mb-20">F.A.Q.</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <div key={i} className="reveal border border-white/5 rounded-[2rem] overflow-hidden bg-white/[0.01]">
                <button 
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full p-8 flex justify-between items-center text-left hover:bg-white/[0.02] transition-colors"
                >
                  <span className="font-display text-[22px] text-cream">{item.q}</span>
                  <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-transform duration-500 ${openIndex === i ? 'rotate-45 bg-accent border-accent' : ''}`}>
                    <Plus className="w-5 h-5 text-cream" />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="p-8 pt-0 text-[16px] text-cream/50 leading-[1.6] max-w-[60ch]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-40 px-5 sm:px-10 lg:px-16 text-center bg-ink relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-white/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto">
          <h2 className="reveal font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.04em] mb-12">
            Deja de esperar leads. <br/>
            <span className="text-accent italic">Empieza a cerrar visitas.</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
            <MagneticButton href="#" className="bg-cream text-ink px-12 py-6 rounded-full font-bold text-[18px]">
              Probar 14 días gratis
            </MagneticButton>
            <a href="#" className="font-mono text-[12px] uppercase tracking-widest text-cream/40 hover:text-accent transition-colors">
              Agendar Demo 20min ↗
            </a>
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="py-20 px-5 sm:px-10 lg:px-16 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-3">
            <ConstellationMark size={24} variant="cream" />
            <div className="flex flex-col">
              <span className="font-display text-[20px] text-cream leading-none mb-1">Cygnus IA</span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-cream/20">© 2026 Engine Unit 01</span>
            </div>
          </div>
          <div className="flex gap-12 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/40">
            <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Legal</a>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-ink border border-white/5 rounded-full">
            <StatusDot />
            <span className="font-mono text-[10px] text-cream/60">SYSTEM_OPERATIONAL</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
