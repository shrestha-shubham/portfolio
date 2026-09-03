import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

type SiteShellProps = { active?: "home" | "work" | "about" | "contact"; children: ReactNode; className?: string };

export function SiteShell({ active, children, className = "" }: SiteShellProps) {
  const isHomepage = className.includes("homepage");
  const [visibleSection, setVisibleSection] = useState(active);
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isHomepage) return;
    const page = pageRef.current;
    if (!page) return;
    const sections = Array.from(page.querySelectorAll<HTMLElement>("section[data-nav-section]"));
    const updateActiveSection = () => {
      if (page.scrollTop <= 20) {
        setVisibleSection("home");
        return;
      }
      const nearest = sections.reduce((closest, section) => {
        const distance = Math.abs(section.offsetTop - page.scrollTop);
        return distance < closest.distance ? { section, distance } : closest;
      }, { section: sections[0], distance: Number.POSITIVE_INFINITY });
      const key = nearest.section?.dataset.navSection as SiteShellProps["active"] | undefined;
      if (key) setVisibleSection(key);
    };
    updateActiveSection();
    page.addEventListener("scroll", updateActiveSection, { passive: true });
    return () => page.removeEventListener("scroll", updateActiveSection);
  }, [isHomepage]);

  const navItems = [{ label: "Work", route: "/work", anchor: "#work", key: "work" }, { label: "About", route: "/about", anchor: "#about", key: "about" }, { label: "Contact", route: "/contact", anchor: "#contact", key: "contact" }] as const;
  return <main ref={pageRef} className={`reference-page ${className}`}><header className="reference-header"><nav className="reference-nav" aria-label="Primary navigation">{navItems.map((item) => isHomepage ? <a className={item.key === "home" ? "is-active" : ""} href={item.anchor} key={item.key}>{item.label}</a> : <Link className={active === item.key ? "is-active" : ""} to={item.route} key={item.key}>{item.label}</Link>)}</nav></header>{children}<aside className="social-rail" aria-label="Social links"><a href="https://github.com/shrestha-shubham" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/shubham-shrestha-01a4183ba/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a><a href="mailto:shresthashubham618@gmail.com" aria-label="Email"><Mail size={19} /></a></aside><footer className="reference-footer"><small>© SO. ALL RIGHTS RESERVED.</small></footer></main>;
}
