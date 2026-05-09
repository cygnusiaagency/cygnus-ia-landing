export interface Problem {
  code: string;
  title: string;
  body: string;
}

export const problems: Problem[] = [
  {
    code: 'P / 01',
    title: 'Leads que se enfrían antes de que alguien los conteste.',
    body: 'El primero que responde gana el cliente. Si tardas más de 5 minutos, ya empezaste perdiendo.',
  },
  {
    code: 'P / 02',
    title: 'Tareas repetitivas comiéndose a tu mejor gente.',
    body: 'Copiar datos entre dos pestañas, generar reportes manuales, contestar lo mismo cien veces. No los contrataste para eso.',
  },
  {
    code: 'P / 03',
    title: 'Documentación dispersa que nadie consulta.',
    body: 'Manuales, políticas, procedimientos repartidos entre PDFs, Drive y Notion. Nadie los lee. Todos vuelven a preguntar lo mismo.',
  },
  {
    code: 'P / 04',
    title: 'Una web que parece de hace diez años.',
    body: 'Si tu sitio no genera confianza en el primer scroll, el visitante se va. Y nunca sabes a cuántos perdiste.',
  },
];
