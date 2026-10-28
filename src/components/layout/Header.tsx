"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import type { Localized } from "@/lib/localize";
import type { SiteSettings } from "@/content/types";
import { cn } from "@/lib/utils";
import { Wordmark } from "./Wordmark";
import { headerNav } from "./nav";
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
    setMenuOpen(false);
    const hero = document.querySelector("[data-hero]");
    setOverHero(!!hero);
    setScrolled(window.scrollY > 40);
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
          <Link href="/" aria-label="ORA World" className="shrink-0 py-2">
            <Wordmark className="h-7 w-auto md:h-8" />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {headerNav.map((item) => (
              <Link key={item.key} href={item.href} className="eyebrow link-underline py-2">
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <a
              href={site.portalUrl}
              className="eyebrow link-underline hidden py-2 md:inline-block"
              rel="noopener"
            >
              {t("login")}
            </a>
            <LanguageToggle className="hidden md:inline-flex" />
            <Link
              href="/contact"
              className={cn(
                "eyebrow hidden border px-5 py-3 transition-colors duration-500 md:inline-block",
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
              className="eyebrow group inline-flex cursor-pointer items-center gap-3 py-2"
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
