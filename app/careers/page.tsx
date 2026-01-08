"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import Hero from "../components/Hero";
import CVSubmissionForm from "../components/CVSubmissionForm";
import { careersAPI } from "../lib/api";

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  published: boolean;
  created_at: string;
}

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const data = await careersAPI.getAll(true); // Get only published
      setCareers(data);
    } catch (error) {
      console.error("Failed to fetch careers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyClick = (jobTitle: string) => {
    const subject = encodeURIComponent(`Application for ${jobTitle}`);
    const body = encodeURIComponent(`Dear ASEDO Energy Group Recruitment Team,

I am writing to express my interest in the ${jobTitle} position.

My Details:
Name:
Email:
Phone:

Please find my resume/CV attached to this email.

Why I'm a great fit:
[Please write your cover letter here]

Best regards,
[Your Name]`);

    window.location.href = `mailto:careers@asedoenergygroup.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/careers" />

      <Hero
        title="Join Our Mission"
        subtitle="Be part of a team that's shaping Africa's energy future. Join ASEDO Energy Group and contribute to transformative projects that power nations."
        badge="Careers"
      />

      {/* Why Work With ASEDO Section */}
      <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
              <p className="text-[#00A89D] font-montserrat text-base md:text-lg font-medium leading-tight tracking-tight uppercase">
                WHY ASEDO
              </p>
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight mb-8">
              Why Work With ASEDO?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {/* Benefit 1 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  High-Impact Work
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Contribute to real infrastructure projects that power nations, fuel industries, and transform communities across Africa.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Growth & Development
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Work alongside global partners and industry experts. Access mentorship, training, and advancement opportunities.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Pan-African Reach
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Experience diverse cultures and work on projects across multiple African markets from our operational hub in Lagos.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Safety First Culture
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  We prioritize your well-being. Rigorous HSE standards, continuous training, and a zero-harm philosophy guide everything we do.
                </p>
              </div>
            </div>

            {/* Benefit 5 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Competitive Compensation
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Attractive salary packages, performance bonuses, health benefits, and retirement planning support.
                </p>
              </div>
            </div>

            {/* Benefit 6 */}
            <div className="group relative bg-white rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-gray-100/50 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Innovation & Ownership
                </h3>
                <p className="text-gray-600 font-openSans text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                  Your ideas matter. We encourage innovation, initiative, and taking ownership of your work and career trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Life at ASEDO Section */}
      <div className="bg-[#F5F5F5] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
              <p className="text-[#00A89D] font-montserrat text-base md:text-lg font-medium leading-tight tracking-tight uppercase">
                OUR CULTURE
              </p>
              <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight mb-8">
              Life at ASEDO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-semibold mb-3">
                  Collaborative Environment
                </h3>
                <p className="text-[#000206]/70 font-openSans text-base leading-relaxed">
                  We believe in teamwork. Cross-functional collaboration ensures that the best solutions come from diverse perspectives working together.
                </p>
              </div>

              <div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-semibold mb-3">
                  Inclusive & Respectful
                </h3>
                <p className="text-[#000206]/70 font-openSans text-base leading-relaxed">
                  Diversity is our strength. We value every voice, respect every background, and foster an environment where everyone can thrive.
                </p>
              </div>

              <div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-semibold mb-3">
                  Results-Driven
                </h3>
                <p className="text-[#000206]/70 font-openSans text-base leading-relaxed">
                  Excellence is non-negotiable. We set high standards, deliver on our commitments, and take pride in the quality of our work.
                </p>
              </div>

              <div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-semibold mb-3">
                  Work-Life Balance
                </h3>
                <p className="text-[#000206]/70 font-openSans text-base leading-relaxed">
                  We work hard, but we also value your personal time. Flexible arrangements, wellness programs, and supportive policies help you maintain balance.
                </p>
              </div>
            </div>

            <div className="relative h-96 bg-gradient-to-br from-[#0A1E3F] to-[#00A89D] rounded-sm flex items-center justify-center">
              <div className="text-center text-white p-8">
                <svg className="w-24 h-24 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-xl font-montserrat font-medium">
                  Join a team that's transforming Africa's energy landscape
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions Section */}
      <div className="relative bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-3">
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              <p className="text-[#00A89D] font-montserrat text-base md:text-lg font-semibold leading-tight tracking-wider uppercase">
                Current Openings
              </p>
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
              Join Our Growing Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto mb-8"></div>
            <p className="text-[#4D5767] font-openSans text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-4">
              Shape the future of Africa's energy sector. We're looking for passionate professionals ready to make an impact.
            </p>
            <p className="text-[#4D5767] font-openSans text-base md:text-lg">
              Don't see a perfect fit? Send us your CV at{" "}
              <a
                href="mailto:careers@asedoenergygroup.com"
                className="text-[#00A89D] hover:text-[#009890] transition-colors font-semibold hover:underline"
              >
                careers@asedoenergygroup.com
              </a>
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D]/20 to-[#E3A700]/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-[#4D5767] font-openSans text-lg">Loading positions...</p>
            </div>
          ) : careers.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 text-center shadow-2xl border border-white/50">
              <div className="w-20 h-20 bg-gradient-to-br from-[#00A89D]/20 to-[#E3A700]/20 rounded-full mx-auto mb-8 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-[#0A1E3F] font-montserrat text-2xl font-bold mb-4">
                No Open Positions Currently
              </h3>
              <p className="text-[#4D5767] font-openSans text-lg mb-6 leading-relaxed">
                We're always looking for talented individuals. Send your CV to explore future opportunities.
              </p>
              <a
                href="mailto:careers@asedoenergygroup.com"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] text-white px-8 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Your CV
              </a>
            </div>
          ) : (
            <div className="space-y-8">
              {careers.map((career, index) => (
                <div
                  key={career.id}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-[#00A89D]/30 overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 via-transparent to-[#E3A700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00A89D]/10 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#E3A700]/10 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        {/* Job Title */}
                        <h3 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                          {career.title}
                        </h3>

                        {/* Job Details */}
                        <div className="flex flex-wrap gap-6 mb-6">
                          <div className="flex items-center gap-3 bg-[#00A89D]/10 rounded-full px-4 py-2">
                            <svg className="w-5 h-5 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0012 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[#0A1E3F] font-openSans text-sm font-medium">
                              {career.department}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 bg-[#00A89D]/10 rounded-full px-4 py-2">
                            <svg className="w-5 h-5 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-[#0A1E3F] font-openSans text-sm font-medium">
                              {career.location}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 bg-[#00A89D]/10 rounded-full px-4 py-2">
                            <svg className="w-5 h-5 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-[#0A1E3F] font-openSans text-sm font-medium">
                              {career.employment_type}
                            </span>
                          </div>
                        </div>

                        {/* Posted Date */}
                        <div className="flex items-center gap-2 text-[#4D5767] font-openSans text-sm mb-6">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Posted {new Date(career.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {/* Apply Button */}
                      <div className="flex-shrink-0">
                        <button
                          onClick={() => handleApplyClick(career.title)}
                          className="group/btn relative bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] text-white px-8 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            Apply Now
                            <svg className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-[#E3A700] to-[#d09900] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CV Submission Form */}
      <CVSubmissionForm />

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
