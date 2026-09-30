import { skillGroups } from "@/lib/resume";
import { Section, SectionHeading } from "@/components/ui/section";

import { Badge } from "@/components/ui/badge";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        eyebrow="Skills"
        title="What I work with"
        description="Tools I reach for, grouped by the problem they solve."
      />

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 text-sm font-medium">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
