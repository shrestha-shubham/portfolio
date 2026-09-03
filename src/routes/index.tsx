import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "SO. — Business × Technology" }, { name: "description", content: "I build digital products that create impact." }] }),
  component: Index,
});

function Index() {
  return <SiteShell active="home" className="homepage"><section className="reference-hero" id="home-hero" data-nav-section="home" aria-labelledby="hero-title"><div className="hero-copy"><h1 id="hero-title">Business × Technology</h1><p>I build digital products that create impact.</p></div><a className="scroll-cue" href="#home-work"><span>Scroll</span><i aria-hidden="true" /></a></section><section className="home-followup home-section" id="home-work" data-nav-section="work"><p className="page-label">Selected work</p><h2>Thoughtful digital products<br />with lasting impact.</h2><a href="/work">View selected work <span aria-hidden="true">→</span></a></section><section className="home-section home-section-split" id="home-about" data-nav-section="about"><div><p className="page-label">About</p><h2>Building at the<br />intersection of business<br />and technology.</h2></div><a href="/about">More about me <span aria-hidden="true">→</span></a></section><section className="home-section home-contact" id="home-contact" data-nav-section="contact"><div><p className="page-label">Contact</p><h2>Let’s build<br />something great.</h2></div><a href="mailto:shresthashubham618@gmail.com">shresthashubham618@gmail.com <span aria-hidden="true">→</span></a><a href="/contact">Start a conversation <span aria-hidden="true">→</span></a></section></SiteShell>;
}
