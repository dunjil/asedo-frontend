"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import Hero from "../components/Hero";
import { servicesAPI, getImageUrl } from "../lib/api";
import { Service } from "../lib/servicesData";

export default function ServicesClient() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getAll(true);
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const processSteps = [
    {
      number: "1",
      title: "Field Identification & Acquisition",
      description: "We target high-value oil and gas blocks across Nigeria and West Africa, securing strategic acreage in both frontier and mature basins for upstream development.",
      image: "/services/process/process_1.webp",
    },
    {
      number: "2",
      title: "Engineering & Project Development",
      description: "From modular refinery layouts to full upstream facilities, we handle front-end engineering design (FEED), project scoping, and execution planning.",
      image: "/services/process/process_2.webp",
    },
    {
      number: "3",
      title: "Equipment Procurement & Sourcing",
      description: "We source modular units, drilling consumables, refinery skids, and heavy-duty oilfield equipment through global and local partnerships—servicing both ASEDO projects and third-party clients.",
      image: "/services/process/process_3.webp",
    },
    {
      number: "4",
      title: "Production & Operational Management",
      description: "We execute upstream production, gas processing, and modular refining with scalable operations tailored for domestic and export markets.",
      image: "/services/process/process_4.webp",
    },
    {
      number: "5",
      title: "Infrastructure Construction & Logistics",
      description: "Originating from rugged construction works in Rivers State, ASEDO now builds terminals, depots, support bases, roads, and bulk fuel infrastructure under some of the most challenging terrain conditions.",
      image: "/services/process/process_5.webp",
    },
    {
      number: "6",
      title: "Marine & Drilling Services",
      description: "Our offshore ecosystem includes FPSO leasing, mini crude tankers, marine logistics, and private drilling assets—positioning ASEDO as Africa's first fully indigenous offshore services firm.",
      image: "/services/process/process_6.webp",
    },
    {
      number: "7",
      title: "Energy Trading & Distribution",
      description: "We maintain robust fuel movement—from coastal terminals to inland markets—ensuring national coverage, compliance, and efficiency in diesel, petrol, and LPG delivery.",
      image: "/services/process/process_7.webp",
    },
    {
      number: "8",
      title: "Smart Real Estate & Power Infrastructure",
      description: "Launching in 2026, ASEDO's smart infrastructure division will deliver energy-optimized estates, palatial residential builds, and commercial zones—beginning with a landmark project in partnership with SAOTA, South Africa's iconic architecture firm.",
      image: "/services/process/process_8.webp",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/services" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading services...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/services" />

      <Hero
        title="Integrated Energy Solutions"
        subtitle="From upstream exploration to nationwide distribution, we deliver comprehensive energy solutions with precision, reliability, and operational excellence."
        badge="Services"
        image="/backgrounds/grey-refinery.webp"
      />

      {/* Our Services Section */}
      <div className="w-full py-16 px-4 md:px-10 lg:px-20 bg-white">
        <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium mb-12 tracking-tight">
          Our Services
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 justify-center max-w-screen-xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.id}
              onClick={() => router.push(`/services/${service.slug}`)}
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100/50 hover:border-[#00A89D]/30 backdrop-blur-sm transform hover:-translate-y-2"
            >
              {/* Modern Image Container with Enhanced Overlay */}
              <div className="relative w-full h-60 md:h-64 overflow-hidden">
                <img
                  src={getImageUrl(service.image)}
                  alt={service.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  style={{
                    filter: 'none !important',
                    mixBlendMode: 'normal',
                    imageRendering: 'auto'
                  }}
                />

                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Enhanced Status Badge with Glass Effect */}
                <div className="absolute top-6 right-6">
                  <div className="relative">
                    <span className="inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white font-openSans text-sm md:text-base font-semibold shadow-2xl">
                      <div className="relative">
                        <span className="w-3 h-3 bg-[#00A89D] rounded-full animate-pulse shadow-lg"></span>
                        <span className="absolute inset-0 w-3 h-3 bg-[#00A89D] rounded-full animate-ping opacity-75"></span>
                      </div>
                      Service
                    </span>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>

                {/* Floating Action Button */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 flex items-center justify-center shadow-2xl hover:bg-white/30 transition-colors">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Modern Content Container */}
              <div className="relative p-8 md:p-10 flex flex-col gap-6 flex-grow bg-gradient-to-br from-white via-gray-50/30 to-white">
                {/* Category Tag */}
                <div className="flex items-center justify-start">
                  <span className="inline-flex items-center px-4 py-2 bg-[#00A89D]/10 text-[#00A89D] font-openSans text-xs md:text-sm font-semibold rounded-full border border-[#00A89D]/20">
                    Service
                  </span>
                </div>

                {/* Title with Modern Typography */}
                <div className="space-y-2">
                  <h3 className="text-[#0A1E3F] font-montserrat text-xl md:text-2xl font-bold leading-tight group-hover:text-[#00A89D] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <div className="w-12 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
                </div>

                {/* Enhanced Description */}
                <div className="space-y-3">
                  <p className="text-[#4D5767] font-openSans text-base md:text-lg font-normal leading-relaxed line-clamp-4 group-hover:text-gray-800 transition-colors">
                    {service.excerpt}
                  </p>
                </div>

                {/* Modern CTA Section */}
                <div className="mt-auto pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-[#00A89D] font-openSans text-base md:text-lg font-semibold group-hover:text-[#0A1E3F] transition-colors duration-300">
                      Learn More
                    </span>
                    <svg
                      className="w-6 h-6 text-[#00A89D] transform group-hover:translate-x-3 group-hover:scale-110 transition-all duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Progress indicator or additional metadata could go here */}
                  <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-[#E3A700]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Enhanced Decorative Elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[#E3A700]/10 to-transparent rounded-tl-full transform translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Process Section */}
      <div className="flex flex-col w-full">
        {/* Header Strip */}
        <div className="bg-[#00A89D] py-12 md:py-16 px-4 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <p className="text-white font-openSans text-xs md:text-sm uppercase tracking-wide font-semibold">OUR WORK PROCESS</p>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <h2 className="text-white font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
              How We Deliver Excellence
            </h2>
          </div>
        </div>

        {/* Process Flow Timeline */}
        <div className="bg-white py-16 md:py-20 lg:py-24 px-4 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Desktop Process Flow */}
            <div className="hidden lg:block">
              <div className="relative max-w-6xl mx-auto">
                <div className="grid grid-cols-2 gap-12">
                  {processSteps.map((step, index) => (
                    <div key={index} className="relative group">
                      {/* Left side: Circle and Arrow, Right side: Content */}
                      <div className="flex items-start gap-8">
                        {/* Circle and Arrow Section */}
                        <div className="flex flex-col items-center flex-shrink-0 pt-2">
                          {/* Step Circle */}
                          <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500 mb-6">
                            <span className="text-white font-montserrat text-2xl font-bold">{step.number}</span>
                            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Downward Arrow (not for last row) */}
                          {index < 6 && (
                            <div className="flex flex-col items-center">
                              <div className="w-1 h-20 bg-gradient-to-b from-[#00A89D] to-[#E3A700] opacity-50 rounded-full"></div>
                              <svg className="w-6 h-6 text-[#00A89D] transform group-hover:scale-125 transition-transform duration-300 -mt-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>

                        {/* Content Card */}
                        <div className="flex-1 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform group-hover:-translate-y-2 border border-gray-100/50 group-hover:border-[#00A89D]/30 mt-2">
                          {/* Image */}
                          <div className="relative w-full h-40 overflow-hidden rounded-2xl mb-6">
                            <img
                              src={step.image}
                              alt={step.title}
                              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00A89D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Title */}
                          <h3 className="text-[#0A1E3F] font-montserrat text-lg font-bold leading-tight mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                            {step.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[#4D5767] font-openSans text-sm leading-relaxed line-clamp-3">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile/Tablet Vertical Flow */}
            <div className="lg:hidden">
              <div className="space-y-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="relative flex items-start gap-6 group">
                    {/* Step Circle */}
                    <div className="flex-shrink-0 relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                        <span className="text-white font-montserrat text-lg font-bold">{step.number}</span>
                      </div>

                      {/* Vertical Line (not for last item) */}
                      {index < processSteps.length - 1 && (
                        <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-[#00A89D] to-[#E3A700] opacity-50"></div>
                      )}
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 transform group-hover:-translate-y-1 border border-gray-100/50 group-hover:border-[#00A89D]/30">
                      {/* Image */}
                      <div className="relative w-full h-40 overflow-hidden rounded-xl mb-4">
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00A89D]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[#0A1E3F] font-montserrat text-lg font-bold leading-tight mb-3 group-hover:text-[#00A89D] transition-colors duration-300">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-[#4D5767] font-openSans text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
