import type { StructureResolver } from "sanity/structure";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type).title(title));

/** Desk grouped by: Site · Pages · Residences · Media · Location · Press · Leads */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("ORA World")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items([
              singleton(S, "siteSettings", "Site settings"),
              S.documentTypeListItem("redirect").title("Redirects"),
            ]),
        ),
      S.listItem()
        .title("Pages")
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "homePage", "Homepage"),
              S.documentTypeListItem("project").title("Projects"),
              S.documentTypeListItem("page").title("Generic pages"),
              S.documentTypeListItem("faq").title("FAQ"),
              S.documentTypeListItem("incentive").title("Incentives"),
              S.documentTypeListItem("investmentStep").title("Deposits & timeline"),
            ]),
        ),
      S.listItem()
        .title("Residences")
        .child(
          S.list()
            .title("Residences")
            .items([
              S.documentTypeListItem("collection").title("Collections"),
              S.documentTypeListItem("floorPlan").title("Floor plans"),
              S.documentTypeListItem("amenity").title("Amenities"),
            ]),
        ),
      S.listItem()
        .title("Media")
        .child(
          S.list()
            .title("Media")
            .items([
              S.documentTypeListItem("galleryImage").title("Gallery"),
              S.documentTypeListItem("teamMember").title("Team & partners"),
            ]),
        ),
      S.listItem().title("Location").child(S.documentTypeList("pointOfInterest").title("Points of interest")),
      S.listItem().title("Press").child(S.documentTypeList("pressArticle").title("Press articles")),
      S.listItem()
        .title("Leads")
        .child(
          S.documentTypeList("lead")
            .title("Leads")
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }]),
        ),
    ]);
