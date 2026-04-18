"use client";

import Link from "next/link";
import { useState } from "react";

interface NavigationProps {
  currentPath: string;
}

export default function Navigation({ currentPath }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/about-us", label: "ABOUT US" },
    { href: "/services", label: "OUR SERVICES" },
    { href: "/projects", label: "OUR PROJECTS" },
    { href: "/team", label: "OUR TEAM" },
    { href: "/blog", label: "NEWS" },
    { href: "/hse-policy", label: "HSE POLICY" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Glass Morphism Background */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg"></div>

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-white/30 to-white/50"></div>

      <div className="relative flex py-1 md:py-0 px-4 md:px-10 lg:px-20 justify-between items-center w-full">
        <Link href="/">
          <img
            src="/logos/logo.png"
            className="shrink-0 w-32 md:w-40 lg:w-auto h-16 md:h-20 lg:h-24 max-w-none"
            alt="ASEDO Logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-3 w-fit">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col px-4 py-2 justify-center items-center gap-1 h-[47px] relative transition-all duration-300 hover:bg-white/50 rounded-lg"
            >
              <p className="font-openSans text-sm leading-[1.25em] whitespace-nowrap font-medium text-[#000206] group-hover:text-[#00A89D] transition-colors duration-300">
                {item.label}
              </p>
              {currentPath === item.href && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full"></div>
              )}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full group-hover:w-8 transition-all duration-300"></div>
            </Link>
          ))}
          <Link
            href="/contact"
            className={`group flex px-6 py-3 justify-center items-center h-[47px] transition-all duration-300 ml-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${currentPath === "/contact"
              ? "bg-gradient-to-r from-[#00A89D] to-[#009890]"
              : "bg-gradient-to-r from-[#E3A700] to-[#d09900] hover:from-[#d09900] hover:to-[#E3A700]"
            }`}
          >
            <p className={`font-openSans text-sm font-semibold leading-[1.25em] whitespace-nowrap ${currentPath === "/contact" ? "text-white" : "text-[#0A1E3F]"} group-hover:scale-105 transition-transform duration-300`}>
              CONTACT US
            </p>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-white/30 shadow-lg hover:bg-white/70 transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-[#0A1E3F] transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-4 right-4 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl lg:hidden z-40 shadow-2xl mt-4 overflow-hidden">
            <div className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group px-6 py-4 border-b border-gray-100/50 hover:bg-gradient-to-r hover:from-[#00A89D]/5 hover:to-[#E3A700]/5 transition-all duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className={`font-openSans text-base leading-[1.25em] font-medium transition-colors duration-300 ${currentPath === item.href
                    ? "text-[#00A89D] font-semibold"
                    : "text-[#000206] group-hover:text-[#00A89D]"
                    }`}>
                    {item.label}
                  </p>
                </Link>
              ))}
              <Link
                href="/contact"
                className="mx-6 mt-4 mb-2 flex p-3 justify-center items-center bg-gradient-to-r from-[#E3A700] to-[#d09900] hover:from-[#d09900] hover:to-[#E3A700] rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                onClick={() => setMobileMenuOpen(false)}
              >
                <p className="text-[#0A1E3F] font-openSans text-base font-semibold">
                  CONTACT US
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
