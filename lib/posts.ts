import "server-only";

import { and, count, desc, eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { posts } from "@/lib/db/schema";
import type { Post, PostStatus } from "@/lib/db/schema";

const listColumns = {
  id: posts.id,
  title: posts.title,
  slug: posts.slug,
  excerpt: posts.excerpt,
  tags: posts.tags,
  coverImage: posts.coverImage,
  status: posts.status,
  readingTimeMinutes: posts.readingTimeMinutes,
  publishedAt: posts.publishedAt,
  createdAt: posts.createdAt,
  updatedAt: posts.updatedAt,
} as const;

export type PostListItem = {
  [K in keyof typeof listColumns]: Post[K];
};

export type PostInput = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string | null;
  status: PostStatus;
  readingTimeMinutes: number;
  publishedAt: Date | null;
};

function resolvePublishedAt(input: PostInput): Date | null {
  if (input.status !== "published") return null;
  return input.publishedAt ?? new Date();
}

export async function listPublishedPosts(limit = 100): Promise<PostListItem[]> {
  return db
    .select(listColumns)
    .from(posts)
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt))
    .limit(limit);
}

export async function listPublishedPostsByTag(tag: string): Promise<PostListItem[]> {
  return db
    .select(listColumns)
    .from(posts)
    .where(and(eq(posts.status, "published"), sql`${tag} = any(${posts.tags})`))
    .orderBy(desc(posts.publishedAt), desc(posts.createdAt));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
  return post ?? null;
}

export async function getPostById(id: string): Promise<Post | null> {
  const [post] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  return post ?? null;
}

export async function listAllPosts(): Promise<PostListItem[]> {
  return db.select(listColumns).from(posts).orderBy(desc(posts.updatedAt));
}

export async function findPostIdBySlug(slug: string): Promise<string | null> {
  const [row] = await db
    .select({ id: posts.id })
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);
  return row?.id ?? null;
}

export async function createPost(input: PostInput): Promise<Post> {
  const [created] = await db
    .insert(posts)
    .values({ ...input, publishedAt: resolvePublishedAt(input) })
    .returning();
  return created;
}

export async function updatePost(id: string, input: PostInput): Promise<Post | null> {
  const [updated] = await db
    .update(posts)
    .set({ ...input, publishedAt: resolvePublishedAt(input), updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return updated ?? null;
}

export async function deletePost(id: string): Promise<boolean> {
  const [deleted] = await db
    .delete(posts)
    .where(eq(posts.id, id))
    .returning({ id: posts.id });
  return Boolean(deleted);
}

export async function countPublishedPosts(): Promise<number> {
  const [row] = await db
    .select({ value: count() })
    .from(posts)
    .where(eq(posts.status, "published"));
  return row?.value ?? 0;
}

export type TagWithCount = { name: string; count: number };

export async function listTags(): Promise<TagWithCount[]> {
  return db
    .select({ name: sql<string>`unnest(${posts.tags})`.as("name"), count: count() })
    .from(posts)
    .where(eq(posts.status, "published"))
    .groupBy(sql`unnest(${posts.tags})`)
    .orderBy(desc(count()));
}
