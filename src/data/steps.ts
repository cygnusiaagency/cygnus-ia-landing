export interface Step {
  num: number;
  duration: string;
  title: string;
  body: string;
}

export const steps: Step[] = [
  {
    num: 1,
    duration: '15 min · gratis',
    title: 'Diagnóstico',
    body: 'Entendemos tu proceso, calculamos el coste real y proponemos qué automatizar primero.',
  },
  {
    num: 2,
    duration: '3 a 7 días',
    title: 'Implementación',
    body: 'Construimos el sistema, lo conectamos a tus herramientas y formamos a tu equipo.',
  },
  {
    num: 3,
    duration: '14 días · gratis',
    title: 'Prueba real',
    body: 'El sistema corre en tu entorno con tus datos. Medimos las horas ahorradas día a día.',
  },
  {
    num: 4,
    duration: 'si funciona',
    title: 'Setup + mensualidad',
    body: 'Pagas el setup y una mensualidad de mantenimiento. Si no ahorró tiempo medible, te vas sin facturar.',
  },
];
