"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/blog";
import { toLocalDateTimeInput } from "@/lib/format";
import { cn } from "@/lib/utils";
import { savePost, type PostFormState } from "@/app/admin/(protected)/actions";

import { Field, inputClassName } from "./post-fields";
import { PostPreview } from "./post-preview";

type PostValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  coverImage: string;
  status: "draft" | "published";
  publishedAt: string;
};

const initialState: PostFormState = { status: "idle" };

export function PostEditor({ post }: { post?: PostValues }) {
  const [state, formAction, pending] = useActionState(savePost, initialState);
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [tags, setTags] = useState(post?.tags ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [preview, setPreview] = useState(false);

  // Once the slug has been edited by hand it is never overwritten again.
  const slugEdited = useRef(Boolean(post?.slug));

  useEffect(() => {
    if (!slugEdited.current) {
      setSlug(slugify(post?.title ?? ""));
    }
  }, [post?.title]);

  return (
    <form action={formAction} className="space-y-6">
      {post?.id ? <input type="hidden" name="id" value={post.id} /> : null}

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Field label="Title" error={state.fieldErrors?.title?.[0]}>
            <input
              name="title"
              required
              defaultValue={post?.title}
              onChange={(event) => {
                if (!slugEdited.current) setSlug(slugify(event.target.value));
              }}
              className={inputClassName}
              placeholder="What I learned this week"
            />
          </Field>

          <Field
            label="Slug"
            error={state.fieldErrors?.slug?.[0] ?? (state.slugExists ? state.message : undefined)}
          >
            <div className="flex items-center rounded-lg border border-border bg-background focus-within:border-foreground/50">
              <span className="pl-3 font-mono text-xs text-muted-foreground">/blog/</span>
              <input
                name="slug"
                required
                value={slug}
                onChange={(event) => {
                  slugEdited.current = true;
                  setSlug(slugify(event.target.value));
                }}
                className="h-10 w-full bg-transparent px-2 font-mono text-sm outline-none"
              />
            </div>
          </Field>

          <Field label="Excerpt" error={state.fieldErrors?.excerpt?.[0]}>
            <textarea
              name="excerpt"
              rows={2}
              defaultValue={post?.excerpt}
              className={cn(inputClassName, "h-auto resize-y py-2")}
              placeholder="Shown on the blog index and in social previews. Left empty, it is generated from the content."
            />
          </Field>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="content" className="text-sm font-medium">
                Content (Markdown)
              </label>
              <button
                type="button"
                onClick={() => setPreview((value) => !value)}
                className="font-mono text-xs text-muted-foreground hover:text-foreground"
              >
                {preview ? "Edit" : "Preview"}
              </button>
            </div>

            {preview ? (
              <PostPreview content={content} />
            ) : (
              <textarea
                id="content"
                name="content"
                required
                rows={26}
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className={cn(inputClassName, "h-auto resize-y py-3 font-mono text-sm leading-relaxed")}
                placeholder={"# Heading\n\nWrite in Markdown. Code fences get syntax highlighting."}
              />
            )}
          </div>
        </div>

        <div className="space-y-5">
          <Field label="Tags" hint="Comma separated" error={state.fieldErrors?.tags?.[0]}>
            <input
              name="tags"
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className={inputClassName}
              placeholder="postgres, drizzle, orm"
            />
          </Field>

          <Field label="Status">
            <select name="status" defaultValue={post?.status ?? "draft"} className={inputClassName}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <Field label="Publish date" hint="Optional, defaults to now">
            <input
              type="datetime-local"
              name="publishedAt"
              defaultValue={toLocalDateTimeInput(post?.publishedAt)}
              className={inputClassName}
            />
          </Field>

          <Field label="Cover image URL" error={state.fieldErrors?.coverImage?.[0]}>
            <input
              name="coverImage"
              defaultValue={post?.coverImage}
              className={inputClassName}
              placeholder="https://…"
            />
          </Field>

          {state.status === "error" && !state.slugExists ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {state.message}
            </p>
          ) : null}

          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Saving…" : post?.id ? "Save changes" : "Create post"}
            </Button>
            <Link
              href="/admin/posts"
              className="rounded-lg border border-border py-2 text-center text-sm text-muted-foreground hover:text-foreground"
            >
              Cancel
            </Link>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            Reading time is calculated from the content. Publishing makes the post visible
            immediately; drafts stay private.
          </p>
        </div>
      </div>
    </form>
  );
}
