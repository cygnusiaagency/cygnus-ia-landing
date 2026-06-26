export interface Step {
  num: number;
  duration: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    num: 1,
    duration: 'Día 0 · 15 min gratis',
    title: 'Diagnóstico',
    body: 'Revisamos tus DMs, tu agenda y tu flujo de turnos. Te decimos exactamente cuántas horas y cuántos turnos estás perdiendo hoy.',
  },
  {
    num: 2,
    duration: 'Días 1 a 5',
    title: 'Implementación',
    body: 'Entrenamos al asistente con tus tratamientos y precios, lo conectamos a WhatsApp, Instagram y Google Calendar, y lo dejamos hablando como tu clínica.',
  },
  {
    num: 3,
    duration: 'Días 5 a 19 · gratis',
    title: 'Prueba real',
    body: 'El asistente atiende a tus pacientes reales durante 14 días. Medimos horas ahorradas y turnos agendados, día a día.',
  },
  {
    num: 4,
    duration: 'Si te ahorra horas',
    title: 'Setup + mensualidad',
    body: 'Recién ahí pagás el setup de USD 1.200 y USD 200/mes de mantenimiento. Si no te ahorró horas medibles, no facturamos.',
  },
];
