import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-xl transition-all group-hover:scale-105 group-hover:shadow-emerald-500/20">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-slate-900 opacity-100" />
            <div className="relative font-black text-emerald-500 text-lg tracking-tighter transition-all group-hover:text-emerald-400 group-hover:scale-110">
              AK
            </div>
            <div className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse m-1" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              {siteData.brand}
            </div>
            <div className="text-xs text-slate-600">{siteData.addressLine}</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-emerald-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildTelLink()}
            className="hidden rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50 sm:inline-flex"
          >
            Call
          </a>
          <a
            href={buildWhatsAppLink(`Hello ${siteData.brand}, I want to enquire.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            WhatsApp
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 pb-3 md:hidden">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-center text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
