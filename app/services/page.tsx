import { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Integrated Energy Solutions - ASEDO Energy Group",
  description: "Explore ASEDO Energy Group's comprehensive energy solutions including upstream development, offshore drilling, refining & processing, gas & power infrastructure, and nationwide distribution across Africa.",
  keywords: [
    "energy solutions",
    "upstream development",
    "offshore drilling",
    "refining processing",
    "gas infrastructure",
    "energy distribution",
    "oil and gas services",
    "ASEDO services",
    "energy infrastructure",
    "African energy"
  ],
  openGraph: {
    title: "Integrated Energy Solutions - ASEDO Energy Group",
    description: "From upstream exploration to nationwide distribution, discover ASEDO's comprehensive energy solutions powering Africa's growth.",
    images: [
      {
        url: "/services/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ASEDO Energy Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrated Energy Solutions - ASEDO Energy Group",
    description: "Comprehensive energy solutions from exploration to distribution.",
    images: ["/services/og-image.jpg"],
  },
};

export default function OurServices() {
  return <ServicesClient />;
}
