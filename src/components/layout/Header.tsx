"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Localized } from "@/lib/localize";
import type { SiteSettings } from "@/content/types";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { headerNav } from "./nav";
import { TextRoll } from "@/components/vendor/skiper-ui/skiper58";
import { LanguageToggle } from "./LanguageToggle";
import { OverlayMenu } from "./OverlayMenu";

type Props = { site: Localized<SiteSettings> };

/**
 * Transparent over a hero, solid bone after 40px of scroll.
 * Hides on scroll down, returns on scroll up. Carries the overlay menu trigger.
 */
export function Header({ site }: Props) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [overHero, setOverHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  // Does this page start with a dark, full-bleed hero? Pages mark it with data-hero on the section.
  useEffect(() => {
    const id = window.requestAnimationFrame(() => {
      setMenuOpen(false);
      setOverHero(!!document.querySelector("[data-hero]"));
      setScrolled(window.scrollY > 40);
    });
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 40);
        const delta = y - lastY.current;
        if (y < 120) setHidden(false);
        else if (delta > 6) setHidden(true);
        else if (delta < -6) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sticky bars and pinned panels sit just below the header while it shows, and at the very top when it
  // hides, so nothing ever peeks through the gap it leaves.
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", hidden && !menuOpen ? "0px" : "var(--header-h)");
  }, [hidden, menuOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.style.removeProperty("--header-offset");
    };
  }, []);

  const light = (overHero && !scrolled) || menuOpen;

  return (
    <>
      <header
        data-header
        data-state={light ? "light" : "solid"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-header transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
          light ? "bg-transparent text-white" : "bg-bg/95 text-fg backdrop-blur-sm",
          !light && scrolled && "border-b border-rule",
          hidden && !menuOpen ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <div className="container-x flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label="ORA World, home" className="shrink-0 py-2">
            <span className="relative block h-14 md:h-[4.75rem]" style={{ aspectRatio: "1.42 / 1" }}>
              <Logo
                tone="white"
                priority
                sizes="(min-width: 768px) 110px, 80px"
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-500",
                  light ? "opacity-100" : "opacity-0",
                )}
              />
              <Logo
                tone="gold"
                priority
                sizes="(min-width: 768px) 110px, 80px"
                className={cn(
                  "absolute inset-0 h-full w-full transition-opacity duration-500",
                  light ? "opacity-0" : "opacity-100",
                )}
              />
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {headerNav.map((item) => (
              <Link key={item.key} href={item.href} aria-label={t(item.key)} className="py-2 eyebrow">
                {/* Skiper UI text roll: letters roll up and are replaced from below on hover */}
                <span aria-hidden>
                  <TextRoll center className="leading-[1.1]">
                    {t(item.key)}
                  </TextRoll>
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <a href={site.portalUrl} className="hidden link-underline py-2 eyebrow md:inline-block" rel="noopener">
              {t("login")}
            </a>
            <LanguageToggle className="hidden md:inline-flex" />
            <Link
              href="/contact"
              className={cn(
                "hidden border px-5 py-3 eyebrow transition-colors duration-500 md:inline-block",
                light
                  ? "border-white/60 hover:bg-white hover:text-basalt"
                  : "border-accent text-accent-ink hover:bg-accent hover:text-white",
              )}
            >
              {t("inquire")}
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="overlay-menu"
              className="group inline-flex cursor-pointer items-center gap-3 py-2 eyebrow"
            >
              <span className="hidden sm:inline">{menuOpen ? t("close") : t("menu")}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={cn(
                    "absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-[var(--ease-in-out-quart)]",
                    menuOpen && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-[var(--ease-in-out-quart)]",
                    menuOpen && "-translate-y-[5.5px] -rotate-45",
                  )}
                />
              </span>
              <span className="sr-only">{menuOpen ? t("closeMenu") : t("openMenu")}</span>
            </button>
          </div>
        </div>
      </header>
      <OverlayMenu open={menuOpen} onClose={() => setMenuOpen(false)} site={site} />
    </>
  );
}
