import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import model from "@/assets/character-anime-color.png";
import silhouette from "@/assets/character-silhouette.png";


import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import work7 from "@/assets/work-7.jpg";
import work8 from "@/assets/work-8.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubham Shrestha — Web Developer Portfolio" },
      {
        name: "description",
        content:
          "Portfolio of Shubham Shrestha, a web developer building fast, accessible and beautifully crafted websites and web apps.",
      },
      { property: "og:title", content: "Shubham Shrestha — Web Developer Portfolio" },
      {
        property: "og:description",
        content:
          "Selected work, skills and contact details for Shubham Shrestha, web developer.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const slides = [
  { src: work1, alt: "Late-night coding session on a laptop" },
  { src: work2, alt: "Mobile commerce app interface mockup" },
  { src: work3, alt: "Dark analytics dashboard with charts" },
  { src: work4, alt: "Bold typographic poster design" },
  { src: work5, alt: "3D render of connected glass nodes" },
  { src: work6, alt: "Close-up of a backlit mechanical keyboard" },
  { src: work7, alt: "Wireframes and design system sketches" },
  { src: work8, alt: "Neon-lit server room corridor" },
];

const projects = [
  { title: "Himalaya Commerce", meta: "Next.js · Stripe · 2025" },
  { title: "Pulse Analytics", meta: "React · D3 · 2025" },
  { title: "Studio Rubrik", meta: "Design system · 2024" },
  { title: "Nodegraph", meta: "WebGL · TypeScript · 2024" },
  { title: "Kathmandu Eats", meta: "PWA · Supabase · 2023" },
];

const isLocalHostname = (hostname?: string) => {
  if (!hostname) return false;

  const normalized = hostname.toLowerCase().replace(/:\d+$/, "");
  return (
    normalized === "localhost" ||
    normalized === "127.0.0.1" ||
    normalized === "::1" ||
    normalized === "[::1]" ||
    normalized.endsWith(".localhost")
  );
};

const skills = [
  "WEB DEVELOPMENT",
  "UX/UI DESIGN",
  "WEB ANIMATION",
  "BRAND DESIGN",
  "DESIGN SYSTEMS",
  "CREATIVE CODING",
];

function Index() {
  const isLocalServer =
    typeof window !== "undefined" && isLocalHostname(window.location.hostname);
  const runtimeMaintenanceSetting =
    typeof process !== "undefined" && process.env
      ? process.env.VITE_MAINTENANCE_MODE
      : undefined;
  const isMaintenanceMode =
    (String(runtimeMaintenanceSetting ?? import.meta.env.VITE_MAINTENANCE_MODE ?? "false")
      .trim()
      .toLowerCase() === "true") && !isLocalServer;
  const [skillIndex, setSkillIndex] = useState(0);

  useEffect(() => {
    if (isMaintenanceMode) {
      return;
    }

    const id = window.setInterval(
      () => setSkillIndex((i) => (i + 1) % skills.length),
      1600,
    );
    return () => window.clearInterval(id);
  }, [isMaintenanceMode]);

  if (isMaintenanceMode) {
    return (
      <main className="maintenance-page" role="status" aria-live="polite">
        <div className="maintenance-card">
          <p className="maintenance-kicker">Portfolio update</p>
          <h1 className="maintenance-title">
            Currently refining the experience ✦
            <span>New portfolio updates are on the way.</span>
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#home" aria-label="Home">SS</a>
        <p className="tagline">Code · Design · Create</p>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home" aria-label="Introduction">

        <div className="hero-visual">
          <div className="orbit" aria-hidden="true">
            <div className="orbit-ring">
              {slides.slice(0, 6).map((slide, i) => (
                <div
                  className="screen"
                  key={slide.src}
                  style={{ ["--i" as string]: i, ["--n" as string]: 6 }}
                >
                  <img src={slide.src} alt="" width={390} height={844} />
                </div>
              ))}
            </div>
          </div>
          <img className="hero-mask" src={silhouette} alt="" aria-hidden="true" />
          <div className="skillword" aria-live="polite" aria-label="What I do">
            <span key={skills[skillIndex]} className="skillword-text">
              {skills[skillIndex]!.split("").map((ch, i) => (
                <span
                  key={`${ch}-${i}`}
                  className="skillword-letter"
                  style={{ ["--l" as string]: i }}
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </div>


          <img
            className="hero-character"
            src={model}
            alt="Illustration of Shubham Shrestha sitting with a laptop"
            width={1024}
            height={1280}
          />

        </div>
      </section>



      <section className="section" id="about">
        <p className="eyebrow">About</p>
        <h3>Interfaces that feel alive</h3>
        <p className="max-w-2xl text-muted-foreground leading-relaxed">
          I'm Shubham Shrestha, a web developer based in Kathmandu. I build product websites and
          web apps end to end — from design systems and motion work to APIs and deployment. My
          focus is performance, clean typography, and interactions that carry meaning rather than
          noise.
        </p>
      </section>

      <section className="section" id="work">
        <p className="eyebrow">Selected work</p>
        <h3>Projects</h3>
        <div>
          {projects.map((p) => (
            <div className="work-row" key={p.title}>
              <span className="title">{p.title}</span>
              <span className="meta">{p.meta}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="contact">
        <p className="eyebrow">Contact</p>
        <h3>Let's build something</h3>
        <div className="flex flex-col gap-3">
          <a className="contact-link" href="mailto:hello@shubhamshrestha.dev">
            hello@shubhamshrestha.dev
          </a>
          <a
            className="contact-link"
            href="https://github.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub
          </a>
          <a
            className="contact-link"
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-16 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          © {new Date().getFullYear()} Shubham Shrestha
        </p>
      </section>
    </main>
  );
}
