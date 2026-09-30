import Link from 'next/link';

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export default function LegalDocument({
  eyebrow,
  title,
  updatedAt = '14 de septiembre de 2026',
  sections,
}: {
  eyebrow: string;
  title: string;
  updatedAt?: string;
  sections: LegalSection[];
}) {
  return (
    <main className="bg-[#fbf5e9] px-4 py-12 sm:py-16">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-[#eadfce] bg-[#fffdf8] px-6 py-8 shadow-[0_24px_60px_rgba(32,43,60,0.06)] sm:px-12 sm:py-12">
        <div className="border-b border-[#eadfce] pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e05a3f]">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold text-primary sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-stone-500">Última actualización: {updatedAt}</p>
        </div>

        <div className="prose prose-stone mt-10 max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:leading-7 prose-li:leading-7">
          {sections.map((section) => (
            <section key={section.title} className="mb-9 last:mb-0">
              <h2 className="text-2xl font-bold">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-[#eadfce] pt-6 text-sm text-stone-500">
          <p>FEBEFLO · RUT 15.360.881-4 · Chile</p>
          <p className="mt-2">Los datos de contacto definitivos y cualquier campo indicado como pendiente deben completarse antes de publicar.</p>
          <Link href="/" className="mt-4 inline-flex font-semibold text-accent hover:underline">Volver a FEBEFLO</Link>
        </div>
      </article>
    </main>
  );
}
