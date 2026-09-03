import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/about")({ head: () => ({ meta: [{ title: "About — SO." }] }), component: About });

function About() { return <SiteShell active="about" className="inner-page"><section className="page-content about-content"><div><p className="page-label">About</p><h1>I’m a builder at the<br />intersection of business<br />and technology.</h1><p className="page-note">With a focus on clarity, simplicity, and real impact.<br />I help ideas become digital products people use<br />and remember.</p></div><div className="stats"><div><strong>06+</strong><span>Years of learning</span></div><div><strong>15+</strong><span>Projects completed</span></div><div><strong>10+</strong><span>Happy clients</span></div></div></section></SiteShell>; }
