import Link from "next/link";

import { PostRow } from "@/components/admin/post-row";
import { ButtonLink } from "@/components/ui/button";
import { listAllPosts } from "@/lib/posts";
import type { PostListItem } from "@/lib/posts";

export default async function AdminPostsPage() {
  const posts = await listAllPosts();

  const published = posts.filter((post) => post.status === "published");
  const drafts = posts.filter((post) => post.status === "draft");

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Posts</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {published.length} published · {drafts.length} drafts
          </p>
        </div>
        <ButtonLink href="/admin/posts/new" size="sm">
          New post
        </ButtonLink>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-sm text-muted-foreground">No posts yet.</p>
          <Link
            href="/admin/posts/new"
            className="mt-2 inline-block text-sm underline underline-offset-4"
          >
            Write your first one
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {published.length > 0 ? <PostGroup title="Published" posts={published} /> : null}
          {drafts.length > 0 ? <PostGroup title="Drafts" posts={drafts} /> : null}
        </div>
      )}
    </div>
  );
}

function PostGroup({ title, posts }: { title: string; posts: PostListItem[] }) {
  return (
    <section>
      <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </h2>
      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-background">
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
