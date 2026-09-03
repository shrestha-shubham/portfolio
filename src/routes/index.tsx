import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maintenance" },
      {
        name: "description",
        content: "This website is temporarily unavailable while maintenance is underway.",
      },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-grid" aria-hidden="true" />
      <header className="maintenance-header">
        <span className="maintenance-mark">Maintenance</span>
        <span className="maintenance-status">
          <span className="status-dot" />
          System maintenance
        </span>
      </header>
      <section className="maintenance-content" aria-labelledby="maintenance-title">
        <p className="maintenance-kicker">Back shortly</p>
        <h1 id="maintenance-title">
          A little quiet
          <br />
          while we improve.
        </h1>
        <p className="maintenance-message">
          The studio is taking a brief maintenance break. The site will be back online soon.
        </p>
        <div className="maintenance-line" />
        <p className="maintenance-note">Thank you for your patience.</p>
      </section>
      <footer className="maintenance-footer">
        <span>Digital studio</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}
