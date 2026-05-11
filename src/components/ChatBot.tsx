import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ChatTurn {
  role: 'user' | 'model';
  text: string;
}

interface ChatBotProps {
  /** Endpoint to POST { message, history } to. Returns { reply }. */
  endpoint?: string;
  /** Greeting shown as the assistant's first message. */
  greeting?: string;
  /** Suggested first prompts the user can tap to insert. */
  suggestions?: string[];
  /** Placeholder text in the input. */
  placeholder?: string;
  /** Name shown above each assistant message. */
  assistantName?: string;
}

const DEFAULT_GREETING =
  '¡Hola! Soy Sol, asistente de Inmobiliaria del Sol. Atiendo 24/7. ¿Buscás alquilar, comprar, o ya tenés una propiedad en mente?';

const DEFAULT_SUGGESTIONS = [
  '¿Tienen 3 ambientes en Palermo?',
  'Busco casa con pileta en zona norte',
  '¿Hay alquileres temporarios disponibles?',
];

export default function ChatBot({
  endpoint = '/api/demo-chat',
  greeting = DEFAULT_GREETING,
  suggestions = DEFAULT_SUGGESTIONS,
  placeholder = 'Escribí tu consulta...',
  assistantName = 'Sol · Inmobiliaria del Sol',
}: ChatBotProps = {}) {
  const [messages, setMessages] = useState<ChatTurn[]>([{ role: 'model', text: greeting }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError('');
    const userTurn: ChatTurn = { role: 'user', text: trimmed };
    const next = [...messages, userTurn];
    setMessages(next);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // History = everything before the new user message; the new message
        // goes in the dedicated `message` field per the API contract.
        body: JSON.stringify({ message: trimmed, history: messages }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No pude responder ahora. Intentá de nuevo.');
      }

      const data = await res.json();
      const reply: string = data.reply || '';
      if (!reply) throw new Error('Respuesta vacía del modelo.');

      setMessages([...next, { role: 'model', text: reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión.');
      // Roll back the user turn so they can retry without losing it
      setMessages(messages);
      setInput(trimmed);
    } finally {
      setIsLoading(false);
      // Re-focus the input for fast follow-ups
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading && suggestions.length > 0;

  return (
    <div className="flex flex-col h-full w-full bg-cream text-ink">
      {/* Messages list */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4"
        aria-live="polite"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] sm:max-w-[78%] ${m.role === 'user' ? 'order-2' : ''}`}>
                {m.role === 'model' && (
                  <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-warm/70 mb-1.5 px-1">
                    {assistantName}
                  </p>
                )}
                <div
                  className={`px-4 py-3 rounded-2xl text-[15px] leading-[1.5] whitespace-pre-wrap ${
                    m.role === 'user'
                      ? 'bg-ink text-cream rounded-br-md'
                      : 'bg-cream-deep text-ink rounded-bl-md border border-line'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="max-w-[78%]">
              <p className="font-mono text-[10px] tracking-[0.08em] uppercase text-warm/70 mb-1.5 px-1">
                {assistantName}
              </p>
              <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-cream-deep border border-line inline-flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-warm/50 animate-pulse" />
                <span className="w-1.5 h-1.5 rounded-full bg-warm/50 animate-pulse [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-warm/50 animate-pulse [animation-delay:300ms]" />
              </div>
            </div>
          </motion.div>
        )}

        {error && (
          <p className="text-accent text-[13px] text-center pt-2">{error}</p>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="px-4 sm:px-6 pb-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => sendMessage(s)}
              className="font-mono text-[11px] tracking-[0.04em] py-2 px-3 border border-line rounded-full text-warm hover:bg-ink hover:text-cream hover:border-ink transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-line bg-cream px-4 sm:px-6 py-4 flex items-end gap-3"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          maxLength={1000}
          disabled={isLoading}
          className="flex-1 resize-none px-4 py-3 bg-cream-deep border border-line rounded-2xl text-ink caret-ink cursor-text font-sans text-[15px] placeholder:text-warm/60 focus:outline-none focus:border-ink/40 transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent text-cream hover:bg-ink transition-colors disabled:opacity-40 disabled:hover:bg-accent"
          aria-label="Enviar"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
