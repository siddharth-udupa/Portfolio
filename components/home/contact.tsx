import { profile } from "@/lib/resume";
import { Section, SectionHeading } from "@/components/ui/section";

import { ButtonLink } from "@/components/ui/button";

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Open to software engineering internships, backend or full-stack. Happy to talk through anything I've built."
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <ButtonLink href={`mailto:${profile.email}`} size="lg">
          {profile.email}
        </ButtonLink>
        <a
          href={profile.socials[0].href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          GitHub ↗
        </a>
        <a
          href={profile.socials[1].href}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
        >
          LinkedIn ↗
        </a>
      </div>
    </Section>
  );
}
