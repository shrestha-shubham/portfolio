import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/work/")({ head: () => ({ meta: [{ title: "Selected Work — SO." }] }), component: Work });
const projects = [{ number: "01", title: "Nexus", type: "Web Experience", to: "/work/" }, { number: "02", title: "Lumina", type: "Product Design", to: "/work/lumina" }, { number: "03", title: "Volt", type: "Development", to: "/work/" }, { number: "04", title: "Flow", type: "System Design", to: "/work/" }];

function Work() { return <SiteShell active="work" className="inner-page"><section className="page-content work-content"><div className="page-intro"><h1>Selected Work</h1><p>A selection of projects that combine<br />business thinking with technology.</p></div><div className="project-list">{projects.map((project) => <Link className="project-item" to={project.to} key={project.number}><span className="project-number">{project.number}</span><span><strong>{project.title}</strong><small>{project.type}</small></span><span className="project-arrow">→</span></Link>)}</div></section></SiteShell>; }
