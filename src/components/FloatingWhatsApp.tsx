import { buildWhatsAppLink, siteData } from "@/components/siteData";

export function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(`Hello ${siteData.brand}, I want to enquire.`)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 hover:bg-green-700"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}

