import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
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
            Need a quick quote?
          </div>
          <div className="flex flex-wrap gap-2">
            <a
              href={buildWhatsAppLink(
                `Hello ${siteData.brand}, I want to know price/installation details.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              WhatsApp us
            </a>
            <a
              href={buildTelLink()}
              className="inline-flex rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Call now
            </a>
          </div>
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteData.brand}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

