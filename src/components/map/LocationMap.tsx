"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { PoiCategory, PointOfInterest } from "@/content/types";
import type { Localized } from "@/lib/localize";
import { cn } from "@/lib/utils";

type Poi = Localized<PointOfInterest>;
type Props = { pois: Poi[]; site: { lat: number; lng: number; label: string }; className?: string; compact?: boolean };

const CATS: PoiCategory[] = ["beach", "golf", "school", "healthcare", "airport", "dining", "culture", "nature"];

/**
 * Palette-matched interactive map (MapLibre GL, OpenFreeMap tiles, no key required).
 * Loaded only when the section is near the viewport. Points filter by category; selecting one shows travel time.
 */
export function LocationMap({ pois, site, className, compact }: Props) {
  const t = useTranslations("poiCat");
  const h = useTranslations("home");
  const c = useTranslations("common");
  const host = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const markers = useRef<Map<string, import("maplibre-gl").Marker>>(new Map());
  const [visible, setVisible] = useState(false);
  const [ready, setReady] = useState(false);
  const [filter, setFilter] = useState<PoiCategory | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const shown = useMemo(() => (filter === "all" ? pois : pois.filter((p) => p.category === filter)), [pois, filter]);
  const current = pois.find((p) => p.slug === selected) ?? null;

  // Load the map library only once the section is near the viewport AND the visitor has interacted
  // (scroll, pointer, touch, key) or the page has been idle for a while, so it never competes with first paint.
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let near = false;
    let interacted = false;
    let timer = 0;
    const maybe = () => {
      if (near && interacted) setVisible(true);
    };
    const onInteract = () => {
      interacted = true;
      maybe();
    };
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          near = true;
          maybe();
          timer = window.setTimeout(onInteract, 6000);
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    const evs = ["scroll", "pointerdown", "pointermove", "touchstart", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, onInteract, { passive: true, once: true }));
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      evs.forEach((e) => window.removeEventListener(e, onInteract));
    };
  }, []);

  useEffect(() => {
    if (!visible || !host.current || mapRef.current) return;
    let cancelled = false;
    (async () => {
      const maplibre = (await import("maplibre-gl")).default;
      await import("maplibre-gl/dist/maplibre-gl.css");
      if (cancelled || !host.current) return;
      const styles = getComputedStyle(document.documentElement);
      const dark = document.documentElement.dataset.direction === "b";
      const bone = styles.getPropertyValue("--bg").trim() || "#f7f3ec";
      const land = dark ? "#242321" : styles.getPropertyValue("--color-travertine").trim() || "#e3d9c8";
      const water = dark ? "#1b2a31" : styles.getPropertyValue("--color-sea-light").trim() || "#9ed1e6";
      const line = dark ? "#3a3733" : "#c9b99e";
      const label = dark ? "#a39174" : "#5a5650";
      const map = new maplibre.Map({
        container: host.current,
        style: "https://tiles.openfreemap.org/styles/positron",
        center: [site.lng, site.lat],
        zoom: compact ? 10.2 : 10.6,
        attributionControl: { compact: true },
        cooperativeGestures: true,
      });
      map.addControl(new maplibre.NavigationControl({ showCompass: false }), "top-right");
      map.on("load", () => {
        // Recolor the base style to the brand palette: bone paper, travertine land, sea-glass water, hairline roads.
        for (const layer of map.getStyle().layers ?? []) {
          const id = layer.id;
          const type = layer.type;
          try {
            if (type === "background") map.setPaintProperty(id, "background-color", bone);
            else if (type === "fill") map.setPaintProperty(id, "fill-color", /water|ocean/.test(id) ? water : land);
            else if (type === "line") {
              map.setPaintProperty(id, "line-color", line);
              if (/road|highway|street/.test(id)) map.setPaintProperty(id, "line-width", 0.6);
            } else if (type === "symbol") {
              map.setPaintProperty(id, "text-color", label);
              map.setPaintProperty(id, "text-halo-color", bone);
              if (/poi|airport|place_other|housenumber/.test(id)) map.setLayoutProperty(id, "visibility", "none");
            }
          } catch {}
        }
        setReady(true);
      });
      // Site pin
      const pin = document.createElement("div");
      pin.className = "ora-pin";
      pin.innerHTML = `<span class="ora-pin__dot"></span><span class="ora-pin__label">${site.label}</span>`;
      new maplibre.Marker({ element: pin, anchor: "bottom" }).setLngLat([site.lng, site.lat]).addTo(map);
      mapRef.current = map;
    })();
    return () => {
      cancelled = true;
    };
  }, [visible, site, compact]);

  // Sync POI markers with the filter
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;
    (async () => {
      const maplibre = (await import("maplibre-gl")).default;
      markers.current.forEach((m) => m.remove());
      markers.current.clear();
      const bounds = new maplibre.LngLatBounds([site.lng, site.lat], [site.lng, site.lat]);
      shown.forEach((p) => {
        const el = document.createElement("button");
        el.type = "button";
        el.className = "ora-poi";
        el.setAttribute("aria-label", p.name);
        el.dataset.active = String(p.slug === selected);
        el.addEventListener("click", () => setSelected(p.slug));
        const m = new maplibre.Marker({ element: el }).setLngLat([p.lng, p.lat]).addTo(map);
        markers.current.set(p.slug, m);
        bounds.extend([p.lng, p.lat]);
      });
      if (shown.length) map.fitBounds(bounds, { padding: compact ? 60 : 90, maxZoom: 12.5, duration: 900 });
    })();
  }, [shown, ready, selected, site, compact]);

  useEffect(() => {
    markers.current.forEach((m, slug) => (m.getElement().dataset.active = String(slug === selected)));
    if (current && mapRef.current)
      mapRef.current.easeTo({
        center: [current.lng, current.lat],
        duration: 800,
        zoom: Math.max(mapRef.current.getZoom(), 11.5),
      });
  }, [selected, current]);

  const time = (p: Poi) =>
    p.driveMinutes
      ? h("driveTime", { min: p.driveMinutes })
      : p.walkMinutes
        ? h("walkTime", { min: p.walkMinutes })
        : null;

  return (
    <div className={cn("grid grid-cols-12 gap-x-6 gap-y-8", className)}>
      <div className="col-span-12 lg:col-span-8">
        <div
          ref={host}
          className="relative aspect-[4/3] w-full bg-surface md:aspect-[16/10]"
          aria-label="Map of Dorado and points of interest"
          role="region"
        >
          {!ready && <div className="absolute inset-0 animate-pulse bg-surface" />}
          {current && (
            <div
              className="absolute bottom-4 left-4 max-w-[22rem] border border-rule bg-bg/95 p-4 text-fg backdrop-blur-sm"
              role="status"
            >
              <p className="eyebrow text-accent-ink">{t(current.category)}</p>
              <p className="mt-1 display-s">{current.name}</p>
              <p className="mt-1 small text-fg-muted">
                {time(current)}
                {current.placeholder && time(current) ? ` · ${h("approx")} · ${h("toBeConfirmed")}` : ""}
                {current.note ? ` · ${current.note}` : ""}
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-12 lg:col-span-4">
        <div
          role="group"
          aria-label={c("filters")}
          className="flex flex-wrap gap-x-5 gap-y-2 border-b border-rule pb-4"
        >
          {(["all", ...CATS] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={cn(
                "cursor-pointer py-1 eyebrow transition-colors",
                filter === cat ? "text-accent-ink" : "text-fg-muted hover:text-fg",
              )}
            >
              {cat === "all" ? h("filterAll") : t(cat)}
            </button>
          ))}
        </div>
        <p className="mt-4 small text-fg-muted">{h("mapHint")}</p>
        <ul className="mt-2 divide-y divide-rule">
          {shown.map((p) => (
            <li key={p.slug}>
              <button
                type="button"
                onClick={() => setSelected(p.slug)}
                aria-pressed={selected === p.slug}
                className={cn(
                  "flex w-full cursor-pointer items-baseline justify-between gap-4 py-3 text-left transition-colors hover:text-accent-ink",
                  selected === p.slug && "text-accent-ink",
                )}
              >
                <span>
                  <span className="block">{p.name}</span>
                  <span className="eyebrow text-fg-muted">{t(p.category)}</span>
                </span>
                <span className="shrink-0 eyebrow text-fg-muted tnum">
                  {time(p) ?? "—"}
                  {p.placeholder && time(p) ? "*" : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p className="mt-4 small text-fg-muted">
          * {h("approx")} · {h("toBeConfirmed")}
        </p>
      </div>
      <style>{`
        .ora-pin{display:flex;flex-direction:column;align-items:center;gap:4px;pointer-events:none}
        .ora-pin__dot{width:14px;height:14px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 6px color-mix(in srgb,var(--accent) 25%,transparent)}
        .ora-pin__label{font-family:var(--font-sans);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--fg);background:var(--bg);padding:4px 8px;border:1px solid var(--rule);white-space:nowrap}
        .ora-poi{width:24px;height:24px;border-radius:50%;background:transparent;border:0;padding:0;cursor:pointer;display:grid;place-items:center}
        .ora-poi::after{content:"";width:12px;height:12px;border-radius:50%;background:var(--bg);border:1.5px solid var(--accent);transition:transform .4s var(--ease-out-expo),background .3s}
        .ora-poi[data-active="true"]::after{background:var(--accent);transform:scale(1.5)}
        .maplibregl-ctrl-group{border-radius:0;box-shadow:none;border:1px solid var(--rule);background:var(--bg)}
        .maplibregl-ctrl-group button{border-radius:0}
        .maplibregl-ctrl-attrib{background:color-mix(in srgb,var(--bg) 85%,transparent);color:var(--fg-muted)}
        .maplibregl-ctrl-attrib a{color:inherit}
      `}</style>
    </div>
  );
}
