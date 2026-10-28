import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "portfolio",
  title: "SANS Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missingprojectid",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Portfolio content")
          .items([
            S.listItem()
              .title("Site pages & settings")
              .id("siteContent")
              .child(S.document().schemaType("siteContent").documentId("siteContent")),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
