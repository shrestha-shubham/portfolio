import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/work/lumina")({ head: () => ({ meta: [{ title: "Lumina — SO." }] }), component: Lumina });

function Lumina() { return <SiteShell active="work" className="inner-page"><div className="detail-back"><Link to="/work/">‹ &nbsp; Back to work</Link><span>02 / 04</span></div><section className="page-content detail-content"><div><h1>Lumina</h1><p className="page-label">Product Design</p><p className="page-note">A minimal product that helps teams<br />organize ideas, tasks, and roadmaps<br />in one clean space.</p><div className="detail-meta"><span><b>Role</b>Product Strategy, UX/UI Design</span><span><b>Year</b>2024</span></div></div><div className="lumina-preview"><div className="preview-window"><small>LUMINA</small><b>Dashboard</b><div className="preview-chart"><i /><i /><i /><i /></div></div></div></section></SiteShell>; }
