import Link from "next/link";

import { SignOutButton } from "@/components/admin/sign-out-button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { countPublishedPosts } from "@/lib/posts";

export async function AdminShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const published = await countPublishedPosts().catch(() => 0);

  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-6">
          <nav className="flex items-center gap-6">
            <Link href="/admin" className="font-mono text-sm font-medium">
              admin
            </Link>
            <Link href="/admin/posts" className="text-sm text-muted-foreground hover:text-foreground">
              Posts
            </Link>
            <Link href="/admin/posts/new" className="text-sm text-muted-foreground hover:text-foreground">
              New
            </Link>
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
              View site ↗
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              {published} published
            </span>
            <ThemeToggle />
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-10">{children}</main>

      <p className="mx-auto w-full max-w-5xl px-6 pb-10 font-mono text-xs text-muted-foreground">
        Signed in as {email}
      </p>
    </div>
  );
}
