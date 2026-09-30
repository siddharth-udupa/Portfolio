import { notFound } from "next/navigation";

import { PostEditor } from "@/components/admin/post-editor";
import { getPostById } from "@/lib/posts";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostById(id).catch(() => null);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Edit post</h1>
        <p className="mt-1 font-mono text-xs text-muted-foreground">/{post.slug}</p>
      </div>

      <PostEditor
        post={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags.join(", "),
          coverImage: post.coverImage ?? "",
          status: post.status,
          publishedAt: post.publishedAt?.toISOString() ?? "",
        }}
      />
    </div>
  );
}
