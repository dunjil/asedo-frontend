"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import Hero from "../components/Hero";

export default function AboutUs() {
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
  const stats = [
    { value: "10+", label: "Years Of Experience" },
    { value: "4", label: "Countries" },
    { value: "15+", label: "Services Offered" },
    { value: "500+", label: "Served clients" },
  ];

  const journeySteps = [
    { year: "2012", title: "Journey Was Started", description: "ASEDO’s story began in Rivers State, Nigeria, as a construction and logistics company, delivering infrastructure works for the Rivers State Government. Our core services included sand supply, construction equipment leasing, and civil works execution.", image: "/journey/timeline-2012.png", align: "left" },
    { year: "2014", title: "Expansion into Lagos", description: "We expanded into Lagos, establishing dredging operations at Addo Road, Ajah, while scaling our logistics and equipment supply services to meet growing demand across Southwest Nigeria.", image: "/journey/timeline-2014.jpg", align: "right" },
    { year: "2015", title: "Entry into Oil & Gas", description: "ASEDO entered the oil and gas sector, supporting industry leaders including Total E&P (now TotalEnergies), ExxonMobil, Saipem, and others. Our services grew to include oilfield logistics, equipment supply, and support operations across Nigeria’s upstream sector.", image: "/journey/timeline-2015.jpg", align: "left" },
    { year: "2018", title: "From Builders to Energy Leaders", description: "A strategic shift saw ASEDO consolidate its energy operations, transitioning from a construction-focused firm to a diversified energy logistics and services company.", image: "/journey/timeline-2018.jpg", align: "right" },
    { year: "2020", title: "Infrastructure Investment", description: "With investments in coastal logistics, crude transport, and modular refining infrastructure, ASEDO deepened its presence across the oil and gas value chain, preparing for large-scale operations in refining and terminal management.", image: "/journey/timeline-2020.jpeg", align: "left" },
    { year: "2024", title: "The Birth of Asedo Energy Group", description: "ASEDO officially rebranded as ASEDO Energy Group, unifying its upstream, midstream, and downstream operations. This milestone marked our evolution into a fully integrated energy company, powering industries and communities across Africa.", image: "/journey/timeline-2024.jpg", align: "right" },
    { year: "2025", title: "Global Expansion. Ongoing…", description: "ASEDO Energy is expanding beyond Nigeria into key global markets. Our footprint now includes the UAE, Turkey, USA, UK, Canada, and broader Europe, where we continue to pursue new projects and strategic partnerships. Today, we operate across construction, logistics, oil & gas, technology, and media sectors—driving Africa’s industrial growth and powering its future.", image: "/journey/timeline-2025.jpg", align: "left" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/about-us" />

      <Hero
        title="Africa's Integrated Energy Leader"
        subtitle="Driving Africa's energy independence through integrated solutions, innovative technologies, and sustainable partnerships that power progress across the continent."
        badge="About Us"
        image="/backgrounds/grey-refinery.webp"
      />

      {/* Mission Section */}
      <div className="bg-gradient-to-br from-white via-gray-50/30 to-white w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left: Image */}
            <div
              id="mission-image"
              data-animate
              className={`relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-700 ${visibleElements.has("mission-image")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
                }`}
            >
              <div className="relative h-80 md:h-96 lg:h-[500px]">
                <img
                  src="/about-us/refinery.jpg"
                  className="w-full h-full object-cover"
                  alt="Solar Panel Team"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00A89D]/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50">
                    <p className="text-[#0A1E3F] font-montserrat text-sm font-bold">Energy Excellence</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E3A700] rounded-2xl rotate-12 animate-pulse opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full animate-bounce"></div>
            </div>

            {/* Right: Content */}
            <div
              id="mission-content"
              data-animate
              className={`flex flex-col gap-8 transition-all duration-700 ${visibleElements.has("mission-content")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="flex items-center gap-4">
                <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
                <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                  OUR MISSION
                </p>
                <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
              </div>
              <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Powering Africa's Energy Independence
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>
              <p className="text-[#4D5767] font-openSans text-lg md:text-xl leading-relaxed">
                ASEDO Energy Group is a fully integrated energy company committed
                to delivering reliable, sustainable, and innovative energy
                solutions across Africa and beyond. From upstream exploration to
                nationwide distribution, we control every stage of the value
                chain—ensuring efficiency, quality, and long-term value creation.
              </p>
            </div>
          </div>

          {/* Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div
              id="value-card-0"
              data-animate
              className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-3 ${visibleElements.has("value-card-0")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                }`}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15.3333L16 18.6667L29.3333 5.33333M21.3333 4H10.4C8.15979 4 7.03969 4 6.18404 4.43597C5.43139 4.81947 4.81947 5.43139 4.43597 6.18404C4 7.03969 4 8.15979 4 10.4V21.6C4 23.8402 4 24.9603 4.43597 25.816C4.81947 26.5686 5.43139 27.1805 6.18404 27.564C7.03969 28 8.15979 28 10.4 28H21.6C23.8402 28 24.9603 28 25.816 27.564C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold group-hover:text-[#00A89D] transition-colors duration-300">
                    Safety and Quality First
                  </h3>
                  <p className="text-[#4D5767] font-openSans text-base leading-relaxed">
                    Every project meets the highest international standards.
                  </p>
                </div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            <div
              id="value-card-1"
              data-animate
              className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-3 ${visibleElements.has("value-card-1")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: "150ms" }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.6667 4.00008H10.4C8.15979 4.00008 7.03969 4.00008 6.18404 4.43606C5.43139 4.81955 4.81947 5.43147 4.43597 6.18412C4 7.03977 4 8.15987 4 10.4001V21.6001C4 23.8403 4 24.9604 4.43597 25.816C4.81947 26.5687 5.43139 27.1806 6.18404 27.5641C7.03969 28.0001 8.15979 28.0001 10.4 28.0001H21.6C23.8402 28.0001 24.9603 28.0001 25.816 27.5641C26.5686 27.1805 27.1805 26.5686 27.564 25.816C28 24.9603 28 23.8402 28 21.6V17.3334M16 10.6667H21.3333V16.0001M20.6667 4.66675V2.66675M25.9191 6.08096L27.3333 4.66675M27.347 11.3334H29.347M4 17.7962C4.86925 17.9304 5.75983 18.0001 6.66667 18.0001C12.5151 18.0001 17.6871 15.1035 20.8262 10.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold group-hover:text-[#00A89D] transition-colors duration-300">
                    Sustainable Growth
                  </h3>
                  <p className="text-[#4D5767] font-openSans text-base leading-relaxed">
                    Expanding responsibly for future generations.
                  </p>
                </div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            <div
              id="value-card-2"
              data-animate
              className={`group relative bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-700 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-3 ${visibleElements.has("value-card-2")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
                }`}
              style={{ transitionDelay: "300ms" }}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10 flex flex-col gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3334 28V25.3333C29.3334 22.8482 27.6337 20.7601 25.3334 20.168M20.6667 4.38768C22.6213 5.17886 24.0001 7.09508 24.0001 9.33333C24.0001 11.5716 22.6213 13.4878 20.6667 14.279M22.6667 28C22.6667 25.515 22.6667 24.2725 22.2608 23.2924C21.7195 21.9855 20.6812 20.9473 19.3744 20.406C18.3943 20 17.1518 20 14.6667 20H10.6667C8.18173 20 6.93922 20 5.9591 20.406C4.65229 20.9473 3.61402 21.9855 3.07272 23.2924C2.66675 24.2725 2.66675 25.515 2.66675 28M18.0001 9.33333C18.0001 12.2789 15.6123 14.6667 12.6667 14.6667C9.72123 14.6667 7.33341 12.2789 7.33341 9.33333C7.33341 6.38781 9.72123 4 12.6667 4C15.6123 4 18.0001 6.38781 18.0001 9.33333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="space-y-3">
                  <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold group-hover:text-[#00A89D] transition-colors duration-300">
                    People-Focused
                  </h3>
                  <p className="text-[#4D5767] font-openSans text-base leading-relaxed">
                    A professional, dedicated team working with passion and purpose.
                  </p>
                </div>
              </div>

              {/* Subtle border animation */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Split Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 md:inset-y-0 md:left-0 md:w-1/2 bg-gradient-to-br from-[#0A1E3F] via-[#0A1E3F] to-[#0A1E3F]/90"></div>
        <div className="absolute inset-0 md:inset-y-0 md:right-0 md:w-1/2 bg-gradient-to-br from-[#00A89D] via-[#00A89D] to-[#009890]"></div>

        <div
          id="mission-box"
          data-animate
          className={`relative z-10 bg-[#0A1E3F]/95 backdrop-blur-sm py-20 md:py-24 px-8 md:px-12 flex flex-col items-center justify-center text-center gap-8 min-h-[400px] transition-all duration-700 border-r border-white/10 md:border-r ${visibleElements.has("mission-box")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
            }`}
        >
          {/* Decorative Elements */}
          <div className="absolute top-8 left-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 right-8 w-12 h-12 bg-[#E3A700]/20 rounded-full blur-lg"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold tracking-tight">OUR MISSION</h2>
              <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
            </div>

            <div className="w-20 h-1 bg-gradient-to-r from-[#E3A700] to-white/50 rounded-full mx-auto"></div>

            <p className="font-openSans text-lg md:text-xl font-normal max-w-xl leading-relaxed">
              To drive Africa's energy independence by building, owning, and operating the full spectrum of oil and gas infrastructure, from exploration and refining to power generation and nationwide distribution.
            </p>
          </div>
        </div>

        <div
          id="vision-box"
          data-animate
          className={`relative z-10 bg-[#00A89D]/95 backdrop-blur-sm py-20 md:py-24 px-8 md:px-12 flex flex-col items-center justify-center text-center gap-8 min-h-[400px] transition-all duration-700 ${visibleElements.has("vision-box")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
            }`}
          style={{ transitionDelay: "200ms" }}
        >
          {/* Decorative Elements */}
          <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-8 w-12 h-12 bg-[#E3A700]/20 rounded-full blur-lg"></div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="bg-white w-3 h-3 rounded-full animate-pulse"></div>
              <h2 className="font-montserrat text-3xl md:text-4xl font-bold tracking-tight text-white">OUR VISION</h2>
              <div className="bg-white w-3 h-3 rounded-full animate-pulse"></div>
            </div>

            <div className="w-20 h-1 bg-gradient-to-r from-white to-[#E3A700]/50 rounded-full mx-auto"></div>

            <p className="font-openSans text-lg md:text-xl font-normal max-w-xl leading-relaxed text-white">
              To redefine how energy is produced, refined, and delivered across Africa, building a fully indigenous, self-sufficient energy ecosystem that fuels the continent's growth and transformation.
            </p>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left: Image */}
            <div
              id="history-image"
              data-animate
              className={`relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-700 ${visibleElements.has("history-image")
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
                }`}
            >
              <div className="relative h-80 md:h-96 lg:h-[500px]">
                <img
                  src="/about-us/site.jpeg"
                  alt="Our History"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50">
                    <p className="text-[#0A1E3F] font-montserrat text-sm font-bold">Our Legacy</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E3A700] rounded-2xl rotate-12 animate-pulse opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-[#00A89D]/20 backdrop-blur-sm rounded-full animate-bounce"></div>
            </div>

            {/* Right: Content */}
            <div
              id="history-content"
              data-animate
              className={`flex flex-col gap-8 transition-all duration-700 ${visibleElements.has("history-content")
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
                }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
                  <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                    OUR HISTORY
                  </p>
                  <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
                </div>
                <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  From Foundations to Energy Leadership
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>
              </div>

              <div className="space-y-6 max-w-2xl">
                <p className="text-[#4D5767] font-openSans text-lg leading-relaxed">
                  ASEDO Energy Group began over a decade ago as a construction and logistics firm, with its sister company pioneering our entry into oil and gas.
                </p>
                <p className="text-[#4D5767] font-openSans text-lg leading-relaxed">
                  Today, we've evolved into a fully integrated energy group, commanding the entire value chain from resource development to refining, distribution, and end-user delivery.
                </p>
                <p className="text-[#4D5767] font-openSans text-lg leading-relaxed">
                  Our operations power industries, infrastructure, and communities across Africa, delivering reliable and sustainable energy solutions.
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex py-4 px-8 items-center justify-center gap-4 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="text-white font-openSans text-base font-semibold">
                    CONTACT US
                  </span>
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                    <path d="M8 24L24 8M24 8H13.3333M24 8V18.6667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3 text-[#00A89D]">
                  <div className="w-12 h-12 bg-[#00A89D]/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Learn More About Our Journey</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Timeline Section */}
      <div className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#0A1E3F]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div
            id="journey-header"
            data-animate
            className={`text-center mb-20 transition-all duration-700 ${visibleElements.has("journey-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
              }`}
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
              <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                OUR GROWTH
              </p>
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Company's Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00A89D] via-[#E3A700] to-[#00A89D] transform -translate-x-1/2 opacity-30"></div>

            <div className="space-y-20 lg:space-y-32">
              {journeySteps.map((step, index) => (
                <div
                  key={index}
                  id={`journey-step-${index}`}
                  data-animate
                  className={`relative flex flex-col lg:flex-row gap-8 lg:gap-16 items-center transition-all duration-700 ${step.align === 'right' ? 'lg:flex-row-reverse' : ''
                    } ${visibleElements.has(`journey-step-${index}`)
                      ? "opacity-100 translate-x-0"
                      : `opacity-0 ${step.align === 'right' ? 'translate-x-12' : '-translate-x-12'}`
                    }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-6 h-6 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-full shadow-lg animate-pulse border-4 border-white"></div>
                  </div>

                  {/* Content Side */}
                  <div className={`flex-1 flex flex-col gap-6 ${step.align === 'right' ? 'lg:items-end lg:text-right lg:pr-8' : 'lg:items-start lg:text-left lg:pl-8'}`}>
                    <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-montserrat text-lg font-bold">{step.year}</span>
                        </div>
                        <div>
                          <h3 className="text-[#00A89D] font-openSans text-lg md:text-xl font-bold uppercase tracking-wide">
                            {step.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-[#4D5767] font-openSans text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Image Side */}
                  <div className={`flex-1 relative ${step.align === 'right' ? 'lg:order-first' : ''}`}>
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-700 group">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-80 md:h-96 lg:h-[400px] object-cover transition-all duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                      {/* Floating Badge */}
                      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50">
                        <p className="text-[#0A1E3F] font-montserrat text-sm font-bold">{step.year}</p>
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#E3A700] rounded-2xl rotate-12 animate-pulse opacity-80"></div>
                      <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#00A89D]/20 backdrop-blur-sm rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
