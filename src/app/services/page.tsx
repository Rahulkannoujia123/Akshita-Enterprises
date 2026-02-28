import type { Metadata } from "next";
import Link from "next/link";
import { buildWhatsAppLink, siteData } from "@/components/siteData";

export const metadata: Metadata = {
  title: "Services",
  description:
    "CCTV camera, computer, biometric & GPS tracker, solar, printing press, sales & service in Babatpur, Varanasi.",
};

export default function ServicesPage() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              Services
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">
              We handle sales, installation and after-sales service. Share your
              requirement and we’ll suggest the best options in your budget.
            </p>
          </div>
          <Link
            href="/contact"
            className="rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
          >
            Contact →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-black/10 bg-slate-50 p-5"
            >
              <div className="text-base font-semibold text-slate-900">
                {s.title}
              </div>
              <div className="mt-2 text-sm text-slate-600">{s.desc}</div>
              <a
                className="mt-4 inline-flex rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                href={buildWhatsAppLink(
                  `Hello ${siteData.brand}, I need ${s.title}. Please share details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                Enquire on WhatsApp
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
          <div className="text-lg font-bold text-slate-900">
            Popular requirements we handle
          </div>
          <ul className="mt-3 grid list-disc gap-2 pl-5 text-sm text-slate-700 sm:grid-cols-2">
            <li>CCTV for home/shop/office (indoor/outdoor)</li>
            <li>DVR/NVR setup, mobile view configuration</li>
            <li>PC/laptop sales, SSD/RAM upgrade, OS installation</li>
            <li>Biometric attendance setup and support</li>
            <li>GPS tracking solutions</li>
            <li>Solar consultation & installation support</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

