export const siteData = {
  brand: "Akshita Enterprises",
  email: "technologyakshita@gmail.com",
  phoneDisplay: "+91 8787260552",
  phoneE164: "918787260552",
  whatsappNumber: "918787260552",
  addressLine: "Babatpur, Varanasi (U.P.) - 221006",
  fullAddress: "0, Mangari, Post Jagdeeshpur, Jagdishpur, Varanasi, PIN - 221202, Uttar Pradesh, India",
  gstNumber: "09AMUPV9358A2Z7",
  reviewLink: "https://g.page/r/CU2YI2WbiDWREBE/review",
  founder: {
    name: "Pradeep Vishwakarma",
    role: "Founder & Technical Head",
    bio: "With over 8 years of experience in security systems and IT solutions, Pradeep Vishwakarma founded Akshita Enterprises with a vision to provide reliable and advanced technology solutions to the Varanasi region."
  },
  stats: {
    cctvInstallations: "500+",
    happyClients: "200+",
    yearsInService: "5+",
  },
  clients: [
    { name: "Local Schools & Colleges", industry: "Education" },
    { name: "Retail Showrooms", industry: "Retail" },
    { name: "Private Residences", industry: "Residential" },
    { name: "Small Businesses & Offices", industry: "Corporate" },
  ],
  services: [
    {
      title: "CCTV Camera",
      desc: "Advanced surveillance solutions with remote monitoring, night vision, and high-definition recording for ultimate security.",
      image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Computer & IT Support",
      desc: "Complete IT infrastructure setup, desktop/laptop sales, hardware upgrades, and expert software troubleshooting.",
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Biometric & GPS Tracking",
      desc: "Secure biometric attendance systems and real-time GPS vehicle tracking solutions for businesses and fleet management.",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Solar Energy Solutions",
      desc: "Eco-friendly solar panel installation and maintenance for sustainable power backup and reduced electricity costs.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Printing Press Solutions",
      desc: "Professional printing machine setup, technical support, and supply of high-quality printing materials.",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e0de?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Premium Sales & Service",
      desc: "Authorized sales of genuine electronics and rapid, reliable after-sales support for all your technology needs.",
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
