"use client";

import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Link from "next/link";
import Footer from "./components/Footer";
import ShapeFutureCTA from "./components/ShapeFutureCTA";
import AnimatedStat from "./components/AnimatedStat";
import BlogCard from "./components/BlogCard";
import Hero from "./components/Hero";
import { blogAPI, servicesAPI, getImageUrl } from "./lib/api";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  reading_time: number;
  image_url: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

interface Service {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  published: boolean;
}

export default function AsedoWebsiteRedesignLofi() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogAPI.getAll();
        // Get only published blogs and limit to 2
        const publishedBlogs = data.filter((blog: Blog) => blog.published).slice(0, 2);
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    const fetchServices = async () => {
      try {
        const data = await servicesAPI.getAll(true);
        // Get only published services and limit to 3
        const publishedServices = data.filter((service: Service) => service.published).slice(0, 3);
        setServices(publishedServices);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };

    fetchBlogs();
    fetchServices();
  }, []);

  const industries = [
    {
      title: "Upstream Development",
      image: "/industries/upstream-development.png",
    },
    {
      title: "Offshore Drilling & Marine Logistics",
      image: "/industries/offshore-drilling.png",
    },
    {
      title: "Refining & Processing",
      image: "/industries/refining-processing.png",
    },
    {
      title: "Gas & Power Infrastructure",
      image: "/industries/gas-power.png",
    },
    {
      title: "Nationwide Distribution Network",
      image: "/industries/distribution-network.png",
    },
    {
      title: "Procurement & Supply Chain Solutions",
      image: "/industries/supply-chain.png",
    },
  ];

  const values = [
    {
      title: "END-TO-END INTEGRATION",
      description:
        "From exploration to refining and nationwide distribution, we control every stage of the value chain for maximum efficiency and quality assurance.",
      colors: ["transparent", "transparent", "#0A1E3F", "transparent", "#00A89D", "transparent", "transparent", "transparent", "#E3A700"],
    },
    {
      title: "INDIGENOUS & SELF SUFFICIENT",
      description:
        "100% African-owned and fully asset-backed, we maintain strategic independence, ensuring profits and control remain within Africa.",
      colors: ["#E3A700", "transparent", "transparent", "transparent", "#0A1E3F", "transparent", "transparent", "transparent", "#00A89D"],
    },
    {
      title: "SCALABLE, MODULAR APPROACH",
      description:
        "Our infrastructure adapts to market demands with modular refineries and flexible logistics, expanding efficiently across domestic and regional markets.",
      colors: ["#00A89D", "transparent", "transparent", "transparent", "#E3A700", "transparent", "#0A1E3F", "transparent", "transparent"],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/" />

      {/* Hero Section */}
      <div className="relative w-full min-h-[400px] md:min-h-[500px] lg:min-h-[700px] flex items-center overflow-hidden">
        <img
          src="/backgrounds/grey-refinery.webp"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out animate-pulse"
          alt="Sustainable Energy Solutions"
        />
        {/* Enhanced Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#00A89D]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-32 left-32 w-40 h-40 bg-[#E3A700]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s', animationDuration: '10s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s', animationDuration: '12s' }}></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16 lg:py-24">
          <div className="max-w-4xl">
            <h1 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6 md:mb-8 animate-fade-in-up drop-shadow-2xl">
              Powering Sustainable Energy Solutions
            </h1>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/contact"
                className="group flex py-3 px-6 md:px-8 justify-center items-center gap-3 bg-[#E3A700] hover:bg-[#d09900] transition-all duration-300 min-w-[140px] transform hover:scale-105 hover:shadow-xl"
              >
                <span className="text-[#0A1E3F] font-openSans text-sm md:text-base font-semibold leading-tight tracking-tight whitespace-nowrap">
                  CONTACT US
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                    stroke="#0A1E3F"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link
                href="/about-us"
                className="group flex py-3 px-6 md:px-8 justify-center items-center gap-3 border-2 border-white/80 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 min-w-[140px] transform hover:scale-105 hover:shadow-xl"
              >
                <span className="text-white font-openSans text-sm md:text-base font-semibold leading-tight tracking-tight whitespace-nowrap">
                  LEARN MORE
                </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1"
                >
                  <path
                    d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Our Services Section */}
      <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 py-3">
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
              <p className="text-[#00A89D] font-openSans text-xs md:text-sm font-normal leading-tight uppercase">
                OUR SERVICES
              </p>
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
              Comprehensive Energy Solutions
            </h2>
          </div>
          <Link href="/services" className="group inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] rounded-2xl text-white font-openSans text-base md:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-2 border-white/30 hover:border-white/50">
            <span>View all Services</span>
            <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2 group-hover:bg-white/40 group-hover:scale-110 shadow-md">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 transition-transform group-hover:scale-110">
                <path d="M8 24L24 8M24 8H13.3333M24 8V18.6667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </Link>
        </div>
        {services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100/50 hover:border-[#00A89D]/30"
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

                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <svg className="w-8 h-8 text-white bg-black/20 backdrop-blur-sm rounded-full p-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>

                {/* Modern Content Container */}
                <div className="relative p-6 md:p-8 flex flex-col gap-4 flex-grow bg-gradient-to-br from-white via-gray-50/30 to-white">
                  {/* Category Tag */}
                  <div className="flex items-center justify-start">
                    <span className="inline-flex items-center px-3 py-1 bg-[#00A89D]/10 text-[#00A89D] font-openSans text-xs font-semibold rounded-full border border-[#00A89D]/20">
                      Service
                    </span>
                  </div>

                  {/* Title with Modern Typography */}
                  <div className="space-y-2">
                    <h3 className="text-[#0A1E3F] font-montserrat text-lg md:text-xl font-bold leading-tight group-hover:text-[#00A89D] transition-colors duration-300">
                      {service.title}
                    </h3>
                  </div>

                  {/* Enhanced Description */}
                  <div className="space-y-3 flex-grow">
                    <p className="text-[#4D5767] font-openSans text-sm leading-relaxed line-clamp-3 group-hover:text-gray-800 transition-colors">
                      {service.excerpt}
                    </p>
                  </div>

                  {/* CTA Section */}
                  <div className="mt-auto pt-4 flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold group-hover:gap-3 transition-all duration-200">
                    <span>Learn More</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    >
                      <path
                        d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-[#00A89D]/10 to-transparent rounded-br-full transform -translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#E3A700]/10 to-transparent rounded-tl-full transform translate-x-10 translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>

                {/* Subtle border animation */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No services available yet.</p>
          </div>
        )}
      </div>

      {/* Our Promise Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20 items-center">
            {/* Left: Promise Header */}
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                <h2 className="text-[#00A89D] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  OUR PROMISE
                </h2>
                <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>
            </div>

            {/* Right: Promise Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100/50">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-[#4D5767] font-openSans text-xl md:text-2xl leading-relaxed font-medium">
                      Delivering reliable, innovative, and integrated energy solutions with integrity, safety, and operational excellence.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3 text-[#00A89D]">
                    <div className="w-10 h-10 bg-[#00A89D]/10 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Trusted by Industry Leaders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        <img
          src="/team/home-team-section.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Our Team"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F]/80 via-[#00A89D]/60 to-[#0A1E3F]/40"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-20 py-12 md:py-16">
          <div className="max-w-4xl">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
                <p className="text-white font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                  OUR TEAM
                </p>
                <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
              </div>

              <h2 className="text-white font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-8">
                Discover the Leaders Who Are Transforming the Clean Energy Ecosystem
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-[#E3A700] to-white/50 rounded-full mb-10"></div>

              <div className="flex items-center gap-6">
                <Link
                  href="/about-us#team"
                  className="inline-flex py-4 px-8 items-center justify-center gap-4 bg-gradient-to-r from-[#E3A700] to-[#d09900] hover:from-[#d09900] hover:to-[#E3A700] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="text-white font-openSans text-base font-semibold">
                    See Team
                  </span>
                  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                    <path d="M8 24L24 8M24 8H13.3333M24 8V18.6667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <div className="flex items-center gap-3 text-white/80">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-sm font-medium">Meet Our Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-[#E3A700]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-white/20 rounded-full blur-lg animate-bounce"></div>
      </div>

      {/* What We Do Section */}
      <div className="bg-gradient-to-br from-white via-gray-50/30 to-white w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
                <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                  WHAT WE DO
                </p>
                <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
              </div>
              <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                We are dedicated to making clean energy accessible, affordable, and effective.
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>

              <div className="flex items-center gap-6 pt-4">
                <Link
                  href="/about-us"
                  className="inline-flex py-4 px-8 items-center justify-center gap-4 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span className="text-white font-openSans text-base font-semibold">
                    About Us
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
                  <div className="text-sm font-medium">Discover Our Mission</div>
                </div>
              </div>
            </div>

            {/* Right: Image and Content Card */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-700 group">
                <div className="relative h-80 md:h-96 lg:h-[500px]">
                  <img
                    src="/team/home-what-we-do.webp"
                    className="w-full h-full object-cover"
                    alt="Industrial Research"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00A89D]/40 to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50">
                      <p className="text-[#0A1E3F] font-montserrat text-sm font-bold">Industrial Research</p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E3A700] rounded-2xl rotate-12 animate-pulse opacity-80"></div>
                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full animate-bounce"></div>
              </div>

              {/* Content Card Overlay */}
              <div className="absolute -bottom-8 -left-8 bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100/50 max-w-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[#4D5767] font-openSans text-base leading-relaxed">
                      ASEDO was founded with a vision to drive sustainable energy solutions that empower individuals, businesses, and communities.
                    </p>
                  </div>
                </div>

                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-3 text-[#00A89D] font-openSans text-sm font-semibold hover:text-[#009890] transition-colors group"
                >
                  <span>Learn more</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Quote Section */}
      <div className="relative w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-50"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
            {/* Left: Image */}
            <div className="relative group">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-105 transition-all duration-700">
                <div className="aspect-[4/3] relative">
                  <img
                    src="/backgrounds/grey-refinery.webp"
                    className="absolute inset-0 w-full h-full object-cover"
                    alt="ASEDO Energy Refinery Operations"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/20 via-transparent to-[#E3A700]/20"></div>


                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#E3A700] rounded-full animate-pulse opacity-80"></div>
                <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-[#00A89D]/30 rounded-full animate-bounce"></div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
                <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                  From Our Founder
                </h2>
                <div className="bg-[#E3A700] w-3 h-3 rounded-full animate-pulse"></div>
              </div>

              <div className="w-20 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>

              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute -top-6 -left-6 text-[#E3A700] text-8xl font-serif leading-none opacity-10">"</div>
                  <blockquote className="text-[#0A1E3F] font-openSans text-xl md:text-2xl leading-relaxed italic relative z-10">
                    "At ASEDO Energy, our journey began with a vision: to redefine how energy is produced, refined, and delivered across Africa. Today, ASEDO Energy stands as a symbol of African capability, driven by innovation, professionalism, and long-term partnerships."
                  </blockquote>
                  <div className="absolute -bottom-10 -right-6 text-[#E3A700] text-8xl font-serif leading-none opacity-10 rotate-180">"</div>
                </div>

                <div className="bg-gradient-to-r from-white via-gray-50/50 to-white rounded-2xl p-6 border border-gray-100/50 shadow-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-1">
                        Victor O. Adegbite
                      </h4>
                      <p className="text-[#00A89D] font-openSans text-base font-semibold">
                        Founder & Chairman
                      </p>
                      <p className="text-[#4D5767] font-openSans text-sm">
                        ASEDO Energy Group
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="mb-12 md:mb-16 lg:mb-20">
          <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 py-2 sm:py-3 mb-6 sm:mb-8 md:mb-10">
            <div className="bg-[#0A1E3F] w-2 h-2 rounded-full"></div>
            <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
              WHY CHOOSE US
            </p>
            <div className="bg-[#0A1E3F] w-2 h-2 rounded-full"></div>
          </div>
          <h2 className="text-[#0A1E3F] font-montserrat text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-4xl text-center sm:text-left mx-auto sm:mx-0">
            We deliver safe, reliable, and sustainable energy across Africa and beyond.
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 hover:border-[#00A89D]/40 transform hover:-translate-y-2"
            >
              <div className="flex flex-wrap gap-1 w-fit mx-auto sm:mx-0 mb-6 sm:mb-8">
                {value.colors.map((color, colorIndex) => (
                  <div
                    key={colorIndex}
                    className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: color === "transparent" ? "transparent" : color,
                      border: color !== "transparent" ? `2px solid ${color}` : "2px solid rgba(0,168,157,0.3)",
                    }}
                  ></div>
                ))}
              </div>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <h3 className="text-[#0A1E3F] font-montserrat text-lg sm:text-xl md:text-2xl font-bold leading-tight text-center sm:text-left group-hover:text-[#00A89D] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#4D5767] font-openSans text-sm sm:text-base md:text-lg font-normal leading-relaxed text-center sm:text-left group-hover:text-gray-700 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Numbers Section */}
      <div className="w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#0A1E3F]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              <h2 className="text-[#0A1E3F] font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                Our Numbers
              </h2>
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20">
            {/* Left Side - Core Metrics */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-white via-gray-50/50 to-white rounded-3xl p-8 md:p-10 shadow-2xl border border-gray-100/50">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                      <circle cx="9" cy="12" r="1" />
                      <circle cx="15" cy="12" r="1" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14l2-2m4 2l2-2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[#0A1E3F] font-montserrat text-2xl font-bold">Core Achievements</h3>
                    <p className="text-[#4D5767] font-openSans text-sm">Building momentum and scale</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center group">
                    <div className="relative mb-4">
                      <div className="text-4xl md:text-5xl font-bold text-[#00A89D] group-hover:scale-110 transition-transform duration-300">
                        <AnimatedStat value="10+" label="" color="teal" delay={0} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E3A700] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-[#4D5767] font-openSans text-sm font-medium">Years Of Experience</p>
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-4">
                      <div className="text-4xl md:text-5xl font-bold text-[#00A89D] group-hover:scale-110 transition-transform duration-300">
                        <AnimatedStat value="4" label="" color="teal" delay={1} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E3A700] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-[#4D5767] font-openSans text-sm font-medium">Countries</p>
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-4">
                      <div className="text-4xl md:text-5xl font-bold text-[#00A89D] group-hover:scale-110 transition-transform duration-300">
                        <AnimatedStat value="500+" label="" color="teal" delay={2} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E3A700] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-[#4D5767] font-openSans text-sm font-medium">Clients Served</p>
                  </div>

                  <div className="text-center group">
                    <div className="relative mb-4">
                      <div className="text-4xl md:text-5xl font-bold text-[#00A89D] group-hover:scale-110 transition-transform duration-300">
                        <AnimatedStat value="5" label="" color="teal" delay={3} />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#E3A700] rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <p className="text-[#4D5767] font-openSans text-sm font-medium">Operational Divisions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Growth Targets */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#0A1E3F] via-[#0A1E3F] to-[#0A1E3F]/90 rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-montserrat text-2xl font-bold">2026 Growth Targets</h3>
                    <p className="text-white/80 font-openSans text-sm">Ambitious expansion ahead</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">9</span>
                      </div>
                      <div>
                        <p className="text-white font-montserrat text-xl font-bold">9%</p>
                        <p className="text-white/80 font-openSans text-sm">Projected Fleet & Equipment Growth</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#E3A700] font-openSans text-sm font-semibold">by 2026</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">20</span>
                      </div>
                      <div>
                        <p className="text-white font-montserrat text-xl font-bold">20m</p>
                        <p className="text-white/80 font-openSans text-sm">Annual Production Capacity Target</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#E3A700] font-openSans text-sm font-semibold">Crude & Gas</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">25</span>
                      </div>
                      <div>
                        <p className="text-white font-montserrat text-xl font-bold">25k</p>
                        <p className="text-white/80 font-openSans text-sm">Processing Capacity</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[#E3A700] font-openSans text-sm font-semibold">Tonnes</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#E3A700]/20 to-white/10 rounded-2xl backdrop-blur-sm border-2 border-[#E3A700]/30">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-xl flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <p className="text-white font-montserrat text-lg font-bold">Refinery Status</p>
                      </div>
                      <p className="text-white/90 font-openSans text-sm leading-relaxed">
                        Refinery fully operational by Q4 2026 (Nigeria & Dubai)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights & Updates Section */}
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
              <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                OUR BLOGS
              </p>
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
              Insights & Updates
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto"></div>
          </div>

          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
              {blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  post={blog}
                  variant="default"
                  calculateReadTime={(content: string) => {
                    const wordsPerMinute = 200;
                    const text = content.replace(/<[^>]*>/g, '');
                    const words = text.trim().split(/\s+/).length;
                    const minutes = Math.ceil(words / wordsPerMinute);
                    return `${minutes} min read`;
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No blog posts available yet</h3>
              <p className="text-gray-600">Check back soon for the latest insights and updates from ASEDO.</p>
            </div>
          )}

          {/* View All Link */}
          {blogs.length > 0 && (
            <div className="text-center mt-16">
              <Link
                href="/blog"
                className="inline-flex py-4 px-8 items-center justify-center gap-4 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span className="text-white font-openSans text-base font-semibold">
                  View All Blogs
                </span>
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <path d="M8 24L24 8M24 8H13.3333M24 8V18.6667" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Our Impact is Growing Across Nigeria Section */}
      <div className="relative flex flex-col w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-[#0A1E3F]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="flex flex-col gap-6 mb-12">
            <div className="flex items-center justify-center gap-4 py-3">
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                Nationwide Presence
              </p>
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <div className="text-center">
              <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-4">
                Our Impact Spans Across Nigeria
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto mb-6"></div>
              <p className="text-[#4D5767] font-openSans text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                From Lagos to Rivers, Ogun to beyond - ASEDO's comprehensive energy solutions are transforming communities nationwide, driving sustainable development and economic growth across every region.
              </p>
            </div>
          </div>

          {/* Modern Map Container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-4 md:p-6 lg:p-8 shadow-2xl border border-white/50 transform hover:scale-[1.02] transition-all duration-700">
            <div className="bg-gradient-to-br from-gray-50/50 to-white/50 rounded-2xl p-4 md:p-6 overflow-hidden">
              <div className="flex justify-center">
                <img
                  src="/maps/nigeria.svg"
                  className="w-full max-w-6xl h-auto drop-shadow-lg"
                  alt="Nigeria Map - ASEDO's Nationwide Coverage"
                />
              </div>

              {/* Mobile-friendly touch targets */}
              <div className="absolute inset-0 md:hidden rounded-2xl">
                <button className="absolute top-[30%] left-[40%] w-8 h-8" aria-label="Ogun location"></button>
                <button className="absolute top-[40%] left-[50%] w-8 h-8" aria-label="Lagos location"></button>
                <button className="absolute bottom-[30%] left-[55%] w-8 h-8" aria-label="Rivers location"></button>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-[#00A89D] to-[#009890] text-white rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold font-montserrat">4</div>
                <div className="text-xs font-openSans opacity-90">States</div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-[#E3A700] to-[#d09900] text-white rounded-2xl p-4 shadow-xl transform hover:scale-105 transition-all duration-300">
              <div className="text-center">
                <div className="text-2xl font-bold font-montserrat">36</div>
                <div className="text-xs font-openSans opacity-90">LGAs</div>
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
