"use client";

import React, { useState, useEffect } from "react";
import { siteData, buildWhatsAppLink } from "@/components/siteData";

export default function EmiCalculatorPage() {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(120); // Months
  const [processingFee, setProcessingFee] = useState<number>(1.0);

  // Extra features
  const [prepayAmount, setPrepayAmount] = useState<number>(0);
  const [prepayFreq, setPrepayFreq] = useState<number>(0); // 0 = one time, >0 = recurring months
  const [prepayStart, setPrepayStart] = useState<number>(1);
  const [moratorium, setMoratorium] = useState<number>(0);

  // Calculated values state
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPrincipal, setTotalPrincipal] = useState<number>(0);
  const [totalPayable, setTotalPayable] = useState<number>(0);
  const [savedTenure, setSavedTenure] = useState<number>(0);
  const [savedInterest, setSavedInterest] = useState<number>(0);

  const calculateStandardEmi = (p: number, r: number, n: number): number => {
    if (p <= 0 || n <= 0) return 0;
    if (r === 0) return p / n;
    const rMonthly = r / (12 * 100);
    return (p * rMonthly * Math.pow(1 + rMonthly, n)) / (Math.pow(1 + rMonthly, n) - 1);
  };

  useEffect(() => {
    // 1. Processing charges
    const feeAmt = (principal * processingFee) / 100;
    const gstAmt = feeAmt * 0.18;
    const totalCharges = feeAmt + gstAmt;

    // 2. Compute baseline total interest (no prepayments or moratorium)
    const baseEmi = calculateStandardEmi(principal, rate, tenure);
    let baselineInterest = 0;
    let baselineBal = principal;
    const rMonthly = rate / (12 * 100);

    for (let m = 1; m <= tenure; m++) {
      const interest = baselineBal * rMonthly;
      let pPaid = baseEmi - interest;
      if (baselineBal < pPaid) pPaid = baselineBal;
      baselineBal -= pPaid;
      baselineInterest += interest;
      if (baselineBal <= 0) break;
    }

    // 3. Advanced repayment loop with moratorium & prepayments
    let bal = principal;
    let currentMonth = 1;
    let totalIntPaid = 0;
    let actualEmi = baseEmi;

    // Moratorium
    for (let m = 1; m <= moratorium; m++) {
      const interest = bal * rMonthly;
      bal += interest; // accrue interest
      totalIntPaid += interest;
      currentMonth++;
    }

    if (moratorium > 0) {
      actualEmi = calculateStandardEmi(bal, rate, tenure);
    }

    let extraPaid = 0;
    let principalPaidTotal = 0;
    const maxMonths = 600;

    while (bal > 0.01 && currentMonth <= maxMonths) {
      const interest = bal * rMonthly;
      let emiPaid = actualEmi;
      if (emiPaid > bal + interest) {
        emiPaid = bal + interest;
      }

      let pPaid = emiPaid - interest;
      if (pPaid < 0) pPaid = 0;
      if (pPaid > bal) {
        pPaid = bal;
        emiPaid = pPaid + interest;
      }

      bal -= pPaid;
      totalIntPaid += interest;
      principalPaidTotal += pPaid;

      // Check prepayments
      let isPrepay = false;
      if (prepayAmount > 0) {
        if (prepayFreq === 0) {
          if (currentMonth === prepayStart) isPrepay = true;
        } else {
          const sinceStart = currentMonth - prepayStart;
          if (sinceStart >= 0 && sinceStart % prepayFreq === 0) {
            isPrepay = true;
          }
        }
      }

      if (isPrepay && bal > 0) {
        let extra = prepayAmount;
        if (extra > bal) extra = bal;
        bal -= extra;
        extraPaid += extra;
      }

      currentMonth++;
    }

    const effectiveMonths = currentMonth - 1;
    const originalExpectedMonths = tenure + moratorium;
    const monthsSaved = Math.max(0, originalExpectedMonths - effectiveMonths);
    const interestSaved = Math.max(0, baselineInterest - totalIntPaid);

    setEmi(baseEmi);
    setTotalInterest(totalIntPaid);
    setTotalPrincipal(principalPaidTotal);
    setTotalPayable(principalPaidTotal + totalIntPaid + extraPaid + totalCharges);
    setSavedTenure(monthsSaved);
    setSavedInterest(interestSaved);
  }, [principal, rate, tenure, processingFee, prepayAmount, prepayFreq, prepayStart, moratorium]);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Banner with download button */}
        <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-slate-900 to-emerald-950/40 p-8 shadow-xl">
          <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Varanasi&apos;s Premium Tech Brand
              </span>
              <h1 className="text-3xl font-extrabold tracking-tight">EMI Pro Mobile App</h1>
              <p className="text-sm text-slate-400 max-w-xl">
                Get our fully packed, premium high-tech EMI Calculator Android Mobile App.
                Perform advanced calculations, compare loans side-by-side, analyze interactive charts
                and generate professionally formatted PDF reports directly on your smartphone.
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="/emi-calculator.apk"
                download
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-400 hover:scale-105 shadow-lg shadow-emerald-500/20"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
                Download Mobile App (APK)
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Inputs Section */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-slate-200">Set Loan Specifications</h2>

            {/* Principal input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Loan Principal (₹)</span>
                <span className="font-bold text-emerald-400">₹{principal.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="10000000"
                step="50000"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-right font-mono"
              />
            </div>

            {/* Interest rate */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Interest Rate (% p.a.)</span>
                <span className="font-bold text-emerald-400">{rate}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="25"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-right font-mono"
              />
            </div>

            {/* Tenure Months */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tenure (Months)</span>
                <span className="font-bold text-emerald-400">{tenure} Months ({Math.round(tenure / 12)} Yrs)</span>
              </div>
              <input
                type="range"
                min="12"
                max="360"
                step="12"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <input
                type="number"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-right font-mono"
              />
            </div>

            {/* Processing fee input */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Processing Fee (%)</span>
                <span className="font-bold text-emerald-400">{processingFee}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.1"
                value={processingFee}
                onChange={(e) => setProcessingFee(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <hr className="border-slate-800" />
            <h3 className="text-sm font-bold text-slate-300">Advanced Prepayment Options</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Prepayment Amount (₹)</label>
                <input
                  type="number"
                  value={prepayAmount}
                  onChange={(e) => setPrepayAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-right font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Frequency (Months, 0=Once)</label>
                <input
                  type="number"
                  value={prepayFreq}
                  onChange={(e) => setPrepayFreq(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-right font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Start Month</label>
                <input
                  type="number"
                  value={prepayStart}
                  onChange={(e) => setPrepayStart(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-right font-mono"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-slate-400">Moratorium Months</label>
                <input
                  type="number"
                  value={moratorium}
                  onChange={(e) => setMoratorium(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-right font-mono"
                />
              </div>
            </div>

          </div>

          {/* Outputs Dashboard */}
          <div className="lg:col-span-5 flex flex-col gap-6">

            {/* Dashboard Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 flex-1 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs tracking-wider text-slate-400 font-bold uppercase">Estimated Monthly EMI</span>
                <div className="text-4xl font-black text-emerald-400">₹{Math.round(emi).toLocaleString("en-IN")}</div>
              </div>

              <hr className="border-slate-800" />

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block">Total Principal Paid</span>
                  <span className="font-bold text-sm text-slate-200">₹{Math.round(totalPrincipal).toLocaleString("en-IN")}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 block">Total Interest Paid</span>
                  <span className="font-bold text-sm text-slate-200">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-slate-400 block">Total Amount Payable (including prepayments)</span>
                <span className="font-bold text-lg text-emerald-400">₹{Math.round(totalPayable).toLocaleString("en-IN")}</span>
              </div>

              {(savedTenure > 0 || savedInterest > 0) && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                  <div className="text-xs font-bold text-emerald-400">PREPAYMENT & STRATEGY SAVINGS</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {savedTenure > 0 && (
                      <div>
                        <span className="text-slate-400 block">Tenure Saved:</span>
                        <span className="font-extrabold text-white">{savedTenure} Months</span>
                      </div>
                    )}
                    {savedInterest > 0 && (
                      <div>
                        <span className="text-slate-400 block">Interest Saved:</span>
                        <span className="font-extrabold text-white">₹{Math.round(savedInterest).toLocaleString("en-IN")}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <a
                  href={buildWhatsAppLink(`Hello ${siteData.brand}, I computed an EMI plan of ₹${Math.round(emi)}/month and want to enquire about loan options.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500"
                >
                  WhatsApp Loan Enquiries
                </a>
              </div>
            </div>

            {/* Support / Location info */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-xs text-slate-400 space-y-2">
              <span className="font-bold text-slate-200 block">Support & Services:</span>
              <p>
                Get accurate technical support, high-end electronics, CCTV, and smart solar tracking installations in Babatpur, Varanasi from our sales team.
              </p>
              <span className="font-semibold text-emerald-400 block">Office: {siteData.addressLine}</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
