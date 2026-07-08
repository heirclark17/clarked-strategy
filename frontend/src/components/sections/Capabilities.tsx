import { Fragment } from "react";
import { site } from "@/content/site";

export function Capabilities() {
  return (
    <div className="bg-gold">
      <div className="mx-auto flex max-w-[1360px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-6 py-4 md:px-10 lg:px-16">
        {site.capabilities.map((cap, i) => (
          <Fragment key={cap}>
            {i > 0 ? <span aria-hidden className="size-1 rounded-full bg-ink/40" /> : null}
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.14em] text-ink">
              {cap}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
