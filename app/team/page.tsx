"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import Hero from "../components/Hero";
import { teamAPI, getImageUrl } from "../lib/api";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image_url: string;
  bio: string;
  order: number;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await teamAPI.getAll(true); // Get only published
        setMembers(data);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/team" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading team...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/team" />

      <Hero
        title="Meet Our Team"
        subtitle="Driven by vision, powered by expertise, committed to excellence in transforming Africa's energy landscape."
        badge="Leadership Team"
        image="/backgrounds/grey-refinery.webp"
      />

      {/* Team Grid Section */}
      {members.length > 0 ? (
        <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-12 md:mb-16 text-center">
              <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
                <p className="text-[#00A89D] font-montserrat text-base md:text-lg font-medium leading-tight tracking-tight uppercase">
                  OUR LEADERSHIP
                </p>
                <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
              </div>
              <h2 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium leading-tight tracking-tight">
                The People Behind Our Success
              </h2>
            </div>

            {/* Clean Team Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="group relative bg-white rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 hover:border-[#00A89D]/30"
                >
                  {/* Name and Title Only */}
                  <div className="text-center">
                    <h3 className="text-[#0A1E3F] font-montserrat text-lg md:text-xl font-bold leading-tight mb-2 group-hover:text-[#00A89D] transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-[#00A89D] font-openSans text-sm md:text-base font-semibold">
                      {member.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#FFF] w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Our team is growing</h3>
            <p className="text-gray-600">Check back soon to meet our leadership!</p>
          </div>
        </div>
      )}

      <ShapeFutureCTA />

      <Footer />
    </div>
  );
}
