import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { listAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const posts = await listAllPosts();
  const recent = posts.slice(0, 5);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Write something, publish it, done.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total posts" value={posts.length} />
        <StatCard label="Published" value={posts.filter((p) => p.status === "published").length} />
        <StatCard label="Drafts" value={posts.filter((p) => p.status === "draft").length} />
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/admin/posts/new">Write a post</ButtonLink>
        <ButtonLink href="/admin/posts" variant="secondary">
          Manage posts
        </ButtonLink>
      </div>

      <section>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          Recently edited
        </h2>

        {recent.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            Nothing here yet. Your drafts and published posts will show up in this list.
          </div>
        ) : (
          <ul className="divide-y divide-border border-y border-border">
            {recent.map((post) => (
              <li key={post.id} className="flex flex-wrap items-center gap-3 py-3">
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="min-w-0 flex-1 truncate text-sm hover:underline"
                >
                  {post.title}
                </Link>
                <Badge>{post.status}</Badge>
                <span className="font-mono text-xs text-muted-foreground">
                  {formatDate(post.updatedAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border bg-background p-5">
      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 text-3xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}
