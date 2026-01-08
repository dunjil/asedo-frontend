"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import Hero from "../components/Hero";
import { projectsAPI, getImageUrl } from "../lib/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: string;
  image_url: string;
  images?: string[];
  featured: boolean;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function ProjectsClient() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/projects" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading projects...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/projects" />

      <Hero
        title="Transformative Projects"
        subtitle="With execution discipline and strategic partnerships, our projects deliver long-term value and global competitiveness across Africa's energy landscape."
        badge="Projects"
        image="/backgrounds/grey-refinery.webp"
      />

      {/* Intro Section */}
      <div className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
          <div className="flex items-center gap-4">
            <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
            <p className="text-[#00A89D] font-openSans text-sm md:text-base font-bold uppercase tracking-wide">
              SEE OUR PROJECTS
            </p>
            <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
          </div>

          <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium leading-tight">
            See How We're Powering Change Around The World
          </h2>

          <p className="text-[#0A1E3F] font-openSans text-base md:text-lg leading-relaxed opacity-90 max-w-4xl">
            Asedo Energy Group is executing a bold, continent-spanning vision
            integrating energy infrastructure, digital systems, logistics, and
            industrial manufacturing into a unified growth platform.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="w-full bg-white pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 justify-center max-w-screen-xl mx-auto">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                  className="group relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer border border-gray-100/50 hover:border-[#00A89D]/30 backdrop-blur-sm transform hover:-translate-y-2"
                >
                  {/* Modern Image Container with Enhanced Overlay */}
                  <div className="relative w-full h-60 md:h-64 overflow-hidden">
                    <img
                      src={getImageUrl((project.images && project.images.length > 0) ? project.images[0] : project.image_url) || "/projects/default-project.png"}
                      alt={project.title}
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
                          {project.status}
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
                        Project
                      </span>
                    </div>

                    {/* Title with Modern Typography */}
                    <div className="space-y-2">
                      <h3 className="text-[#0A1E3F] font-montserrat text-xl md:text-2xl font-bold leading-tight group-hover:text-[#00A89D] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="w-12 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full transform origin-left group-hover:scale-x-150 transition-transform duration-500"></div>
                    </div>

                    {/* Enhanced Description */}
                    <div
                      className="text-gray-600 font-openSans text-base md:text-lg font-normal leading-relaxed prose prose-base max-w-none
                        prose-p:text-gray-600 prose-strong:font-semibold prose-strong:text-[#0A1E3F] line-clamp-4 group-hover:text-gray-800 transition-colors"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    />

                    {/* Modern CTA Section */}
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-[#00A89D] font-openSans text-base md:text-lg font-semibold group-hover:text-[#0A1E3F] transition-colors duration-300">
                          Explore Project
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
        </div>
      ) : (
        <div className="w-full bg-white pb-12 md:pb-16 lg:pb-24 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">No projects yet</h3>
            <p className="text-gray-600">Check back soon for updates on our latest projects!</p>
          </div>
        </div>
      )}

      {/* Strategic Global Footprint Section */}
      <div className="w-full bg-gradient-to-br from-white via-gray-50/30 to-white py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <div className="flex items-center justify-center gap-4 py-3 mb-8">
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
              <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
                ROADMAP
              </p>
              <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
            </div>
            <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight max-w-4xl mx-auto mb-6">
              Strategic Global Footprint
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto"></div>
          </div>

          {/* Clean Global Presence */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Nigeria */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/nigeria.png" alt="Nigeria Flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#00A89D] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">Nigeria</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Active</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Refining, Retail, Cement, Logistics, Power</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Rolling operations</span>
                </div>
              </div>
            </div>

            {/* USA */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/usa.png" alt="USA Flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E3A700] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">USA</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Operational</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Fabrication, Retail, Leasing Base</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Expanded Q2 2025</span>
                </div>
              </div>
            </div>

            {/* UAE */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/uae.png" alt="UAE Flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E3A700] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">UAE</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Acquisition</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Refining & Trade Hub</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Closing Q1 2026</span>
                </div>
              </div>
            </div>

            {/* Turkey */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/turkey.png" alt="Turkey Flag" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E3A700] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">Turkey</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Opening Soon</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Procurement & Tech Interface</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Q1 2026</span>
                </div>
              </div>
            </div>

            {/* East Africa */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/east-africa.png" alt="East Africa" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E3A700] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">East Africa</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Launching</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Smart Devices (Project AMY)</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Q4 2025</span>
                </div>
              </div>
            </div>

            {/* West Africa */}
            <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="bg-white w-10 h-7 flex items-center justify-center overflow-hidden rounded shadow-sm">
                    <img src="/flags/west-africa.png" alt="West Africa" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#E3A700] rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-[#0A1E3F] font-montserrat text-lg font-bold">West Africa</h4>
                    <span className="text-[#E3A700] font-openSans text-xs font-semibold uppercase px-2 py-1 bg-[#E3A700]/10 rounded-full">Rolling</span>
                  </div>
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-2">Retail & Device Distribution</p>
                  <span className="text-[#00A89D] font-openSans text-xs font-medium">Through 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Commitment Section */}
      <div className="bg-gradient-to-br from-[#00A89D] via-[#009890] to-[#00A89D] w-full py-20 md:py-24 lg:py-28 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
            {/* Left: Content */}
            <div className="flex flex-col gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 backdrop-blur-sm w-12 h-12 rounded-2xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                    Execution Commitment
                  </h2>
                </div>

                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#E3A700] to-white/50 rounded-full"></div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <blockquote className="text-white font-openSans text-xl md:text-2xl leading-relaxed italic font-light">
                      "Our vision is industrial, our execution is silent, and our model is built for the long term not headlines, but real assets in motion."
                    </blockquote>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#E3A700] rounded-full animate-pulse"></div>
                      <span className="text-white/80 font-openSans text-sm font-semibold uppercase tracking-wide">ASEDO Leadership</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    text: "Multi-region diversification",
                    icon: (
                      <svg className="w-8 h-8 text-[#E3A700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )
                  },
                  {
                    text: "Quiet partner acquisition strategy",
                    icon: (
                      <svg className="w-8 h-8 text-[#E3A700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  {
                    text: "Technology-first integration",
                    icon: (
                      <svg className="w-8 h-8 text-[#E3A700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )
                  },
                  {
                    text: "Energy as an industrial base",
                    icon: (
                      <svg className="w-8 h-8 text-[#E3A700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    )
                  },
                  {
                    text: "Execution built on measurable milestones",
                    icon: (
                      <svg className="w-8 h-8 text-[#E3A700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    )
                  }
                ].map((item, index) => (
                  <div key={index} className="group flex items-center gap-6 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-openSans text-lg md:text-xl font-medium leading-relaxed group-hover:text-[#E3A700] transition-colors duration-300">
                        {item.text}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 01.293.707V10a1 1 0 01-.293.707l-4 4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-[#00A89D]/20 to-transparent z-10"></div>
                <img
                  src="/team/projects-execution-commitment.png"
                  alt="Executive Leadership"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/50">
                    <p className="text-[#0A1E3F] font-montserrat text-sm font-bold">Strategic Vision</p>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#E3A700] rounded-2xl rotate-12 animate-pulse opacity-80"></div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
