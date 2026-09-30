import { education, interests, openSource, profile } from "@/lib/resume";
import { Section, SectionHeading } from "@/components/ui/section";

import { Badge } from "@/components/ui/badge";

export function About() {
  return (
    <Section id="about">
      <SectionHeading eyebrow="About" title="Who I am" />

      <div className="grid gap-10 md:grid-cols-3">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground md:col-span-2">
          <p>
            I&apos;m a second-year BCA student based in {profile.location}. I build full-stack
            applications end to end, with a bias toward the parts that are easy to skip: auth,
            data modelling, query design, and deployment.
          </p>
          <p>
            Most of what I know, I learned by shipping. The projects below are real
            deployments, not tutorials — each one pushed me into problems I had to go read the
            docs for. This site and its blog are where I write that down.
          </p>
          <p>{profile.availability}.</p>

          <div className="pt-2">
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-foreground">
              Interests
            </p>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge key={interest}>{interest}</Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-widest text-foreground">
              Education
            </p>
            <p className="text-sm text-muted-foreground">{education.degree}</p>
            <p className="text-sm text-muted-foreground">Expected {education.expectedGraduation}</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-foreground">
              Open source
            </p>
            <ul className="space-y-3">
              {openSource.map((entry) => (
                <li key={entry.org}>
                  <p className="text-sm font-medium">{entry.org}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{entry.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
