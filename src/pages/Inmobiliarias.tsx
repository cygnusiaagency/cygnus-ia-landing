import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Check, X } from 'lucide-react';
import ConstellationMark from '../components/ConstellationMark';
import CustomCursor from '../components/CustomCursor';
import { fadeUp, staggerContainer, viewportConfig } from '../lib/motion';

const dolores = [
  { code: '01', title: 'Perdemos operaciones cada fin de semana', body: 'Nadie contesta a tiempo. El 78% de los clientes eligen al primer agente que responde.' },
  { code: '02', title: 'Tiempo quemado en WhatsApp', body: 'Mis comerciales pierden 2 horas al día contestando mensajes que no van a ningún sitio.' },
  { code: '03', title: 'Contactos muertos en el CRM', body: 'Tengo 4.000 contactos antiguos en el sistema que nadie ha vuelto a tocar jamás.' },
  { code: '04', title: 'Turismo inmobiliario', body: 'Pago 800€/mes a Idealista y la mitad de los leads son curiosos sin financiación aprobada.' }
];

const servicios = [
  { icon: '💬', title: 'Asistente IA en WhatsApp y Web', desc: 'Cualifica leads 24/7 (presupuesto, zona, urgencia, hipoteca) sin que toques nada.', metric: '< 60s Respuesta' },
  { icon: '🔌', title: 'Conexión Automática a Portales', desc: 'Los leads de Idealista, Fotocasa y Habitaclia aterrizan directos en tu CRM, ya filtrados.', metric: '0 Leads perdidos' },
  { icon: '📅', title: 'Agendamiento Inteligente', desc: 'Reserva visitas automáticamente en el calendario del comercial correspondiente.', metric: '+23% Visitas reales' },
  { icon: '♻️', title: 'Re-engagement Automático', desc: 'El sistema despierta tu base de datos antigua buscando propietarios y compradores pasivos.', metric: 'Activación pasiva' },
  { icon: '🤖', title: 'Seguimiento Post-Visita', desc: 'Nurturing automático después de cada visita para despejar dudas y presionar el cierre.', metric: 'Seguimiento 100%' },
];

const faq = [
  { q: '¿Necesito cambiar de CRM?', a: 'No. Nos conectamos con Inmovilla, Witei, Inmoweb o el que uses. Si no, lo configuramos en el setup inicial.' },
  { q: '¿Hay que formar al equipo?', a: 'Basta con una sesión de 60 minutos grabada. El comercial sigue usando su WhatsApp igual que siempre.' },
  { q: '¿Y si no me funciona?', a: '14 días de prueba antes de pagar, y si tras un mes no ahorras horas medibles, no facturamos. Punto.' },
  { q: '¿Esto va a sustituir a mis comerciales?', a: 'No. Filtra el ruido para que tus comerciales vendan a leads cualificados, no a curiosos. Es una herramienta, no un reemplazo.' },
  { q: '¿Cuánto tardo en tenerlo en marcha?', a: 'Entre 5 y 7 días desde la llamada de setup hasta que el asistente operativo empieza a cualificar.' }
];

const casos = [
  { name: 'Sergio', role: 'Director de agencia en Valencia', agents: '12 comerciales', quote: 'Llevábamos años perdiendo leads los fines de semana. En 3 semanas el asistente nos cualificó los leads y los comerciales pasaron a llamar solo a los que tenían financiación. Cerramos un 23% más de visitas.', metric: '+23% Visitas Cierre' },
  { name: 'Valeria', role: 'Propietaria de franquicia en Madrid', agents: '18 comerciales', quote: 'El re-engagement de la base de datos antigua nos sacó operaciones que dábamos por muertas. Pagado el año entero con dos cierres.', metric: 'Cierres recuperados' },
  { name: 'Francisco', role: 'Responsable de captación en Sevilla', agents: '8 comerciales', quote: 'Lo que más valoro es que las métricas son reales. Cada mes veo cuántas horas hemos ahorrado. No es una promesa, es un Excel.', metric: 'Ahorro medible' }
];

