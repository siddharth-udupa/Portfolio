import type { PostListItem } from "@/lib/posts";
import { Section, SectionHeading } from "@/components/ui/section";

import { ButtonLink } from "@/components/ui/button";
import { PostDate } from "@/components/blog/post-date";

export function Writing({ posts }: { posts: PostListItem[] }) {
  return (
    <Section id="writing">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Writing"
          title="Notes as I learn"
          description="Working through backend engineering, AI systems and system design — written down so I don't have to remember them."
        />
        <ButtonLink href="/blog" variant="secondary" size="sm" className="mb-10">
          All posts →
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No posts published yet. First one is on the way.
        </p>
      ) : (
        <ul className="divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <div>
                  <p className="font-medium tracking-tight group-hover:underline">
                    {post.title}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-1 line-clamp-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  ) : null}
                </div>
                <p className="shrink-0 font-mono text-xs text-muted-foreground">
                  {post.publishedAt ? <PostDate date={post.publishedAt} /> : null}
                  {" · "}
                  {post.readingTimeMinutes} min
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}
