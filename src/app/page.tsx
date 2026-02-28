import Image from "next/image";
import Link from "next/link";
import { buildTelLink, buildWhatsAppLink, siteData } from "@/components/siteData";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
              Babatpur, Varanasi (U.P.)
              <span className="h-1 w-1 rounded-full bg-slate-300" />
              Sales & Service
            </div>

            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
              CCTV, Computer, Solar & Service — one trusted place.
            </h1>
            <p className="text-pretty text-base leading-relaxed text-slate-600 md:text-lg">
              {siteData.brand} provides sales, installation and reliable service
              for CCTV cameras, computers, biometric & GPS tracker solutions,
              solar and more.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppLink(
                  `Hello ${siteData.brand}, I want to enquire about CCTV/Computer/Solar.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
              >
                WhatsApp now
              </a>
              <a
                href={buildTelLink()}
                className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
              >
                Call {siteData.phoneDisplay}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                View services →
              </Link>
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Fast support
                </div>
                <div className="text-sm text-slate-600">
                  Quick response on call/WhatsApp.
                </div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Genuine products
                </div>
                <div className="text-sm text-slate-600">
                  Trusted brands and accessories.
                </div>
              </div>
              <div className="rounded-xl border border-black/10 bg-white p-4">
                <div className="text-sm font-semibold text-slate-900">
                  Installation
                </div>
                <div className="text-sm text-slate-600">
                  Neat setup with after-sales service.
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-tr from-red-100 via-white to-blue-100 blur-2xl" />
            <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl">
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src="/brand/banner.png"
                  alt="Akshita Enterprises banner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="p-5">
                <div className="text-sm font-semibold text-slate-900">
                  {siteData.brand}
                </div>
                <div className="text-sm text-slate-600">{siteData.addressLine}</div>
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
              Everything you need — sales, installation and service.
            </p>
          </div>
          <Link
            href="/services"
            className="hidden rounded-lg border border-black/10 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50 sm:inline-flex"
          >
            See all →
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
                Share your requirement on WhatsApp and we’ll reply with options
                and pricing.
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
                Contact details →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
