export type LegalSection = { heading: string; body: string[] };

export default function LegalContent({
  sections,
  updated,
}: {
  sections: LegalSection[];
  updated: string;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted">Last updated: {updated}</p>
      <div className="mt-8 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="font-display text-xl font-bold text-ink">
              {s.heading}
            </h2>
            {s.body.map((p, i) => (
              <p key={i} className="mt-3 leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
