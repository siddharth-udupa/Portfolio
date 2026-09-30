import { profile } from "@/lib/resume";

import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 sm:py-28">
      <div className="max-w-3xl">
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          {profile.location}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">{profile.role}</p>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {profile.summary}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <ButtonLink href="#writing" size="lg">
            Read my writing
          </ButtonLink>
          <ButtonLink href="#contact" size="lg" variant="secondary">
            Get in touch
          </ButtonLink>
          <ButtonLink
            href="/resume.pdf"
            size="lg"
            variant="ghost"
            className="px-2"
            target="_blank"
          >
            Résumé ↓
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
