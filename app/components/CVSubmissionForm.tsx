"use client";

import { useState } from "react";

export default function CVSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Debug: Log the API URL
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    console.log("Using API URL:", apiUrl);

    try {
      const response = await fetch(`${apiUrl}/api/careers/apply`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        // Reset form
        form.reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(data.detail || "Failed to submit CV. Please try again.");
      }
    } catch (error) {
      console.error("CV submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(`Network error: ${error instanceof Error ? error.message : "Please check your connection and try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
            <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold leading-tight uppercase tracking-wider">
              SUBMIT YOUR CV
            </p>
            <div className="bg-[#00A89D] w-2 h-2 rounded-full"></div>
          </div>
          <h2 className="text-[#0A1E3F] font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight mb-6">
            Join Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00A89D] to-[#E3A700] rounded-full mx-auto mb-8"></div>
          <p className="text-[#4D5767] font-openSans text-lg md:text-xl leading-relaxed">
            Don't see a perfect fit? Send us your CV and we'll keep you in mind for future opportunities.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First Name */}
            <div>
              <label htmlFor="first_name" className="block text-[#0A1E3F] font-montserrat text-sm font-semibold mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A89D] focus:ring-2 focus:ring-[#00A89D]/20 outline-none transition-all duration-300 font-openSans"
                placeholder="Enter your first name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="last_name" className="block text-[#0A1E3F] font-montserrat text-sm font-semibold mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A89D] focus:ring-2 focus:ring-[#00A89D]/20 outline-none transition-all duration-300 font-openSans"
                placeholder="Enter your last name"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[#0A1E3F] font-montserrat text-sm font-semibold mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A89D] focus:ring-2 focus:ring-[#00A89D]/20 outline-none transition-all duration-300 font-openSans"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-[#0A1E3F] font-montserrat text-sm font-semibold mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A89D] focus:ring-2 focus:ring-[#00A89D]/20 outline-none transition-all duration-300 font-openSans resize-none"
                placeholder="Tell us why you're interested in joining ASEDO or highlight relevant experience..."
              ></textarea>
              <p className="text-sm text-gray-500 mt-2 font-openSans">
                Optional: Add a brief message to accompany your application
              </p>
            </div>

            {/* CV Upload */}
            <div>
              <label htmlFor="cv" className="block text-[#0A1E3F] font-montserrat text-sm font-semibold mb-2">
                Upload CV/Resume <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  required
                  accept=".pdf,.doc,.docx"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00A89D] focus:ring-2 focus:ring-[#00A89D]/20 outline-none transition-all duration-300 font-openSans file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00A89D] file:text-white hover:file:bg-[#009890] file:cursor-pointer"
                />
              </div>
              <p className="text-sm text-gray-500 mt-2 font-openSans">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-start gap-3">
                <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-green-900 font-montserrat font-semibold mb-1">CV Submitted Successfully!</h4>
                  <p className="text-green-700 font-openSans text-sm">
                    Thank you for your interest in ASEDO Energy Group. We've received your CV and will review it shortly.
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
                  <h4 className="text-red-900 font-montserrat font-semibold mb-1">Submission Failed</h4>
                  <p className="text-red-700 font-openSans text-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-8 rounded-2xl font-montserrat font-semibold text-white transition-all duration-300 flex items-center justify-center gap-3 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] hover:shadow-xl transform hover:-translate-y-1"
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  Submit CV
                </>
              )}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-[#4D5767] font-openSans text-sm">
            By submitting your CV, you consent to ASEDO Energy Group storing your information for recruitment purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
