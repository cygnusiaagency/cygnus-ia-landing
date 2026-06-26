export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: '¿Qué pasa si los 14 días no me convencen?',
    answer:
      'Te vas sin pagar el setup. Literalmente. No pedimos datos de tarjeta para empezar y no hay permanencia. Si el asistente no te ahorró horas que puedas medir vos mismo, no facturamos. Esa es la garantía completa.',
  },
  {
    question: '¿El asistente responde como mi clínica o suena a robot?',
    answer:
      'Lo entrenamos con tus tratamientos, tus precios y tu tono antes de ponerlo a hablar. Responde como una recepcionista que conoce tu clínica, no como un bot genérico. Y siempre podés tomar la conversación vos cuando quieras.',
  },
  {
    question: '¿Se conecta con mi WhatsApp, Instagram y mi agenda?',
    answer:
      'Sí. Atiende los DMs de WhatsApp e Instagram y agenda directamente en tu Google Calendar. Si usás otra agenda, lo vemos en el diagnóstico. Tu equipo sigue trabajando con las mismas herramientas de siempre.',
  },
  {
    question: '¿Cuánto tarda en estar funcionando?',
    answer:
      'Cinco días desde la llamada de diagnóstico hasta el asistente atendiendo pacientes reales. No te dejamos esperando semanas: en cinco días ya está cualificando y agendando.',
  },
  {
    question: '¿Va a reemplazar a mi recepción?',
    answer:
      'No. Se queda con lo repetitivo —responder DMs, cualificar y agendar— para que tu recepción dedique su tiempo a los pacientes que ya están en la clínica. Es una herramienta, no un reemplazo.',
  },
  {
    question: '¿Mis datos y los de mis pacientes están seguros?',
    answer:
      'Trabajamos sobre tus propias cuentas (tu WhatsApp, tu Instagram, tu Google Calendar) y usamos los servicios de IA con configuraciones que no entrenan modelos con tus datos. Firmamos NDA antes de la primera reunión técnica si lo necesitás.',
  },
];
