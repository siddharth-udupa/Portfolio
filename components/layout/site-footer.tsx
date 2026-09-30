import Link from "next/link";

import { profile } from "@/lib/resume";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {profile.name}. Built with Next.js and Drizzle ORM.
        </p>
        <div className="flex items-center gap-5">
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-foreground"
            >
              {social.label}
            </a>
          ))}
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </div>
      </div>
    </footer>
  );
}
