"use client";

import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { usePathname } from "next/navigation";

export default function CareersPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navigation currentPath={pathname} />

      {/* Hero Banner */}
      <section className="relative bg-[#0A1E3F] overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0A1E3F] via-[#0d2a58] to-[#0A1E3F]" />
          <div className="absolute top-10 right-20 w-72 h-72 bg-[#00A89D]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-10 w-56 h-56 bg-[#E3A700]/10 rounded-full blur-3xl" />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 bg-[#E3A700]/20 border border-[#E3A700]/40 rounded-full px-5 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-[#E3A700] animate-pulse" />
            <span className="text-[#E3A700] font-openSans text-sm font-medium tracking-wide uppercase">
              Applications Closed
            </span>
          </div>

          <h1 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Careers at{" "}
            <span className="bg-gradient-to-r from-[#00A89D] to-[#E3A700] bg-clip-text text-transparent">
              ASEDO Energy
            </span>
          </h1>

          <p className="text-white/70 font-openSans text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Thank you for your interest in joining our team. We are not currently
            accepting applications, but great opportunities will return soon.
          </p>
        </div>
      </section>

      {/* Main Notice */}
      <section className="flex-1 flex items-center justify-center px-6 py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-2xl w-full text-center">
          {/* Icon */}
          <div className="mx-auto mb-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00A89D]/10 to-[#E3A700]/10 border border-[#00A89D]/20 flex items-center justify-center shadow-lg">
            <svg
              className="w-12 h-12 text-[#00A89D]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2zM12 12v4M10 14h4"
              />
            </svg>
          </div>

          <h2 className="font-montserrat text-2xl md:text-3xl font-bold text-[#0A1E3F] mb-4">
            We are not hiring at this time
          </h2>
          <p className="font-openSans text-[#4D5767] text-base md:text-lg leading-relaxed mb-10">
            All open positions have been filled and applications are now closed.
            We appreciate your passion and interest in ASEDO Energy Group. Please
            check back at a later date — new opportunities will be announced here
            when they become available.
          </p>

          {/* Check back note */}
          <p className="font-openSans text-[#00A89D] text-sm font-medium mb-10 tracking-wide uppercase">
            Check back here when applications open again
          </p>

          {/* Back home CTA */}
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#0A1E3F] to-[#0d2a58] text-white font-openSans text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
