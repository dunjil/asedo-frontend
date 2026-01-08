"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ShapeFutureCTA from "../components/ShapeFutureCTA";
import BlogCard from "../components/BlogCard";
import Hero from "../components/Hero";
import { blogAPI, getImageUrl } from "../lib/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await blogAPI.getAll(true); // Get only published posts
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Calculate read time based on content length
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    // Strip HTML tags and count words
    const text = content.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };



  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/blog" />
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-xl text-gray-600">Loading blog posts...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Navigation currentPath="/blog" />
        <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No blog posts yet</h2>
          <p className="text-gray-600">Check back soon for updates!</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation currentPath="/blog" />

      <Hero
        title="Insights & Updates"
        subtitle="Discover the latest insights and updates from Asedo Energy Group"
        badge="Blog"
      />

      {/* Clean Blog Grid */}
      {posts.length > 0 ? (
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                  <BlogCard
                    post={post}
                    variant="default"
                    calculateReadTime={calculateReadTime}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-gradient-to-b from-white to-gray-50 py-20 md:py-28 lg:py-32 px-4 sm:px-6 md:px-10 lg:px-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Modern Empty State */}
            <div className="relative mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00A89D]/20 to-[#E3A700]/20 rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
                <svg className="w-16 h-16 text-[#00A89D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-br from-[#00A89D]/10 to-[#E3A700]/10 rounded-full mx-auto blur-xl animate-pulse"></div>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-[#0A1E3F] mb-6 bg-gradient-to-r from-[#0A1E3F] to-gray-600 bg-clip-text text-transparent">
              Content Coming Soon
            </h3>

            <p className="text-gray-600 font-openSans text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              We're crafting exceptional content that will transform how you think about energy innovation. Stay tuned for groundbreaking insights and industry-leading perspectives.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="px-8 py-4 bg-gradient-to-r from-[#00A89D] to-[#009890] rounded-xl text-white font-montserrat font-medium text-base shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
                Notify Me When Published
              </div>
              <div className="px-8 py-4 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-openSans font-medium text-base hover:bg-gray-50 hover:border-[#00A89D] hover:text-[#00A89D] transition-all duration-300 cursor-pointer">
                Browse Categories
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Blog Categories/Insights Section */}
      <div className="flex flex-col w-full">
        {/* Header Strip */}
        <div className="bg-[#00A89D] py-12 md:py-16 px-4 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
              <p className="text-white font-openSans text-xs md:text-sm uppercase tracking-wide font-semibold">OUR INSIGHTS</p>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
            <h2 className="text-white font-montserrat text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
              Industry Perspectives & Updates
            </h2>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="bg-white py-16 md:py-20 lg:py-24 px-4 md:px-10 lg:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {/* Insight 1 */}
              <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 border border-gray-100/50 hover:border-[#00A89D]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold leading-tight mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Market Analysis
                </h3>
                <p className="text-[#4D5767] font-openSans text-base leading-relaxed mb-6">
                  Deep dive into energy market trends, pricing dynamics, and strategic insights shaping the African energy landscape.
                </p>
                <div className="flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold">
                  <span>Explore Insights</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Insight 2 */}
              <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 border border-gray-100/50 hover:border-[#00A89D]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold leading-tight mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Technical Updates
                </h3>
                <p className="text-[#4D5767] font-openSans text-base leading-relaxed mb-6">
                  Stay informed about technological advancements, operational innovations, and industry best practices.
                </p>
                <div className="flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold">
                  <span>Read Updates</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Insight 3 */}
              <div className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform hover:-translate-y-2 border border-gray-100/50 hover:border-[#00A89D]/30">
                <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.904c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0113.971 9h1.946z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-bold leading-tight mb-4 group-hover:text-[#00A89D] transition-colors duration-300">
                  Industry News
                </h3>
                <p className="text-[#4D5767] font-openSans text-base leading-relaxed mb-6">
                  Breaking news, regulatory updates, and significant developments impacting the energy sector in Africa.
                </p>
                <div className="flex items-center gap-2 text-[#00A89D] font-openSans text-sm font-semibold">
                  <span>Stay Informed</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
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
