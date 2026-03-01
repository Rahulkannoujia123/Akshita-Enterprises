import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export default function Home() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.08),transparent_35%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_10%,rgba(15,23,42,0.05),transparent_28%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.03),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white" />
      </div>

      <section className="mx-auto max-w-6xl px-4 py-14 md:py-24">
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
              solar and more. Expert solutions for a secure and digital lifestyle.
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
                  <div className="text-2xl font-extrabold text-slate-900">{siteData.stats.cctvInstallations}</div>
                  <div className="text-sm text-slate-600">CCTV Installs</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">{siteData.stats.happyClients}</div>
                  <div className="text-sm text-slate-600">Happy Clients</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">{siteData.stats.yearsInService}</div>
                  <div className="text-sm text-slate-600">Years Exp.</div>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="text-2xl font-extrabold text-slate-900">100%</div>
                  <div className="text-sm text-slate-600">Local Support</div>
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
        <div className="mb-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-slate-900">Trusted by Local Businesses</h2>
              <p className="mt-2 text-sm text-slate-600">
                We have successfully secured and empowered numerous establishments in Varanasi and surrounding areas.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
              {siteData.clients.map((client) => (
                <div key={client.name} className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">{client.name}</span>
                  <span className="text-xs text-slate-500">{client.industry}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

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

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-emerald-100 bg-emerald-50/50 p-6 md:p-8">
            <h3 className="text-xl font-bold text-slate-900">What our customers say</h3>
            <p className="mt-2 text-sm text-slate-600">
              We take pride in our work. Share your feedback and help us grow!
            </p>
            <div className="mt-6">
              <a
                href={siteData.reviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Rate us on Google
                <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-slate-900 p-6 text-white md:p-8">
            <div className="space-y-4">
              <div>
                <div className="text-xl font-bold">Get an instant estimate</div>
                <div className="mt-1 text-sm text-white/80 text-pretty">
                  Share your requirement on WhatsApp or Email and we&apos;ll reply with
                  options and pricing.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={buildWhatsAppLink(
                    `Hello ${siteData.brand}, please share CCTV camera package details.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  WhatsApp
                </a>
                <a
                  href={`mailto:${siteData.email}`}
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
