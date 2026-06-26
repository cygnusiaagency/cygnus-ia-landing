export interface Problem {
  code: string;
  stat: string;
  title: string;
  body: string;
}

export const problems: Problem[] = [
  {
    code: '01',
    stat: '78%',
    title: 'Leads que se enfrían en DMs',
    body: 'Pacientes en visto mientras estás inyectando. El 78% no reserva online: mandan un DM. Si tardás más de 5 minutos en responder, se van con la competencia.',
  },
  {
    code: '02',
    stat: '22%',
    title: 'El dolor de las cancelaciones',
    body: 'El 22,25% de las citas terminan en cancelación o no-show. Perder un turno de alto valor te cuesta miles de dólares cada mes.',
  },
];
