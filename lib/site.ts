export const siteConfig = {
  name: "Siddharth Udupa",
  title: "Siddharth Udupa — Backend & Full-Stack Developer",
  description:
    "Portfolio and blog of K. Siddharth Udupa, a BCA student building production-style full-stack web applications with TypeScript, Next.js, PostgreSQL and Drizzle ORM.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "en_IN",
} as const;

export const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
] as const;
