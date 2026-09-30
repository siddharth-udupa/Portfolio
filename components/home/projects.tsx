import type { Project } from "@/lib/resume";
import { Section, SectionHeading } from "@/components/ui/section";

import { Badge } from "@/components/ui/badge";

export function Projects({ projects }: { projects: Project[] }) {
  const ordered = [...projects].sort((a, b) => Number(b.featured) - Number(a.featured));

  return (
    <Section id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="Things I've built"
        description="Production-style applications, mostly backend-heavy."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {ordered.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex flex-col rounded-xl border border-border bg-surface p-6">
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">{project.name}</h3>
        {project.links.live ? (
          <a
            href={project.links.live}
            target="_blank"
            rel="noreferrer noopener"
            className="shrink-0 font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            live ↗
          </a>
        ) : null}
      </div>
      <p className="font-mono text-xs text-muted-foreground">{project.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span aria-hidden="true" className="text-foreground">
              →
            </span>
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </div>

      <a
        href={project.links.github}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-5 self-start font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
      >
        github.com{sourcePath(project.links.github)} ↗
      </a>
    </article>
  );
}

function sourcePath(githubUrl: string) {
  return githubUrl.replace("https://github.com", "");
}
