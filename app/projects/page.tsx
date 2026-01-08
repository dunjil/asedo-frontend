import { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Transformative Projects - ASEDO Energy Group",
  description: "Discover ASEDO Energy Group's transformative projects across Africa, from refinery operations to infrastructure development. Building sustainable energy solutions with operational excellence.",
  keywords: [
    "energy projects",
    "refinery projects",
    "infrastructure projects",
    "ASEDO projects",
    "energy infrastructure",
    "African projects",
    "sustainable energy",
    "refining operations",
    "energy development"
  ],
  openGraph: {
    title: "Transformative Projects - ASEDO Energy Group",
    description: "Explore ASEDO's transformative energy projects powering Africa's industrial growth and sustainable development.",
    images: [
      {
        url: "/projects/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ASEDO Energy Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transformative Projects - ASEDO Energy Group",
    description: "Transformative energy projects driving Africa's sustainable development.",
    images: ["/projects/og-image.jpg"],
  },
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
