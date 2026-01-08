"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

const policies = [
  {
    title: "Health, Safety & Environment (HSE) Policy",
    description: "ASEDO Energy upholds a zero-harm approach to safety and environmental impact. We implement best-in-class HSE practices across all operations, maintain compliance with national and international regulations, and empower our workforce to take responsibility for safety at all levels."
  },
  {
    title: "Code of Business Conduct & Ethics",
    description: "Our corporate ethics framework promotes integrity, transparency, and accountability. We enforce anti-bribery and anti-corruption measures, encourage whistleblowing, and ensure decisions are made free from conflicts of interest."
  },
  {
    title: "Quality Assurance Policy",
    description: "We deliver high-quality services and products by adhering to international standards and continuously improving our systems and processes. Our operations align with ISO certifications and industry benchmarks to exceed customer expectations."
  },
  {
    title: "Corporate Social Responsibility (CSR) Policy",
    description: "ASEDO is committed to positive community impact through local engagement, educational support, and environmental sustainability initiatives. Our CSR strategy prioritizes inclusive development and socio-economic empowerment."
  },
  {
    title: "Equal Opportunity & Inclusion Policy",
    description: "We value diversity and inclusivity in our workforce. ASEDO provides equal access to employment, training, and advancement, while ensuring a discrimination-free environment across all company levels."
  },
  {
    title: "Data Protection & Privacy Policy",
    description: "All personal and business data handled by ASEDO are protected under strict privacy controls. We comply with the Nigeria Data Protection Regulation (NDPR) and global standards to safeguard digital and physical records."
  },
  {
    title: "Anti-Corruption & Compliance Policy",
    description: "We enforce a zero-tolerance stance on corruption. All staff, contractors, and partners must comply with internal procedures and national laws regarding ethical business conduct."
  },
  {
    title: "Human Rights & Labour Standards Policy",
    description: "ASEDO respects fundamental human rights in all jurisdictions of operation. We uphold international labour standards, including fair wages, humane working conditions, and protection of employee rights."
  },
  {
    title: "Sustainability & Energy Transition Policy",
    description: "Our commitment to sustainability includes reducing carbon emissions, adopting cleaner technologies, and supporting long-term environmental stewardship as we transition toward a greener energy future."
  },
  {
    title: "Local Content Development Policy",
    description: "We prioritize indigenous participation across our supply chain and operations. Through training, contracting, and technology transfer, ASEDO contributes to national capacity development and local economic growth."
  }
];

export default function HSEPolicy() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/hse-policy" />

      <Hero
        title="ASEDO Energy Group Policy Framework"
        subtitle="Our comprehensive policies guide our commitment to excellence, ethics, and sustainability in all operations."
        badge="HSE Policy"
        image="/backgrounds/grey-refinery.webp"
      />

      {/* Policies Section */}
      <div className="bg-gradient-to-br from-white via-gray-50/30 to-white w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {policies.map((policy, index) => (
              <div key={index}>
                <div
                  id={`policy-${index}`}
                  data-animate
                  className={`transition-all duration-700 ${visibleElements.has(`policy-${index}`)
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-montserrat text-lg font-bold">{index + 1}</span>
                        </div>
                        <h3 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-bold leading-tight tracking-tight">
                          {policy.title}
                        </h3>
                      </div>

                      <p className="text-[#4D5767] font-openSans text-lg leading-relaxed">
                        {policy.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modern Divider */}
                {index < policies.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="relative">
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#00A89D] to-transparent"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#E3A700] rounded-full"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}