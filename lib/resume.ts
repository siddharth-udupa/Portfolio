export type SkillGroup = {
  category: string;
  items: string[];
};

export type Project = {
  name: string;
  tagline: string;
  description: string;
  highlights: string[];
  tech: string[];
  links: { live?: string; github: string };
  featured: boolean;
};

export type OpenSourceEntry = {
  org: string;
  role: string;
  detail: string;
};

export const profile = {
  name: "K. Siddharth Udupa",
  initials: "SU",
  role: "Backend & Full-Stack Developer",
  location: "Kundapura, Karnataka, India",
  email: "siddharthudupa832@gmail.com",
  phone: "+91 6362380635",
  availability: "Open to Software Engineering internships (backend / full-stack)",
  summary:
    "Second-year BCA student building and deploying production-style full-stack web applications. Hands-on with authentication, AI-powered RAG systems, tool orchestration, secure file uploads, vector search, and containerised deployments.",
  socials: [
    { label: "GitHub", href: "https://github.com/siddharth-udupa" },
    { label: "LinkedIn", href: "https://linkedin.com/in/k-siddharth-udupa" },
  ],
} as const;

export const skillGroups: SkillGroup[] = [
  { category: "Languages", items: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"] },
  { category: "Frontend", items: ["React", "Next.js (App Router)", "Tailwind CSS", "Zustand"] },
  { category: "Backend", items: ["Node.js", "Express.js", "Hono", "grammY", "REST APIs"] },
  { category: "Databases", items: ["PostgreSQL", "Drizzle ORM", "pgvector"] },
  { category: "Auth & Security", items: ["Better Auth", "JWT", "Google OAuth 2.0", "bcrypt", "Helmet", "Rate Limiting"] },
  { category: "AI", items: ["Google Gemini", "RAG", "Tool Orchestration", "Vector Embeddings", "Tavily Search"] },
  { category: "DevOps & Tools", items: ["Git", "GitHub", "Docker", "Linux", "Vercel", "Cloudflare", "node-cron"] },
];

export const projects: Project[] = [
  {
    name: "Atlas AI",
    tagline: "Intelligent Telegram Assistant",
    description:
      "An AI-powered Telegram assistant delivering on-demand market intelligence briefings, email summaries, and conversational onboarding.",
    highlights: [
      "Integrated Google Workspace (Calendar & Gmail) via OAuth to manage events and fetch unread emails inside Telegram.",
      "Engineered dynamic personalisation using entity extraction and a daily decay job to maintain evolving interest scores.",
      "Architected a tool orchestrator that routes Gemini function calls to external APIs and PostgreSQL.",
    ],
    tech: ["TypeScript", "Express.js", "grammY", "Google Gemini", "PostgreSQL", "Drizzle ORM", "Tavily"],
    links: { github: "https://github.com/siddharth-udupa" },
    featured: true,
  },
  {
    name: "Axiom",
    tagline: "AI RAG Web Application",
    description:
      "A multi-user AI assistant with streaming responses, planner–executor–summariser pipeline, and automatic model fallback for rate limits.",
    highlights: [
      "Implemented Retrieval-Augmented Generation over pgvector embeddings with a web-assisted response pipeline.",
      "Containerised with Docker and deployed to Vercel with automatic model fallback for API rate limits.",
    ],
    tech: ["Next.js", "React", "PostgreSQL", "Drizzle ORM", "Better Auth", "Gemini", "pgvector", "Docker"],
    links: { live: "https://axiom-rag-app.vercel.app", github: "https://github.com/siddharth-udupa/Axiom" },
    featured: true,
  },
  {
    name: "Strava Clone",
    tagline: "Fitness Activity Platform (in progress)",
    description:
      "A Strava-inspired fitness platform with a production-oriented backend architecture, interactive route maps, and a cursor-paginated activity feed.",
    highlights: [
      "Implemented secure authentication and an infinite-scrolling activity feed using cursor-based pagination.",
      "Added GPX uploads, route rendering, interactive Leaflet maps, and secure GPX validation before parsing.",
    ],
    tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Leaflet"],
    links: { github: "https://github.com/siddharth-udupa/Strava-clone-app" },
    featured: true,
  },
  {
    name: "Attendance Calculator",
    tagline: "Full-Stack Attendance Tracking",
    description:
      "A deployed attendance tracking application with optimistic UI updates and local caching for fast day-to-day use.",
    highlights: [
      "Secured the backend with JWT authentication, bcrypt, Helmet, rate limiting, and schema-level validation.",
      "Built optimistic UI updates with local caching so the interface stays instant on poor networks.",
    ],
    tech: ["Node.js", "Express.js", "PostgreSQL", "Drizzle ORM", "Tailwind CSS"],
    links: { live: "https://ad-cal.vercel.app", github: "https://github.com/siddharth-udupa/Attendance-calculator" },
    featured: false,
  },
];

export const openSource: OpenSourceEntry[] = [
  {
    org: "The Untested API",
    role: "Open Source Contributor",
    detail:
      "Wrote unit and integration tests with Jest and Supertest, identifying and fixing bugs through test-driven debugging.",
  },
  {
    org: "Engineering Assignment",
    role: "Contributor",
    detail:
      "Implemented and tested a REST endpoint with validation, following the project's existing architecture.",
  },
];

export const education = {
  degree: "Bachelor of Computer Applications (BCA)",
  expectedGraduation: "2028",
};

export const interests = [
  "Backend Engineering",
  "Full-Stack Development",
  "Artificial Intelligence",
  "System Design",
  "Open Source",
];
