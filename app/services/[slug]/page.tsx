"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ShapeFutureCTA from "../../components/ShapeFutureCTA";
import { servicesAPI, getImageUrl } from "../../lib/api";
import { Service } from "../../lib/servicesData";
import Link from "next/link";

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [service, setService] = useState<Service | null>(null);
  const [otherServices, setOtherServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const currentService = await servicesAPI.getBySlug(slug);
        setService(currentService);

        // Fetch other services
        const allServices = await servicesAPI.getAll(true);
        const filtered = allServices.filter((s: Service) => s.slug !== slug);
        setOtherServices(filtered);
      } catch (error) {
        console.error("Failed to fetch service:", error);
        router.push("/services");
      }
    };

    fetchService();
  }, [slug, router]);

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/services" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/services" />

      {/* Modern Hero Section */}
      <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <img
          src={getImageUrl(service.image)}
          className="absolute inset-0 w-full h-full object-cover"
          alt={service.title}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F]/90 via-[#00A89D]/70 to-[#0A1E3F]/80"></div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20 text-center">
          {/* Service Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
            <span className="text-white font-openSans text-sm font-semibold uppercase tracking-wider">
              Professional Service
            </span>
          </div>

          {/* Title */}
          <h1 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 capitalize">
            {service.title}
          </h1>

          {/* Subtitle */}
          <p className="text-white/90 font-openSans text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
            {service.subtitle}
          </p>

          {/* Service Meta Information */}
          <div className="flex items-center justify-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-openSans text-sm font-medium">Comprehensive Solution</span>
            </div>
            <div className="w-1 h-1 bg-white/60 rounded-full"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="font-openSans text-sm font-medium">Expert Team</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-[#E3A700]/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-12 h-12 bg-white/20 rounded-full blur-lg animate-bounce"></div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] py-4 px-4 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-[#00A89D] hover:underline">Home</Link>
          <span className="text-gray-500">/</span>
          <Link href="/services" className="text-[#00A89D] hover:underline">Services</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-700">{service.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <div
              className="text-[#0A1E3F] font-openSans text-lg md:text-xl leading-relaxed prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: service.content.intro }}
            />
          </div>

          {/* Content Sections */}
          {service.content.sections.map((section, index) => (
            <div key={index} className="mb-12">
              {section.title && (
                <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-semibold mb-6">
                  {section.title}
                </h2>
              )}
              <div
                className="text-[#0A1E3F] font-openSans text-base md:text-lg leading-relaxed mb-6 prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
              {section.list && section.list.length > 0 && (
                <ul className="space-y-4 ml-6">
                  {section.list.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-[#0A1E3F] font-openSans text-base md:text-lg leading-relaxed flex gap-3">
                      <span className="text-[#00A89D] mt-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* What Sets Us Apart */}
          {service.content.whatSetsUsApart && service.content.whatSetsUsApart.points && service.content.whatSetsUsApart.points.length > 0 && (
            <div className="mt-16 bg-[#F5F5F5] p-8 md:p-12">
              <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-semibold mb-8">
                {service.content.whatSetsUsApart.title}
              </h2>
              <div className="space-y-6">
                {service.content.whatSetsUsApart.points.map((point, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-[#00A89D] rounded-full flex items-center justify-center text-white font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-[#0A1E3F] font-openSans text-base md:text-lg leading-relaxed flex-1">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16">
            <div className="bg-[#00A89D] p-8 md:p-12 text-center">
              <h2 className="text-white font-montserrat text-2xl md:text-3xl font-semibold mb-4">
                Interested in this service?
              </h2>
              <p className="text-white font-openSans text-base md:text-lg mb-8 max-w-2xl mx-auto">
                Contact our specialized team to discuss how we can help with your {service.title.toLowerCase()} needs.
              </p>
              <a
                href={`mailto:${service.contactEmail}`}
                className="inline-flex items-center gap-3 bg-white text-[#00A89D] px-8 py-4 hover:bg-gray-100 transition-colors font-openSans font-semibold"
              >
                <span>Contact {service.title} Team</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <p className="text-white font-openSans text-base md:text-lg mt-4 opacity-90">
                {service.contactEmail}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Other Services */}
      {otherServices.length > 0 && (
        <div className="bg-[#F5F5F5] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-medium mb-12">
              Explore Our Other Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherServices.slice(0, 3).map((otherService, index) => (
                <div
                  key={otherService.id}
                  onClick={() => router.push(`/services/${otherService.slug}`)}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Background Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00A89D]/5 via-transparent to-[#E3A700]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#00A89D]/10 to-transparent rounded-full transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-[#E3A700]/10 to-transparent rounded-full transform -translate-x-10 translate-y-10 group-hover:scale-125 transition-transform duration-700"></div>

                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={getImageUrl(otherService.image)}
                      alt={otherService.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E3F]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <h3 className="text-white font-montserrat text-lg md:text-xl font-bold leading-tight drop-shadow-lg group-hover:text-white transition-colors">
                          {otherService.title}
                        </h3>
                      </div>
                    </div>

                    {/* Floating Action Button */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="relative p-6 md:p-8 flex flex-col gap-4 flex-grow bg-gradient-to-br from-white via-gray-50/30 to-white">
                    {/* Service Tag */}
                    <div className="flex items-center justify-start">
                      <span className="inline-flex items-center px-3 py-1 bg-[#00A89D]/10 text-[#00A89D] font-openSans text-xs font-semibold rounded-full border border-[#00A89D]/20">
                        Professional Service
                      </span>
                    </div>

                    {/* Description */}
                    <div className="space-y-3 flex-grow">
                      <p className="text-[#4D5767] font-openSans text-sm leading-relaxed line-clamp-4 group-hover:text-gray-800 transition-colors">
                        {otherService.excerpt}
                      </p>
                    </div>

                    {/* CTA Section */}
                    <div className="flex items-center gap-3 text-[#00A89D] font-openSans text-sm font-semibold group-hover:gap-4 transition-all duration-300 mt-auto pt-4 border-t border-gray-100/50">
                      <span>Explore Service</span>
                      <div className="relative">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 transition-transform group-hover:translate-x-2 group-hover:scale-110"
                        >
                          <path
                            d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Subtle border animation */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00A89D]/20 via-transparent to-[#E3A700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link
                href="/services"
                className="inline-flex items-center gap-3 bg-[#00A89D] text-white px-8 py-4 hover:bg-[#008f86] transition-colors"
              >
                <span className="font-openSans text-base font-semibold">View All Services</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                >
                  <path
                    d="M8 24L24 8M24 8H13.3333M24 8V18.6667"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
