import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        That page doesn&apos;t exist or hasn&apos;t been published yet.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Go home</ButtonLink>
        <ButtonLink href="/blog" variant="secondary">
          Read the blog
        </ButtonLink>
      </div>
      <Link
        href="/admin"
        className="mt-10 font-mono text-xs text-muted-foreground hover:text-foreground"
      >
        admin
      </Link>
    </div>
  );
}
