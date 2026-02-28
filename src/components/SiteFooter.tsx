import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-900 shadow-xl transition-all group-hover:scale-105 group-hover:shadow-emerald-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 to-slate-900 opacity-100" />
                <div className="relative font-black text-emerald-500 text-lg tracking-tighter transition-all group-hover:text-emerald-400 group-hover:scale-110">
                  AK
                </div>
                <div className="absolute bottom-0 right-0 h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse m-1" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {siteData.brand}
              </span>
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
          <div className="flex flex-col items-center md:items-start gap-2">
            <p>&copy; {new Date().getFullYear()} {siteData.brand}. All rights reserved.</p>
            {siteData.gstNumber && (
              <p className="text-slate-600">GST: {siteData.gstNumber}</p>
            )}
          </div>
          <p className="text-slate-500 text-center md:text-right max-w-xs">
            {siteData.fullAddress}
          </p>
        </div>
      </div>
    </footer>
  );
}
