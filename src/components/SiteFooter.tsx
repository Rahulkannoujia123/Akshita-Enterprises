import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <div className="text-base font-semibold text-slate-900">
            {siteData.brand}
          </div>
          <div className="text-sm text-slate-600">{siteData.addressLine}</div>
          <div className="text-sm text-slate-600">
            Phone:{" "}
            <a
              className="font-semibold text-slate-900 hover:underline"
              href={buildTelLink()}
            >
              {siteData.phoneDisplay}
            </a>
          </div>
          <div className="text-sm text-slate-600">
            Email:{" "}
            <a
              className="font-semibold text-slate-900 hover:underline"
              href={`mailto:${siteData.email}`}
            >
              {siteData.email}
            </a>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-slate-900">Quick links</div>
          <div className="grid gap-2 text-sm">
            <Link className="text-slate-700 hover:underline" href="/">
              Home
            </Link>
            <Link className="text-slate-700 hover:underline" href="/services">
              Services
            </Link>
            <Link className="text-slate-700 hover:underline" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">
            Support & Feedback
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={buildWhatsAppLink(
                `Hello ${siteData.brand}, I want to know price and installation details.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-sm"
            >
              WhatsApp
            </a>
            <a
              href={siteData.reviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 shadow-sm"
            >
              Rate us
            </a>
          </div>
          <div className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {siteData.brand}. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
