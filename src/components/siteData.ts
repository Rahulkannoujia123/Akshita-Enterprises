export const siteData = {
  brand: "Akshita Enterprises",
  email: "technologyakshita@gmail.com",
  phoneDisplay: "+91 8787260552",
  phoneE164: "918787260552",
  whatsappNumber: "918787260552",
  addressLine: "Babatpur, Varanasi (U.P.) - 221006",
  reviewLink: "https://g.page/r/CU2YI2WbiDWREBE/review",
  services: [
    {
      title: "CCTV Camera",
      desc: "Sales, installation, setup and service for homes, shops and offices.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Computer",
      desc: "Desktop/laptop sales, setup, upgrade and repairs.",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Biometric & GPS Tracker",
      desc: "Attendance & tracking solutions with installation and support.",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Solar",
      desc: "Solar solutions for reliable power and savings.",
      image: "https://images.unsplash.com/photo-1509391366360-fe5bb6583e22?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Printing Press",
      desc: "Printing-related setup and service support.",
      image: "https://images.unsplash.com/photo-1562654501-a0ccc0af3fb1?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Sales & Service",
      desc: "Genuine products, fast support and trusted after-sales service.",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&q=80&w=800",
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
