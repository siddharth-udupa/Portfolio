import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  tags: { name: string; count: number }[];
  active?: string;
};

export function TagFilter({ tags, active }: Props) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterLink href="/blog" active={!active}>
        All
      </FilterLink>
      {tags.map((tag) => (
        <FilterLink
          key={tag.name}
          href={`/blog?tag=${encodeURIComponent(tag.name)}`}
          active={active === tag.name}
        >
          {tag.name}
          <span className="ml-1 text-muted-foreground">{tag.count}</span>
        </FilterLink>
      ))}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full border px-3 py-1 font-mono text-xs transition-colors",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
