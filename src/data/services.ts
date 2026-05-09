export interface Service {
  code: string;
  titleParts: { before: string; emphasis: string; after: string };
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    code: 'SV.01',
    titleParts: {
      before: 'Asistente IA con tu ',
      emphasis: 'documentación oficial',
      after: '',
    },
    description:
      'Convertimos tus PDFs, manuales internos, políticas y bases de conocimiento en un asistente que responde citando capítulo y página exacta. Cero alucinaciones, cien por cien auditable. Para empresas donde una respuesta inventada es responsabilidad jurídica.',
    tags: ['Despachos', 'Industria', 'Formación', 'Atención cliente N1'],
  },
  {
    code: 'SV.02',
    titleParts: {
      before: 'Cualificación automática ',
      emphasis: 'de leads',
      after: '',
    },
    description:
      'Tus leads de WhatsApp, formulario web o Instagram reciben respuesta en menos de 60 segundos, 24 horas al día. Llegan a tu equipo ya cualificados, con la información que necesitan para cerrar. El resto, descartados sin perder un minuto.',
    tags: ['Inmobiliarias', 'Servicios profesionales', 'Educación', 'E-commerce'],
  },
  {
    code: 'SV.03',
    titleParts: {
      before: 'Automatización de ',
      emphasis: 'back-office',
      after: '',
    },
    description:
      'Tickets, facturas, conciliaciones, reportes, traspaso de datos entre sistemas. Lo que tu equipo hace cada día, nadie quiere hacer, y consume las horas más caras del mes. Lo construimos en n8n o código a medida según el caso.',
    tags: ['Administración', 'Logística', 'Contabilidad', 'Operaciones'],
  },
  {
    code: 'SV.04',
    titleParts: {
      before: 'Páginas web ',
      emphasis: 'que convierten',
      after: '',
    },
    description:
      'Sitios diseñados con criterio editorial y construidos con foco en conversión. Performance real, copy que vende sin sonar a vendedor, integración con tus sistemas. Esto que estás leyendo es exactamente lo que entregamos.',
    tags: ['Landing pages', 'Sitios corporativos', 'Embudos de captación', 'Rediseños'],
  },
];
