import Link from "next/link";

import { formatDate } from "@/lib/format";
import { DeletePostButton } from "@/components/admin/delete-post-button";
import { Badge } from "@/components/ui/badge";
import type { PostListItem } from "@/lib/posts";

export function PostRow({ post }: { post: PostListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-5 py-4">
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{post.title}</p>
        <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
          /{post.slug} · {post.publishedAt ? formatDate(post.publishedAt) : `edited ${formatDate(post.updatedAt)}`}
        </p>
      </div>

      {post.tags.slice(0, 3).map((tag) => (
        <Badge key={tag} className="hidden sm:inline-flex">
          {tag}
        </Badge>
      ))}

      <span className="font-mono text-xs text-muted-foreground">{post.readingTimeMinutes} min</span>

      <div className="flex items-center gap-4">
        {post.status === "published" ? (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="font-mono text-xs text-muted-foreground hover:text-foreground"
          >
            view ↗
          </Link>
        ) : null}
        <Link
          href={`/admin/posts/${post.id}`}
          className="font-mono text-xs text-muted-foreground hover:text-foreground"
        >
          edit
        </Link>
        <DeletePostButton id={post.id} title={post.title} />
      </div>
    </div>
  );
}
