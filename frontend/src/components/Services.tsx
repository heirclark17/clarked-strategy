import { site } from "@/content/site";

export default function Services() {
  const { services } = site;

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="eyebrow text-gold">{services.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-navy md:text-4xl">
          {services.title}
        </h2>
        <p className="mt-4 text-lg text-slate">{services.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item, i) => (
          <article
            key={item.title}
            className="group rounded-2xl border border-line bg-card p-7 transition-shadow hover:shadow-lg hover:shadow-navy/5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 font-mono text-sm font-semibold text-navy">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-5 text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
