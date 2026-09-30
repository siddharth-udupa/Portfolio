import type { Metadata } from "next";

import { PostCard } from "@/components/blog/post-card";
import { TagFilter } from "@/components/blog/tag-filter";
import { listPublishedPosts, listPublishedPostsByTag, listTags } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend engineering, AI systems and system design, written as I learn them.",
  alternates: { canonical: "/blog" },
};

type PageProps = {
  searchParams: Promise<{ tag?: string }>;
};

export default async function BlogPage({ searchParams }: PageProps) {
  const { tag } = await searchParams;

  const [tags, posts] = await Promise.all([
    listTags().catch(() => []),
    (tag ? listPublishedPostsByTag(tag) : listPublishedPosts()).catch(() => []),
  ]);

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <header className="mb-10 max-w-2xl">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Writing
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Blog</h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Working notes on backend engineering, AI systems and system design. Most of these start
          as something I got wrong, then figure out.
        </p>
      </header>

      <TagFilter tags={tags} active={tag} />

      <div className="mt-10">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            {tag ? `No posts tagged "${tag}" yet.` : "No posts published yet."}
          </p>
        ) : (
          <div className="grid gap-5">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>

      <p className="mt-12 font-mono text-xs text-muted-foreground">
        {posts.length} post{posts.length === 1 ? "" : "s"}
        {tag ? ` tagged ${tag}` : ""} · {siteConfig.name}
      </p>
    </div>
  );
}
