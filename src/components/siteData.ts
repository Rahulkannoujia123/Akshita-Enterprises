export const siteData = {
  brand: "Akshita Enterprises",
  phoneDisplay: "+91 8787260552",
  phoneE164: "918787260552",
  whatsappNumber: "918787260552",
  addressLine: "Babatpur, Varanasi (U.P.) - 221006",
  services: [
    {
      title: "CCTV Camera",
      desc: "Sales, installation, setup and service for homes, shops and offices.",
    },
    {
      title: "Computer",
      desc: "Desktop/laptop sales, setup, upgrade and repairs.",
    },
    {
      title: "Biometric & GPS Tracker",
      desc: "Attendance & tracking solutions with installation and support.",
    },
    {
      title: "Solar",
      desc: "Solar solutions for reliable power and savings.",
    },
    {
      title: "Printing Press",
      desc: "Printing-related setup and service support.",
    },
    {
      title: "Sales & Service",
      desc: "Genuine products, fast support and trusted after-sales service.",
    },
  ],
} as const;

export function buildWhatsAppLink(message: string) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${siteData.whatsappNumber}?text=${text}`;
}

export function buildTelLink() {
  return `tel:+${siteData.phoneE164}`;
}
