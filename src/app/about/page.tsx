import type { Metadata } from "next";
import { siteData } from "@/components/siteData";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteData.brand}, providing CCTV, computer, and solar solutions in Babatpur, Varanasi since 2019.`,
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section with Unique Color Palette */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-violet-900 to-slate-900 py-24 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="mx-auto max-w-6xl px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl mb-6">
              Empowering Varanasi with <span className="text-emerald-400">Technology</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed mb-8">
              Reliable sales and service for CCTV, computers, solar energy, and biometric solutions since 2019.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section with Glassmorphism */}
      <section className="mx-auto max-w-6xl px-4 -mt-16 relative z-20 pb-20">
        <div className="rounded-3xl backdrop-blur-xl bg-white/70 border border-white/50 p-8 md:p-12 shadow-2xl">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Journey</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  Established in 2019, <span className="font-semibold text-slate-900">{siteData.brand}</span> has grown from a local service provider in Babatpur to a trusted technology partner for hundreds of homes and businesses across Varanasi.
                </p>
                <p>
                  We started with a simple mission: to provide high-quality security and computing solutions with reliable local support. Today, we are proud to offer a comprehensive suite of services, from advanced CCTV surveillance to sustainable solar energy systems.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-emerald-50 p-6 border border-emerald-100 transition-transform hover:scale-105">
                <div className="text-4xl font-black text-emerald-600 mb-2">5+</div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Years of Excellence</div>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-6 border border-indigo-100 transition-transform hover:scale-105">
                <div className="text-4xl font-black text-indigo-600 mb-2">500+</div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Happy Clients</div>
              </div>
              <div className="rounded-2xl bg-violet-50 p-6 border border-violet-100 transition-transform hover:scale-105">
                <div className="text-4xl font-black text-violet-600 mb-2">10+</div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Core Services</div>
              </div>
              <div className="rounded-2xl bg-slate-100 p-6 border border-slate-200 transition-transform hover:scale-105">
                <div className="text-4xl font-black text-slate-900 mb-2">100%</div>
                <div className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Local Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-base font-bold text-emerald-600 uppercase tracking-widest mb-3">Why Choose Us</h2>
            <p className="text-4xl font-extrabold text-slate-900">Our Core Commitment</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Quality Products",
                desc: "We only provide genuine products from trusted global brands to ensure longevity and performance.",
                icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-8.062 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946 8.062 3.42 3.42 0 010 4.438 3.42 3.42 0 00-1.946 8.062 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-8.062 3.42 3.42 0 010-4.438z",
                color: "emerald"
              },
              {
                title: "Expert Installation",
                desc: "Our team ensures neat wiring and optimal setup for every installation, whether it's CCTV or Solar.",
                icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
                color: "indigo"
              },
              {
                title: "Reliable Support",
                desc: "Quick response and after-sales service are at the heart of our business. We are always just a call away.",
                icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z",
                color: "violet"
              }
            ].map((v) => {
              const colorClasses = {
                emerald: "bg-emerald-50 text-emerald-600",
                indigo: "bg-indigo-50 text-indigo-600",
                violet: "bg-violet-50 text-violet-600",
              }[v.color as "emerald" | "indigo" | "violet"];

              return (
              <div key={v.title} className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-xl transition-all hover:-translate-y-2">
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${colorClasses}`}>
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={v.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="rounded-3xl bg-slate-900 p-8 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to secure your world?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto mb-10">
              Get in touch with our expert team for a free consultation and customized quote for your requirement.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
              >
                Contact us
              </Link>
              <Link
                href="/services"
                className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View all services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
