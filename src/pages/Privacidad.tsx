import ConstellationMark from '../components/ConstellationMark';

const CONTACT_EMAIL = 'agency.cygnusai@gmail.com';
const LAST_UPDATED = '25 de junio de 2026';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold tracking-tightest text-ink sm:text-2xl">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </section>
  );
}

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-cream-deep text-ink">
      {/* Top bar */}
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <ConstellationMark size={26} variant="ink" />
            <span className="text-[19px] font-semibold tracking-[-0.02em] text-ink">
              Cygnus IA
            </span>
          </a>
          <a
            href="/"
            className="text-sm font-medium text-warm transition-colors hover:text-ink"
          >
            ← Volver al inicio
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-warm-soft">Legal</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tightest text-ink sm:text-4xl">
          Política de Privacidad
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-warm">
          Última actualización: {LAST_UPDATED}
        </p>

        <div className="mt-8 space-y-1 text-[15px] leading-relaxed text-ink-soft">
          <p>
            Esta Política de Privacidad describe cómo <strong>Cygnus IA</strong> ("nosotros",
            "nuestro") recopila, utiliza y protege la información cuando un negocio nos autoriza a
            gestionar su cuenta de Instagram, y cuando una persona interactúa con dicha cuenta a
            través de comentarios o mensajes directos.
          </p>
        </div>

        <Section title="1. Quiénes somos">
          <p>
            Cygnus IA es una agencia de automatización que provee asistentes de inteligencia
            artificial para que los negocios respondan automáticamente a comentarios y mensajes en
            Instagram, califiquen clientes potenciales y compartan recursos. El responsable del
            tratamiento de los datos es Cygnus IA, contactable en{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="2. Información que recopilamos">
          <p>Cuando interactuás con una cuenta de Instagram gestionada por Cygnus IA, podemos recopilar:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Identificadores públicos de Instagram:</strong> tu identificador de usuario
              (ID) y nombre de usuario (@usuario) de Instagram.
            </li>
            <li>
              <strong>Contenido de comentarios:</strong> el texto de los comentarios que publicás en
              las publicaciones del negocio.
            </li>
            <li>
              <strong>Contenido de mensajes directos:</strong> los mensajes que enviás e intercambiás
              con la cuenta del negocio dentro de la conversación.
            </li>
          </ul>
          <p>
            No recopilamos tu contraseña, datos de pago, ni información sensible. Solo accedemos a la
            información estrictamente necesaria para responder a tu interacción.
          </p>
        </Section>

        <Section title="3. Cómo usamos tu información">
          <p>Utilizamos la información recopilada únicamente para:</p>
          <ul className="ml-5 list-disc space-y-2">
            <li>Responder de forma automática a tu comentario con una respuesta pública.</li>
            <li>Iniciar y mantener una conversación por mensaje directo para entender qué necesitás.</li>
            <li>
              Enviarte el recurso o la información que solicitaste y, si corresponde, ofrecerte
              agendar una llamada.
            </li>
            <li>Llevar un registro interno de la conversación para dar seguimiento y mejorar el servicio.</li>
          </ul>
          <p>
            No vendemos tu información a terceros ni la usamos para publicidad de terceros.
          </p>
        </Section>

        <Section title="4. Con quién compartimos tu información">
          <p>
            Para operar el servicio, utilizamos proveedores tecnológicos que procesan datos por
            cuenta nuestra, bajo sus propias políticas de privacidad y medidas de seguridad:
          </p>
          <ul className="ml-5 list-disc space-y-2">
            <li>
              <strong>Meta Platforms, Inc. (Instagram):</strong> origen de la interacción y entrega de
              mensajes.
            </li>
            <li>
              <strong>Google LLC:</strong> almacenamiento del registro de conversaciones (Google
              Sheets).
            </li>
            <li>
              <strong>Anthropic, PBC:</strong> procesamiento de texto mediante inteligencia
              artificial para interpretar tus respuestas y generar la atención adecuada.
            </li>
          </ul>
          <p>
            Solo compartimos lo mínimo necesario para prestar el servicio. No compartimos tu
            información con anunciantes ni con terceros con fines comerciales propios.
          </p>
        </Section>

        <Section title="5. Conservación de los datos">
          <p>
            Conservamos el registro de tu interacción mientras sea necesario para darte seguimiento y
            prestar el servicio, o hasta que solicites su eliminación. Cuando dejan de ser
            necesarios, los datos se eliminan de forma segura.
          </p>
        </Section>

        <Section title="6. Cómo eliminar tus datos">
          <p>
            Tenés derecho a solicitar el acceso, la rectificación o la eliminación de tus datos en
            cualquier momento. Para hacerlo, escribinos a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>{' '}
            desde un medio que nos permita verificar tu identidad (por ejemplo, indicando tu nombre
            de usuario de Instagram). Procesaremos tu solicitud y eliminaremos la información asociada
            a tu cuenta dentro de los <strong>30 días</strong>. También podés revocar el acceso de la
            aplicación desde la configuración de tu cuenta de Instagram, en{' '}
            <em>Configuración → Apps y sitios web</em>.
          </p>
        </Section>

        <Section title="7. Seguridad">
          <p>
            Aplicamos medidas razonables para proteger tu información frente a accesos no autorizados,
            pérdida o alteración. El acceso a los datos está restringido a las personas y sistemas
            necesarios para operar el servicio.
          </p>
        </Section>

        <Section title="8. Privacidad de menores">
          <p>
            Nuestro servicio está dirigido a negocios y personas adultas. No recopilamos
            intencionadamente información de menores de edad.
          </p>
        </Section>

        <Section title="9. Cambios a esta política">
          <p>
            Podemos actualizar esta Política de Privacidad ocasionalmente. Publicaremos la versión
            vigente en esta página, con su fecha de última actualización.
          </p>
        </Section>

        <Section title="10. Contacto">
          <p>
            Si tenés preguntas sobre esta política o sobre el tratamiento de tus datos, escribinos a{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-accent hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <div className="mt-16 border-t border-line pt-8">
          <a href="/" className="text-sm font-medium text-warm transition-colors hover:text-ink">
            ← Volver al inicio
          </a>
        </div>
      </main>
    </div>
  );
}
