import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "y8touvsc",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  studioHost: process.env.SANITY_STUDIO_HOST || "sans-portfolio",
});
