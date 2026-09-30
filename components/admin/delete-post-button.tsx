"use client";

import { useTransition } from "react";

import { deletePostAction } from "@/app/admin/(protected)/actions";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    const confirmed = window.confirm(`Delete "${title}" permanently?`);
    if (!confirmed) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.set("id", id);
      await deletePostAction(formData);
    });
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={pending}
      className="font-mono text-xs text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
    >
      {pending ? "…" : "delete"}
    </button>
  );
}
