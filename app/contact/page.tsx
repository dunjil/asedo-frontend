"use client";

import Navigation from "../components/Navigation";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.firstName);
    formDataToSend.append("last_name", formData.lastName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("message", formData.message);

    // Use fallback if env var not loaded
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.detail || "Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/contact" />

      <Hero
        title="Get In Touch With ASEDO"
        subtitle="Ready to transform your energy solutions? Connect with our team of experts and discover how ASEDO Energy Group can power your vision across Africa's energy landscape."
        badge="Contact"
        image="/contact/hero-bg.webp"
      />

      {/* Mobile-First Contact Form Section */}
      <div className="relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          {/* Mobile: Form First, Image Second */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20">

            {/* Mobile-First: Form Section (Appears First on Mobile) */}
            <div className="order-1 lg:order-2 bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl border border-gray-100/50">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-bold">
                  Send us a Message
                </h2>
                <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {/* First Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-[#0A1E3F] font-openSans text-sm font-semibold leading-tight block"
                    >
                      First Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="John"
                        required
                        className="w-full py-4 px-4 md:px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-[#0A1E3F] font-openSans text-base focus:outline-none focus:border-[#00A89D] focus:bg-white transition-all duration-300 hover:border-gray-200 touch-manipulation"
                      />
                      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00A89D] rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-[#0A1E3F] font-openSans text-sm font-semibold leading-tight block"
                    >
                      Last Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        required
                        className="w-full py-4 px-4 md:px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-[#0A1E3F] font-openSans text-base focus:outline-none focus:border-[#00A89D] focus:bg-white transition-all duration-300 hover:border-gray-200 touch-manipulation"
                      />
                      <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00A89D] rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[#0A1E3F] font-openSans text-sm font-semibold leading-tight block"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@company.com"
                      required
                      className="w-full py-4 px-4 md:px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-[#0A1E3F] font-openSans text-base focus:outline-none focus:border-[#00A89D] focus:bg-white transition-all duration-300 hover:border-gray-200 touch-manipulation"
                    />
                    <div className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#00A89D] rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-[#0A1E3F] font-openSans text-sm font-semibold leading-tight block"
                  >
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your project or inquiry..."
                      required
                      rows={5}
                      className="w-full py-4 px-4 md:px-6 bg-gray-50/50 border-2 border-gray-100 rounded-2xl text-[#0A1E3F] font-openSans text-base focus:outline-none focus:border-[#00A89D] focus:bg-white transition-all duration-300 hover:border-gray-200 resize-none touch-manipulation"
                    ></textarea>
                    <div className="absolute right-3 md:right-4 top-6 w-2 h-2 bg-[#00A89D] rounded-full opacity-0 transition-opacity duration-300 focus-within:opacity-100"></div>
                  </div>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-green-900 font-montserrat font-semibold mb-1">Message Sent Successfully!</h4>
                      <p className="text-green-700 font-openSans text-sm">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-red-900 font-montserrat font-semibold mb-1">Failed to Send Message</h4>
                      <p className="text-red-700 font-openSans text-sm">{errorMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`group w-full relative text-white font-montserrat font-semibold py-4 px-6 md:px-8 rounded-2xl transition-all duration-300 overflow-hidden touch-manipulation ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] hover:shadow-xl transform hover:-translate-y-1"
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        </>
                      )}
                    </span>
                    {!isSubmitting && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#E3A700] to-[#d09900] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    )}
                  </button>
                </div>

                {/* Privacy Note */}
                <div className="text-center pt-4">
                  <p className="text-[#4D5767] font-openSans text-sm leading-relaxed">
                    We respect your privacy. Your information is secure and will never be shared.
                  </p>
                </div>
              </form>
            </div>

            {/* Mobile-Second: Enhanced Image Section (Appears Second on Mobile) */}
            <div className="order-2 lg:order-1 relative">
              <div className="relative bg-gradient-to-br from-[#00A89D]/10 to-[#E3A700]/10 rounded-3xl p-6 md:p-8 lg:p-12 shadow-2xl overflow-hidden">
                <img
                  src="/contact/illustration.webp"
                  className="w-full h-auto rounded-2xl shadow-lg"
                  alt="Contact ASEDO Energy Group"
                />

                {/* Floating Stats - Mobile Optimized */}
                <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-gradient-to-br from-[#00A89D] to-[#009890] text-white rounded-2xl p-3 md:p-4 shadow-xl w-20 h-20 md:w-24 md:h-24">
                  <div className="flex flex-col items-center justify-center h-full w-full text-center">
                    <div className="text-xl md:text-2xl font-bold font-montserrat">24/7</div>
                    <div className="text-xs font-openSans opacity-90">Support</div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-gradient-to-br from-[#E3A700] to-[#d09900] text-white rounded-2xl p-3 md:p-4 shadow-xl w-20 h-20 md:w-24 md:h-24">
                  <div className="flex flex-col items-center justify-center h-full w-full text-center">
                    <div className="text-xl md:text-2xl font-bold font-montserrat">24h</div>
                    <div className="text-xs font-openSans opacity-90">Response</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 left-0 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#00A89D]/20 to-transparent rounded-full transform -translate-x-8 -translate-y-8 md:-translate-x-12 md:-translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tl from-[#E3A700]/20 to-transparent rounded-full transform translate-x-6 translate-y-6 md:translate-x-10 md:translate-y-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern Contact Information */}
      <div className="relative w-full bg-gradient-to-br from-slate-50 via-white to-slate-50 py-16 md:py-20 lg:py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-[#00A89D] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
              <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
                Get In Touch
              </h2>
              <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto mb-8"></div>
            <p className="text-[#4D5767] font-openSans text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Multiple ways to connect with our team. Choose the method that works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
            {/* Office Location */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-2 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0A1E3F] font-montserrat text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-[#00A89D] transition-colors">
                      Visit Our Office
                    </h3>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mb-3"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-[#4D5767] font-openSans text-sm md:text-base leading-relaxed mb-4">
                    Mara Court, 12 Sambrerio Close off Limpopo Street Maitama Abuja.
                  </p>

                  <div className="flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold group-hover:gap-3 transition-all">
                    <span>Get Directions</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00A89D]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#E3A700]/10 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
            </div>

            {/* Email */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-2 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0A1E3F] font-montserrat text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-[#00A89D] transition-colors">
                      Send Email
                    </h3>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mb-3"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-[#4D5767] font-openSans text-sm md:text-base leading-relaxed mb-4">
                    Reach out directly via email for detailed inquiries and project discussions.
                  </p>

                  <div className="w-full">
                    <a
                      href="mailto:info@asedoenergygroup.com"
                      className="inline-flex items-start gap-2 text-[#00A89D] font-openSans text-sm font-semibold hover:text-[#009890] transition-all group-hover:gap-3 break-words"
                    >
                      <span className="break-all leading-tight">info@asedoenergygroup.com</span>
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00A89D]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#E3A700]/10 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
            </div>

            {/* Phone */}
            <div className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100/50 hover:border-[#00A89D]/30 transform hover:-translate-y-2 h-full">
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#0A1E3F] font-montserrat text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-[#00A89D] transition-colors">
                      Call Us
                    </h3>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mb-3"></div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-[#4D5767] font-openSans text-sm md:text-base leading-relaxed mb-4">
                    Speak directly with our experts for immediate assistance and consultation.
                  </p>

                  <a
                    href="tel:+2349128888816"
                    className="inline-flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold hover:text-[#009890] transition-all group-hover:gap-3"
                  >
                    <span>+234 912 888 8816</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#00A89D]/10 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-[#E3A700]/10 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
            </div>
          </div>

          {/* Additional Contact Options */}
          <div className="mt-16 text-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100/50">
              <h3 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-bold mb-6">
                Additional Ways to Connect
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#00A89D]/5 to-transparent rounded-2xl border border-[#00A89D]/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#009890] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h4 className="text-[#0A1E3F] font-montserrat text-lg font-semibold mb-2">Project Consultation</h4>
                  <p className="text-[#4D5767] font-openSans text-sm text-center">Schedule a detailed consultation with our technical experts</p>
                </div>

                <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#E3A700]/5 to-transparent rounded-2xl border border-[#E3A700]/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#E3A700] to-[#d09900] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h4 className="text-[#0A1E3F] font-montserrat text-lg font-semibold mb-2">Site Visit</h4>
                  <p className="text-[#4D5767] font-openSans text-sm text-center">Arrange an on-site visit to discuss your specific requirements</p>
                </div>

                <div className="flex flex-col items-center p-6 bg-gradient-to-br from-[#00A89D]/5 to-[#E3A700]/5 rounded-2xl border border-[#00A89D]/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-xl flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h4 className="text-[#0A1E3F] font-montserrat text-lg font-semibold mb-2">Team Introduction</h4>
                  <p className="text-[#4D5767] font-openSans text-sm text-center">Meet the specialists who will work on your project</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
