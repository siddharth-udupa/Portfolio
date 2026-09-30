import { MarkdownContent } from "@/components/blog/markdown-content";

export function PostPreview({ content }: { content: string }) {
  if (!content.trim()) {
    return (
      <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
        Nothing to preview yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-background p-6">
      <MarkdownContent content={content} />
    </div>
  );
}
