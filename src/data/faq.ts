export interface FAQItem {
  question: string;
  answer: string;
}

export const faq: FAQItem[] = [
  {
    question: '¿Qué pasa si los 14 días no me convencen?',
    answer:
      'Te vas sin facturar nada. Literalmente. No hay letra pequeña, no hay datos de tarjeta, no hay permanencia. Si el sistema no te ahorró horas que tú mismo puedas medir y verificar, no es nuestro cliente y no nos interesa cobrarte. Esa es la garantía completa.',
  },
  {
    question: '¿Qué tan técnico tengo que ser yo o mi equipo?',
    answer:
      'Cero. Tú nos cuentas el proceso, nosotros lo implementamos en tu entorno y te damos un panel de control en lenguaje humano. Si tu equipo sabe usar Excel y WhatsApp, sabe usar lo que entregamos. La complejidad técnica es nuestro trabajo, no el tuyo.',
  },
  {
    question: '¿Cuánto tarda en estar funcionando de verdad?',
    answer:
      'Entre 3 y 7 días desde la llamada de diagnóstico hasta el sistema corriendo en producción con tus datos. Procesos más complejos pueden llevar dos semanas, pero te lo decimos antes de empezar. Nunca te dejamos esperando un mes sin entregables visibles.',
  },
  {
    question: '¿Mis datos están seguros?',
    answer:
      'Trabajamos sobre tus propios entornos siempre que es posible (tu base de datos, tu Drive, tu CRM). Cuando usamos servicios de IA externos, lo hacemos con configuraciones que no entrenan modelos con tus datos. Te firmamos NDA antes de la primera reunión técnica si lo necesitas.',
  },
  {
    question: '¿Qué procesos puedo automatizar?',
    answer:
      'Regla simple: si tu equipo lo hace de forma repetitiva, con criterios identificables y con datos digitales, probablemente se puede automatizar. Atención de leads, generación de reportes, entrada de datos, conciliaciones, respuestas frecuentes, búsqueda en documentación. En la llamada de 15 minutos te decimos qué se puede y qué no, sin venderte humo.',
  },
  {
    question: '¿Por qué Cygnus IA y no otra agencia?',
    answer:
      'Porque no vendemos talleres, consultorías ni "transformación digital". Vendemos sistemas que se miden en horas ahorradas. La factura llega cuando hay resultado verificable, no antes. Si esa lógica te parece justa, somos los que estás buscando.',
  },
];
