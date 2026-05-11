import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";

const projectId =
  import.meta.env.VITE_SANITY_PROJECT_ID ||
  import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "missing-project-id";
const dataset =
  import.meta.env.VITE_SANITY_DATASET ||
  import.meta.env.NEXT_PUBLIC_SANITY_DATASET ||
  "production";

export default defineConfig({
  name: "celestia",
  title: "Celestia Content Studio",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
