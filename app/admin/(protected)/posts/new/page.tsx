import { PostEditor } from "@/components/admin/post-editor";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">New post</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Save as a draft while you write, publish when it&apos;s ready.
        </p>
      </div>
      <PostEditor />
    </div>
  );
}
