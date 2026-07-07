import { site } from "@/content/site";

export default function Approach() {
  const { approach } = site;

  return (
    <section id="approach" className="bg-navy-deep py-24 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">{approach.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            {approach.title}
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {approach.steps.map((step) => (
            <li key={step.no} className="bg-navy-deep p-8">
              <span className="text-gold font-mono text-3xl font-semibold">{step.no}</span>
              <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
