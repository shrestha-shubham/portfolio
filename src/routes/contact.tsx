import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/contact")({ head: () => ({ meta: [{ title: "Contact — SO." }] }), component: Contact });

function Contact() { return <SiteShell active="contact" className="inner-page"><section className="page-content contact-content"><div><p className="page-label">Contact</p><h1>Let’s build<br />something great.</h1><p className="page-note">Have a project in mind or just want to say hi?<br />I’d love to hear from you.</p><p className="contact-detail"><span>Email</span><a href="mailto:shresthashubham618@gmail.com">shresthashubham618@gmail.com</a></p><p className="contact-detail"><span>Location</span>Kathmandu, Nepal</p></div><form className="contact-form" onSubmit={(event) => event.preventDefault()}><label>Name<input placeholder="Your name" /></label><label>Email<input type="email" placeholder="Your email" /></label><label>Message<textarea placeholder="Your message" rows={2} /></label><button type="submit" aria-label="Send message">→</button></form></section></SiteShell>; }
