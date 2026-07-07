import { site } from "@/content/site";

export default function About() {
  const { about } = site;

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow text-gold">{about.eyebrow}</p>
          <h2 className="text-navy mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4">
            {about.body.map((p, i) => (
              <p key={i} className="text-slate text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

        <ul className="border-line bg-card flex flex-col justify-center gap-4 rounded-2xl border p-8">
          {about.points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                className="bg-gold/15 text-gold mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full"
                aria-hidden
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6.5l2.5 2.5 4.5-5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="text-navy text-base font-medium">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
