import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { MarkdownContent } from "@/components/blog/markdown-content";
import { PostDate } from "@/components/blog/post-date";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, listPublishedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await listPublishedPosts(500).catch(() => []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt.toISOString(),
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug).catch(() => null);

  if (!post || post.status !== "published") {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-20">
      <Link
        href="/blog"
        className="font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        ← All posts
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-muted-foreground">
          {post.publishedAt ? <PostDate date={post.publishedAt} /> : null}
          <span aria-hidden="true">·</span>
          <span>{post.readingTimeMinutes} min read</span>
        </div>

        {post.tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge className="hover:text-foreground">{tag}</Badge>
              </Link>
            ))}
          </div>
        ) : null}
      </header>

      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="mt-10 w-full rounded-xl border border-border"
        />
      ) : null}

      <div className="mt-10">
        <MarkdownContent content={post.content} />
      </div>
    </article>
  );
}
