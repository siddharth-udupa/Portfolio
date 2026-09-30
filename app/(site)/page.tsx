import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { Writing } from "@/components/home/writing";
import { projects } from "@/lib/resume";
import { listPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function HomePage() {
  const recentPosts = await listPublishedPosts(3).catch(() => []);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Writing posts={recentPosts} />
      <Contact />
    </>
  );
}
