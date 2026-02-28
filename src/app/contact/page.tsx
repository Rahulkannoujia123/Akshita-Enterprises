import type { Metadata } from "next";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Akshita Enterprises in Babatpur, Varanasi. Call/WhatsApp: +91 8787260552.",
};

export default function ContactPage() {
  const mapsQuery = encodeURIComponent(
    `${siteData.brand}, ${siteData.addressLine}`
  );
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  return (
    <div className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Contact
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Call or WhatsApp for pricing, installation and service support.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <div className="text-sm font-semibold text-slate-900">Phone</div>
                <a
                  href={buildTelLink()}
                  className="mt-2 block text-2xl font-extrabold text-slate-900 hover:underline"
                >
                  {siteData.phoneDisplay}
                </a>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={buildTelLink()}
                    className="inline-flex rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    Call now
                  </a>
                  <a
                    href={buildWhatsAppLink(
                      `Hello ${siteData.brand}, I want to enquire.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              <div>
                <div className="text-sm font-semibold text-slate-900">
                  Address
                </div>
                <div className="mt-2 text-sm text-slate-700">
                  {siteData.addressLine}
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-black/10 bg-slate-50 p-5">
              <div className="text-sm font-semibold text-slate-900">
                What to send on WhatsApp (for fastest quote)
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
                <li>Which service you need (CCTV / Computer / Solar etc.)</li>
                <li>Location (nearby area)</li>
                <li>Any photos of the site/requirement (optional)</li>
                <li>Your budget (optional)</li>
              </ul>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-slate-900">
              Working style
            </div>
            <div className="mt-2 text-sm text-slate-600">
              We respond quickly on WhatsApp and guide you to the right product
              and installation plan.
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Installation
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Neat wiring and proper setup.
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Support
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Post-installation help & service.
                </div>
              </div>
              <div className="rounded-2xl border border-black/10 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Genuine products
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  Trusted brands and accessories.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

