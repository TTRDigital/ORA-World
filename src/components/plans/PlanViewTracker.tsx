"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function PlanViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    track("plan_view", { plan: slug });
  }, [slug]);
  return null;
}
