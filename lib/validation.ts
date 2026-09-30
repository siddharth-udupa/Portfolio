import { z } from "zod";

export const postFormSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  excerpt: z.string().trim().max(300, "Excerpt is too long").default(""),
  content: z.string().min(1, "Content is required"),
  tags: z.string().default(""),
  coverImage: z
    .string()
    .trim()
    .url("Enter a valid URL")
    .or(z.literal(""))
    .default(""),
  status: z.enum(["draft", "published"]),
  publishedAt: z.string().default(""),
});

export type PostFormValues = z.infer<typeof postFormSchema>;