export default function Inmobiliarias() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleFaq = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  return (
    <>
      <CustomCursor />
      
      <div className="bg-ink min-h-screen text-cream font-sans selection:bg-accent selection:text-cream">
        
        {/* Grain Overlay global */}
        <div 
          className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />

        {/* 1. HERO */}
        <section className="relative min-h-[90vh] flex flex-col justify-center px-5 sm:px-10 lg:px-16 pt-20 pb-16">
          <div className="max-w-[1280px] mx-auto w-full">
            <div className="flex items-center gap-3 mb-12">
              <ConstellationMark size={28} variant="cream" />
              <span className="font-display font-semibold tracking-tight text-[18px]">Cygnus IA</span>
            </div>
            
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.h1 
                variants={fadeUp}
                className="font-display text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.035em] text-cream max-w-[16ch] mb-8 font-normal"
              >
                Tu agencia pierde leads cada noche. <br/>
                <em className="text-accent italic font-light">Cygnus IA los cualifica mientras duermes.</em>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-[18px] sm:text-[22px] leading-[1.4] text-cream/80 max-w-[45ch] mb-10">
                Asistente IA conectado a tu WhatsApp y a Idealista. Filtra el ruido, agenda visitas reales, sin que toques nada.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a href="#precio" className="bg-cream text-ink px-8 py-5 rounded-[2rem] font-bold text-[16px] hover:bg-accent hover:text-cream transition-colors flex items-center gap-2 group">
                  Empieza gratis 14 días
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex flex-col">
                  <span className="text-[14px] font-mono text-cream/60">Sin tarjeta. Sin compromiso.</span>
                  <span className="text-[14px] font-mono text-accent">Si no ahorra horas medibles, no facturamos.</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 2. PRUEBA SOCIAL INMEDIATA */}
        <section className="border-t border-line-soft py-10 px-5 sm:px-10 lg:px-16 bg-ink-soft/30">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-cream/10 border-2 border-ink flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Agente" className="w-full h-full object-cover grayscale opacity-80" />
                  </div>
                ))}
              </div>
              <p className="font-mono text-[13px] text-cream/70 uppercase tracking-wide">
                Ya está cualificando leads en <strong className="text-cream">24 agencias</strong> en España
              </p>
            </div>
          </div>
        </section>

        {/* 3. DOLORES */}
        <section id="problema" className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16">
              Pierdes operaciones por esto.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-line-soft border border-line-soft">
              {dolores.map((dolor, i) => (
                <div key={i} className="bg-ink p-10 sm:p-14">
                  <span className="font-mono text-accent text-[14px] mb-6 block">{dolor.code}</span>
                  <h3 className="font-display text-[28px] mb-4 text-cream leading-[1.1]">{dolor.title}</h3>
                  <p className="text-[17px] text-cream/60 leading-[1.5] max-w-[35ch]">{dolor.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. SERVICIOS */}
        <section id="servicios" className="py-24 px-5 sm:px-10 lg:px-16 bg-ink-soft">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16">
              Qué hace Cygnus IA por tu agencia.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicios.map((srv, i) => (
                <div key={i} className="bg-ink rounded-[2rem] p-8 border border-line-soft flex flex-col justify-between h-full">
                  <div>
                    <div className="text-[32px] mb-6">{srv.icon}</div>
                    <h3 className="font-display text-[22px] text-cream mb-3">{srv.title}</h3>
                    <p className="text-cream/70 text-[16px] leading-[1.5] mb-8">{srv.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-line-soft mt-auto">
                    <span className="font-mono text-[12px] text-accent uppercase tracking-widest">{srv.metric}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. CÓMO FUNCIONA */}
        <section className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16">
              Cómo funciona en 3 pasos.
            </h2>
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
              {[
                { step: '01', title: 'Llamada de setup (20 min)', desc: 'Revisamos tu flujo actual y definimos cómo deben cualificarse tus leads.' },
                { step: '02', title: 'Conectamos a tu CRM y WhatsApp', desc: 'En 5 días el asistente se integra en tus herramientas sin que cambies de software.' },
                { step: '03', title: '14 días de prueba con métricas', desc: 'El día 15 ves un dashboard con las horas que tu equipo se ha ahorrado. Y solo entonces decides si pagas.' },
              ].map((s, i) => (
                <div key={i} className="flex-1 relative">
                  <div className="text-[80px] font-display text-line-soft leading-none mb-6 absolute -top-8 -left-4 z-0 pointer-events-none">{s.step}</div>
                  <div className="relative z-10">
                    <h3 className="font-display text-[24px] text-cream mb-4">{s.title}</h3>
                    <p className="text-cream/70 text-[16px] leading-[1.6]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. MÉTRICA ÚNICA DOMINANTE */}
        <section className="py-32 px-5 sm:px-10 lg:px-16 bg-accent">
          <div className="max-w-[1280px] mx-auto text-center flex flex-col items-center">
            <h2 className="font-display text-[clamp(5rem,15vw,12rem)] leading-[0.8] text-cream tracking-tighter mb-6">
              78%
            </h2>
            <p className="font-sans text-[clamp(1.5rem,3vw,2.5rem)] text-cream font-medium max-w-[25ch] leading-[1.2]">
              de los clientes eligen a quien responde primero.
            </p>
            <a href="#precio" className="mt-12 bg-ink text-cream px-8 py-4 rounded-full font-bold text-[15px] hover:bg-cream hover:text-ink transition-colors uppercase tracking-wide font-mono">
              Empieza gratis 14 días
            </a>
          </div>
        </section>

        {/* 7. CASOS DE ÉXITO */}
        <section className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16">
              Agencias reales. <br/><span className="text-cream/40">Datos reales.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {casos.map((caso, i) => (
                <div key={i} className="bg-ink-soft p-8 sm:p-10 rounded-[2rem]">
                  <p className="text-[17px] text-cream italic leading-[1.6] mb-8">"{caso.quote}"</p>
                  <div className="flex items-center gap-4 border-t border-line-soft pt-6">
                    <div className="w-12 h-12 rounded-full bg-cream/10 border border-line-soft overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt={caso.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div>
                      <div className="font-semibold text-[15px] text-cream">{caso.name}</div>
                      <div className="text-[13px] text-cream/50">{caso.role}</div>
                      <div className="text-[12px] font-mono text-accent mt-1">{caso.metric}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. QUIÉN ESTÁ DETRÁS */}
        <section className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft bg-ink">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="w-48 h-48 rounded-full bg-line-soft flex items-center justify-center shrink-0 border border-cream/10 overflow-hidden">
              <span className="text-cream/30 font-mono text-sm">FOTO KEVIN</span>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-[32px] text-cream mb-4">Kevin Enriquez</h2>
              <p className="text-[18px] text-cream/70 leading-[1.6] max-w-[50ch] mb-6">
                Fundador de Cygnus IA. Especialista en automatización B2B. Trabajo directamente con directores de agencias inmobiliarias para implementar sistemas que eliminan el trabajo manual y escalan la captación. Sin soporte por chatbot, contacto directo siempre.
              </p>
              <a href="https://linkedin.com/in/kevinenriquez" target="_blank" rel="noreferrer" className="font-mono text-accent text-[14px] uppercase tracking-wider hover:underline">
                Conectar en LinkedIn ↗
              </a>
            </div>
          </div>
        </section>

        {/* 9. COMPARATIVA */}
        <section className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16 text-center">
              Antes / Con Cygnusia
            </h2>
            <div className="border border-line-soft rounded-[2rem] overflow-hidden bg-ink">
              {[
                ['Tiempo de respuesta', 'Varias horas / Al día siguiente', '< 60 segundos 24/7'],
                ['Filtrado de curiosos', 'Comerciales gastando saliva', 'IA descarta al instante'],
                ['Agendamiento', 'Interminables mensajes en WhatsApp', 'Cita directa al Google Calendar'],
                ['Base antigua CRM', 'Juntando polvo virtual', 'Re-engagement automático activo'],
                ['Coste operativo', 'Horas hombre incalculables', 'Retainer fijo + Cobro por resultado']
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-3 border-b border-line-soft last:border-0">
                  <div className="p-6 text-[15px] font-semibold text-cream bg-ink-soft/50 flex items-center">{row[0]}</div>
                  <div className="p-6 text-[15px] text-cream/60 flex items-center gap-3">
                    <X className="w-4 h-4 text-accent shrink-0" /> {row[1]}
                  </div>
                  <div className="p-6 text-[15px] text-cream flex items-center gap-3 bg-accent/5">
                    <Check className="w-4 h-4 text-accent shrink-0" /> {row[2]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 10. PRICING HONESTO */}
        <section id="precio" className="py-24 px-5 sm:px-10 lg:px-16 bg-ink-soft">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-8 text-center">
              Modelo de cobro claro.
            </h2>
            <p className="text-center text-cream/70 text-[18px] mb-12 max-w-[40ch] mx-auto">
              Pruébalo dos semanas. Si no funciona, no nos debes nada. Y nadie te llamará a venderte algo después.
            </p>
            
            <div className="bg-ink p-10 sm:p-14 rounded-[3rem] border border-line-soft">
              <div className="mb-8 pb-8 border-b border-line-soft">
                <span className="bg-accent/20 text-accent font-mono text-[12px] px-3 py-1 rounded-full uppercase tracking-wider mb-6 inline-block">14 DÍAS GRATIS</span>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-display text-[48px] text-cream leading-none">1.500€</span>
                  <span className="text-[16px] text-cream/50 font-mono">Setup único</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[32px] text-cream/80 leading-none">+ 500€</span>
                  <span className="text-[16px] text-cream/50 font-mono">/mes (Retainer)</span>
                </div>
              </div>
              
              <div className="mb-10">
                <h4 className="font-bold text-[16px] mb-4 text-cream">Cláusula de cobro por resultado:</h4>
                <p className="text-[16px] text-cream/70 leading-[1.6] bg-line-soft p-5 rounded-xl border border-cream/10">
                  Si al finalizar el mes el sistema no te ha ahorrado horas medibles en tu equipo (demostrable en panel), <strong>no se factura la mensualidad.</strong>
                </p>
              </div>

              <a href="#contacto" className="w-full bg-cream text-ink py-5 rounded-[2rem] font-bold text-[16px] hover:bg-accent hover:text-cream transition-colors flex items-center justify-center gap-2 group mb-4">
                Empieza gratis 14 días
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-[12px] text-cream/40 font-mono uppercase tracking-wide">
                Cupo limitado de onboarding a 3 agencias/mes
              </p>
            </div>
          </div>
        </section>

        {/* 11. FAQ */}
        <section id="faq" className="py-24 px-5 sm:px-10 lg:px-16 border-t border-line-soft">
          <div className="max-w-[800px] mx-auto">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] tracking-[-0.02em] mb-16 text-center">
              Preguntas frecuentes
            </h2>
            <div className="border-t border-line-soft">
              {faq.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={i} className="border-b border-line-soft">
                    <button 
                      onClick={() => toggleFaq(i)}
                      className="w-full py-8 flex justify-between items-center text-left"
                    >
                      <span className="font-display text-[22px] sm:text-[26px] text-cream pr-8">{item.q}</span>
                      <Plus className={`w-6 h-6 text-accent shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <p className="text-[17px] text-cream/70 leading-[1.6] pb-8 pr-12">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 12. CTA FINAL */}
        <section className="py-32 px-5 sm:px-10 lg:px-16 bg-accent text-center">
          <div className="max-w-[1280px] mx-auto">
            <h2 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9] text-cream tracking-tighter mb-10 max-w-[15ch] mx-auto">
              Empieza gratis 14 días. Sin tarjeta. Sin riesgo.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#contacto" className="bg-ink text-cream px-10 py-5 rounded-[2rem] font-bold text-[18px] hover:bg-cream hover:text-ink transition-colors">
                Empieza gratis 14 días
              </a>
              <a href="#contacto" className="bg-transparent text-cream border border-cream/30 px-10 py-5 rounded-[2rem] font-medium text-[18px] hover:bg-cream/10 transition-colors">
                Reservar llamada de 20 min
              </a>
            </div>
          </div>
        </section>

        {/* 13. FOOTER MINIMAL */}
        <footer className="py-12 px-5 sm:px-10 lg:px-16 bg-ink border-t border-line-soft">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <ConstellationMark size={20} variant="cream" />
              <span className="font-display text-[16px] text-cream">Cygnus IA</span>
            </div>
            <div className="flex gap-8 text-[14px] font-mono text-cream/50 uppercase tracking-wider">
              <a href="https://linkedin.com/in/kevinenriquez" className="hover:text-cream transition-colors">LinkedIn</a>
              <a href="mailto:hola@cygnusia.com" className="hover:text-cream transition-colors">Contacto</a>
              <a href="#" className="hover:text-cream transition-colors">Legal</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
