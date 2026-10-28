"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { LeadForm as LeadFormType } from "./LeadForm";

const LeadFormImpl = dynamic(() => import("./LeadForm").then((m) => m.LeadForm), {
  ssr: false,
  loading: () => <div className="min-h-[24rem] animate-pulse bg-surface/40" aria-busy="true" />,
});

/** Client-only lead form: the validation and form libraries load with the section, not with the page. */
export function LeadFormLazy(props: ComponentProps<typeof LeadFormType>) {
  return <LeadFormImpl {...props} />;
}
