import { Studio } from "sanity";
import sanityConfig from "../sanity.config";
import { hasSanityConfig } from "./sanityClient";

export function AdminStudio() {
  if (!hasSanityConfig) {
    return (
      <main className="studio-setup">
        <section>
          <p className="section-kicker">Celestia Studio</p>
          <h1>Connect Sanity to start editing content.</h1>
          <p>
            Add your Sanity project values in Vercel or a local `.env` file, then
            reopen `/studio`. The public site will keep using fallback content
            until those values are available.
          </p>
          <code>VITE_SANITY_PROJECT_ID=your_project_id</code>
          <code>VITE_SANITY_DATASET=production</code>
          <code>VITE_SANITY_API_VERSION=2025-05-11</code>
        </section>
      </main>
    );
  }

  return <Studio config={sanityConfig} />;
}
