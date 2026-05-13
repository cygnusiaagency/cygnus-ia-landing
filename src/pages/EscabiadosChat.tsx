import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function EscabiadosChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente virtual de Escabiados 🍻 ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState<string>(() => crypto.randomUUID());
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/escabiados-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      const reply: string = data.reply || data.message || data.text || data.output || 'Lo siento, no pude procesar tu mensaje.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un error de conexión. Intentá de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-ink min-h-screen flex flex-col text-cream">

      {/* Grain overlay */}
      <div
        className="fixed inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none z-50"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      {/* Header */}
      <header className="border-b border-line-soft px-6 py-4 flex items-center gap-4 bg-ink-soft shrink-0 z-10">
        <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl shrink-0">
          🍺
        </div>
        <div>
          <h1 className="font-display text-[20px] text-cream font-semibold leading-tight">Escabiados</h1>
          <p className="font-mono text-[11px] text-amber-400/70 uppercase tracking-widest">Asistente virtual · En línea</p>
        </div>
      </header>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] px-4 py-3 text-[15px] leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-amber-500/20 border border-amber-500/20 rounded-2xl rounded-br-sm text-cream'
                    : 'bg-ink-soft border border-line-soft rounded-2xl rounded-bl-sm text-cream/90'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-ink-soft border border-line-soft px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex gap-1 items-center h-5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-amber-400/50 animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-line-soft px-4 py-4 bg-ink-soft shrink-0 z-10">
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí tu mensaje..."
            rows={1}
            disabled={loading}
            className="flex-1 bg-ink border border-line-soft text-cream placeholder:text-cream/30 rounded-xl px-4 py-3 text-[15px] resize-none focus:outline-none focus:border-amber-500/50 transition-colors disabled:opacity-50"
            style={{ maxHeight: '120px', overflowY: 'auto' }}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="bg-amber-500 hover:bg-amber-400 disabled:bg-line-soft disabled:cursor-not-allowed text-ink rounded-xl p-3 transition-colors shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <p className="text-center font-mono text-[10px] text-cream/20 uppercase tracking-widest mt-3">
          Powered by Cygnus IA
        </p>
      </div>

    </div>
  );
}
