export interface Capability {
  code: string;
  title: string;
  description: string;
  metric: string;
}

// El producto es uno solo: un asistente de IA para WhatsApp e Instagram.
// Estas son las tres tareas que hace, sin intervención humana.
export const services: Capability[] = [
  {
    code: '01',
    title: 'Responde en menos de 60 segundos',
    description:
      'Cada DM de WhatsApp e Instagram recibe respuesta al instante, 24/7. Tono de tu clínica, sin esperas, sin pacientes en visto. El primero que contesta es el que se queda con la cita.',
    metric: '< 60 s de respuesta',
  },
  {
    code: '02',
    title: 'Cualifica a cada paciente',
    description:
      'Pregunta por el tratamiento de interés, la zona, la urgencia y el presupuesto antes de ocupar la agenda. Tu equipo solo habla con pacientes reales, no con curiosos.',
    metric: 'Solo pacientes reales',
  },
  {
    code: '03',
    title: 'Agenda en Google Calendar',
    description:
      'Reserva el turno directamente en el calendario de tu clínica, confirma por mensaje y envía recordatorios para frenar las cancelaciones. Sin planillas, sin idas y vueltas.',
    metric: 'Menos no-shows',
  },
];
