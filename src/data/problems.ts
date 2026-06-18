export interface Problem {
  code: string;
  title: string;
  body: string;
}

export const problems: Problem[] = [
  {
    code: 'P / 01',
    title: 'Leads que se enfrían en DMs',
    body: 'Pacientes en visto mientras estás inyectando. El 78% no reserva online, mandan un DM. Si tardás más de 5 minutos, se van con la competencia.',
  },
  {
    code: 'P / 02',
    title: 'El dolor de las cancelaciones',
    body: 'El 22.25% de las citas terminan en cancelación. Perder un turno de alto valor te cuesta miles de dólares al mes.',
  },
];
