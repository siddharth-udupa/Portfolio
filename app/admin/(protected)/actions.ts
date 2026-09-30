"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { buildExcerpt, parseTags, readingTime } from "@/lib/blog";
import { createPost, deletePost, findPostIdBySlug, getPostById, updatePost } from "@/lib/posts";
import { requireAdmin } from "@/lib/session";
import { postFormSchema } from "@/lib/validation";

// Slugs already renamed or removed still have a cached page, so they are
// invalidated alongside the live one.
function revalidateBlog(staleSlugs: Array<string | undefined>) {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/(site)/blog/[slug]", "page");

  for (const slug of staleSlugs) {
    if (slug) revalidatePath(`/blog/${slug}`);
  }
}

export type PostFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  fieldErrors?: Record<string, string[]>;
  slugExists?: boolean;
};

export async function savePost(
  _prev: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await requireAdmin();

  const parsed = postFormSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    content: formData.get("content"),
    tags: formData.get("tags"),
    coverImage: formData.get("coverImage"),
    status: formData.get("status"),
    readingTimeMinutes: formData.get("readingTimeMinutes"),
    publishedAt: formData.get("publishedAt"),
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const values = parsed.data;
  const id = formData.get("id");
  const staleSlugs: Array<string | undefined> = [];

  const existingId = await findPostIdBySlug(values.slug);
  if (existingId && existingId !== id) {
    return {
      status: "error",
      message: "That slug is already taken by another post.",
      slugExists: true,
    };
  }

  const content = values.content;

  const input = {
    title: values.title,
    slug: values.slug,
    excerpt: values.excerpt || buildExcerpt(content),
    content,
    tags: parseTags(values.tags),
    coverImage: values.coverImage || null,
    status: values.status,
    readingTimeMinutes: readingTime(content),
    publishedAt: values.publishedAt ? new Date(values.publishedAt) : null,
  };

  if (typeof id === "string" && id) {
    const previous = await getPostById(id);
    await updatePost(id, input);
    staleSlugs.push(previous?.slug);
  } else {
    await createPost(input);
  }

  revalidateBlog(staleSlugs);

  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = formData.get("id");
  if (typeof id !== "string" || !id) return;

  const post = await getPostById(id);
  await deletePost(id);

  revalidateBlog([post?.slug]);
}
