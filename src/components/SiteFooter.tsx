import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-500/20">
                <svg viewBox="0 0 24 24" fill="none" className="absolute inset-0 h-full w-full p-2 text-white" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{siteData.brand}</span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Your trusted local partner for CCTV, Computer, Solar and more in Varanasi since 2019.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
              Company
              <span className="block h-0.5 w-8 bg-emerald-500 mt-2"></span>
            </h3>
            <div className="grid gap-3 text-sm">
              <Link className="hover:text-emerald-400 transition-colors" href="/">Home</Link>
              <Link className="hover:text-emerald-400 transition-colors" href="/about">About Us</Link>
              <Link className="hover:text-emerald-400 transition-colors" href="/services">Services</Link>
              <Link className="hover:text-emerald-400 transition-colors" href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
              Support
              <span className="block h-0.5 w-8 bg-emerald-500 mt-2"></span>
            </h3>
            <div className="grid gap-3 text-sm">
              <a className="hover:text-emerald-400 transition-colors" href={buildTelLink()}>
                {siteData.phoneDisplay}
              </a>
              <a className="hover:text-emerald-400 transition-colors" href={`mailto:${siteData.email}`}>
                {siteData.email}
              </a>
              <p className="text-xs pt-2">{siteData.addressLine}</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white mb-6">
              Feedback
              <span className="block h-0.5 w-8 bg-emerald-500 mt-2"></span>
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href={buildWhatsAppLink(`Hello ${siteData.brand}, I have a query.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-500"
              >
                WhatsApp
              </a>
              <a
                href={siteData.reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Rate on Google
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} {siteData.brand}. All rights reserved.</p>
          <p className="text-slate-500">Babatpur, Varanasi, Uttar Pradesh</p>
        </div>
      </div>
    </footer>
  );
}
