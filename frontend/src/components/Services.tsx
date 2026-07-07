import { site } from "@/content/site";

export default function Services() {
  const { services } = site;

  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="eyebrow text-gold">{services.eyebrow}</p>
        <h2 className="text-navy mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          {services.title}
        </h2>
        <p className="text-slate mt-4 text-lg">{services.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.items.map((item, i) => (
          <article
            key={item.title}
            className="group border-line bg-card hover:shadow-navy/5 rounded-2xl border p-7 transition-shadow hover:shadow-lg"
          >
            <div className="bg-navy/5 text-navy flex h-10 w-10 items-center justify-center rounded-lg font-mono text-sm font-semibold">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="text-navy mt-5 text-lg font-semibold">{item.title}</h3>
            <p className="text-slate mt-2 text-sm leading-relaxed">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
