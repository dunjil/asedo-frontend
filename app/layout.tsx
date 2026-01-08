import { Open_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "ASEDO Energy Group - Africa's Integrated Energy Leader",
  description: "ASEDO Energy Group delivers comprehensive energy solutions across Africa, from upstream exploration and refining to nationwide distribution. Powering sustainable energy infrastructure and driving industrial growth.",
  keywords: [
    "ASEDO Energy Group",
    "energy solutions",
    "oil and gas",
    "refinery",
    "upstream exploration",
    "energy infrastructure",
    "Africa energy",
    "Nigeria energy",
    "integrated energy",
    "sustainable energy",
    "refining and processing",
    "gas infrastructure",
    "energy distribution",
    "industrial energy"
  ],
  authors: [{ name: "ASEDO Energy Group" }],
  creator: "ASEDO Energy Group",
  publisher: "ASEDO Energy Group",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://asedoenergy.com"), // Update with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ASEDO Energy Group - Africa's Integrated Energy Leader",
    description: "Integrated energy solutions across Africa - from exploration to distribution. Building sustainable energy infrastructure for industrial growth.",
    url: "https://asedoenergy.com",
    siteName: "ASEDO Energy Group",
    images: [
      {
        url: "/og-image.jpg", // Add actual OG image
        width: 1200,
        height: 630,
        alt: "ASEDO Energy Group - Integrated Energy Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ASEDO Energy Group - Africa's Integrated Energy Leader",
    description: "Integrated energy solutions across Africa - from exploration to distribution.",
    images: ["/og-image.jpg"], // Add actual Twitter image
    creator: "@ASEDOEnergy", // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add actual verification codes
    yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.variable} ${montserrat.variable}`} style={{ scrollbarGutter: 'stable' }}>
      <body style={{ scrollbarGutter: 'stable' }}>{children}</body>
    </html>
  );
}
