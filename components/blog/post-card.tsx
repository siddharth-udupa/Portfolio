import Link from "next/link";

import type { PostListItem } from "@/lib/posts";
import { Badge } from "@/components/ui/badge";
import { PostDate } from "@/components/blog/post-date";

export function PostCard({ post }: { post: PostListItem }) {
  return (
    <article className="group relative rounded-xl border border-border bg-surface p-6 transition-colors hover:border-foreground/30">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
        {post.publishedAt ? <PostDate date={post.publishedAt} /> : null}
        <span aria-hidden="true">·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>

      <h2 className="mt-2 text-lg font-medium tracking-tight">
        <Link href={`/blog/${post.slug}`} className="before:absolute before:inset-0">
          {post.title}
        </Link>
      </h2>

      {post.excerpt ? (
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      ) : null}

      {post.tags.length > 0 ? (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
      ) : null}
    </article>
  );
}
