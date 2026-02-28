import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_15%,rgba(15,23,42,0.08),transparent_35%),radial-gradient(circle_at_85%_10%,rgba(22,163,74,0.12),transparent_28%),linear-gradient(to_bottom,#f8fafc,#ffffff)]" />

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
              Babatpur, Varanasi (U.P.)
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              Sales & Service
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-6xl">
              CCTV, Computer, Solar and Service - One Trusted Partner
            </h1>

            <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
              {siteData.brand} provides sales, installation and reliable service
              for CCTV cameras, computers, biometric and GPS tracker solutions,
              solar and more.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteData.brand}, I want to enquire about CCTV/Computer/Solar.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                WhatsApp now
              </a>
              <a
                href={buildTelLink()}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Call {siteData.phoneDisplay}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                View services -&gt;
              </Link>
            </div>

            <div className="grid gap-3 pt-1 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">
                  Fast support
                </div>
                <div className="text-sm text-slate-600">
                  Quick response on call or WhatsApp.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">
                  Genuine products
                </div>
                <div className="text-sm text-slate-600">
                  Trusted brands and accessories.
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-slate-900">
                  Installation
                </div>
                <div className="text-sm text-slate-600">
                  Neat setup with after-sales service.
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-xl shadow-slate-200/60">
            <div className="absolute -right-4 -top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
              Since 2019
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Why choose us
                </p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">
                  Reliable team for sales and service
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">500+</div>
                  <div className="text-sm text-slate-600">Happy installs</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">24x7</div>
                  <div className="text-sm text-slate-600">Support assist</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">10+</div>
                  <div className="text-sm text-slate-600">Core services</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Local support</div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-700">
                <span className="font-semibold text-slate-900">{siteData.brand}</span>
                {" - "}
                {siteData.addressLine}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Our services</h2>
            <p className="mt-1 text-sm text-slate-600">
              Everything you need - sales, installation and service.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 sm:inline-flex"
          >
            See all -&gt;
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm"
            >
              <div className="text-base font-semibold text-slate-900">
                {s.title}
              </div>
              <div className="mt-2 text-sm text-slate-600">{s.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-black/10 bg-slate-900 p-6 text-white md:p-8">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <div className="text-xl font-bold">Get an instant estimate</div>
              <div className="mt-1 text-sm text-white/80">
                Share your requirement on WhatsApp and we&apos;ll reply with
                options and pricing.
              </div>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteData.brand}, please share CCTV camera package details.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
              >
                WhatsApp for quote
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Contact details -&gt;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
