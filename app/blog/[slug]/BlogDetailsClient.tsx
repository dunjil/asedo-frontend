"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import { blogAPI, getImageUrl } from "../../lib/api";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    category: string;
    image_url: string;
    featured: boolean;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export default function BlogDetailsClient() {
    const params = useParams();
    const slug = params.slug as string;
    const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            try {
                const data = await blogAPI.getBySlug(slug);
                setBlogPost(data);
            } catch (err) {
                console.error("Failed to fetch blog post:", err);
                setError("Failed to load blog post");
            } finally {
                setIsLoading(false);
            }
        };

        if (slug) {
            fetchBlogPost();
        }
    }, [slug]);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navigation currentPath="/blog" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-xl text-gray-600">Loading blog post...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (error || !blogPost) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navigation currentPath="/blog" />
                <div className="flex flex-col items-center justify-center min-h-[400px] px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h2>
                    <p className="text-gray-600 mb-6">{error || "The blog post you're looking for doesn't exist."}</p>
                    <a href="/blog" className="text-[#00A89D] hover:underline">← Back to blog</a>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation currentPath="/blog" />

            {/* Modern Hero Section */}
            <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                {blogPost.image_url && (
                    <>
                        <img
                            src={getImageUrl(blogPost.image_url)}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={blogPost.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F]/90 via-[#00A89D]/70 to-[#0A1E3F]/80"></div>
                    </>
                )}

                {/* Fallback gradient background if no image */}
                {!blogPost.image_url && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F] via-[#00A89D]/80 to-[#0A1E3F]"></div>
                )}

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20 text-center">
                    {/* Category Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                        <span className="text-white font-openSans text-sm font-semibold uppercase tracking-wider">
                            {blogPost.category || "Uncategorized"}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 capitalize">
                        {blogPost.title}
                    </h1>

                    {/* Excerpt */}
                    {blogPost.excerpt && (
                        <p className="text-white/90 font-openSans text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
                            {blogPost.excerpt}
                        </p>
                    )}

                    {/* Meta Information */}
                    <div className="flex items-center justify-center gap-6 text-white/80">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-openSans text-sm font-medium">
                                {new Date(blogPost.created_at).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                        <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                            <span className="font-openSans text-sm font-medium">
                                {(() => {
                                    const wordsPerMinute = 200;
                                    const text = blogPost.content.replace(/<[^>]*>/g, '');
                                    const words = text.trim().split(/\s+/).length;
                                    const minutes = Math.ceil(words / wordsPerMinute);
                                    return `${minutes} min read`;
                                })()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-16 h-16 bg-[#E3A700]/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-32 w-12 h-12 bg-white/20 rounded-full blur-lg animate-bounce"></div>
            </div>

            {/* Blog Content Wrapper */}
            <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 px-4 md:px-10 lg:px-20 py-20 md:py-24 lg:py-28 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-20 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#E3A700] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12">
                    {/* Main Content */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg border border-gray-100/50">
                        {/* Excerpt Highlight */}
                        {blogPost.excerpt && (
                            <div className="mb-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                                    <p className="text-[#00A89D] font-openSans text-sm font-semibold uppercase tracking-wider">
                                        Article Summary
                                    </p>
                                    <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                                </div>
                                <div className="bg-gradient-to-r from-[#00A89D]/5 to-[#E3A700]/5 border-l-4 border-[#00A89D] p-6 md:p-8 rounded-r-2xl">
                                    <p className="text-[#0A1E3F] font-montserrat text-lg md:text-xl leading-relaxed italic font-medium">
                                        {blogPost.excerpt}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Full Content - Rich Text HTML */}
                        <style jsx>{`
              .blog-content {
                font-family: var(--font-open-sans);
                line-height: 1.8;
                color: #4D5767;
              }
              .blog-content :is(h1, h2, h3, h4, h5, h6) {
                font-family: var(--font-montserrat);
                color: #0A1E3F;
                margin-top: 2rem;
                margin-bottom: 1rem;
                line-height: 1.3;
              }
              .blog-content h1 { font-size: 2.25rem; font-weight: 700; }
              .blog-content h2 { font-size: 1.875rem; font-weight: 600; }
              .blog-content h3 { font-size: 1.5rem; font-weight: 600; }
              .blog-content h4 { font-size: 1.25rem; font-weight: 600; }
              .blog-content p {
                margin-bottom: 1.5rem;
                font-size: 1.125rem;
              }
              .blog-content a {
                color: #00A89D;
                text-decoration: none;
                font-weight: 500;
                transition: all 0.2s ease;
              }
              .blog-content a:hover {
                text-decoration: underline;
                color: #008f86;
              }
              .blog-content strong, .blog-content b {
                font-weight: 700;
                color: #0A1E3F;
              }
              .blog-content ul, .blog-content ol {
                margin-left: 1.5rem;
                margin-bottom: 1.5rem;
                padding-left: 1rem;
              }
              .blog-content li {
                margin-bottom: 0.75rem;
                font-size: 1.125rem;
                position: relative;
              }
              .blog-content ul li::marker {
                color: #00A89D;
                font-weight: bold;
              }
              .blog-content blockquote {
                border-left: 4px solid #00A89D;
                padding-left: 1.5rem;
                margin: 2rem 0;
                font-style: italic;
                background: #00A89D/5;
                padding: 1.5rem;
                border-radius: 0 1rem 1rem 0;
                position: relative;
              }
              .blog-content blockquote::before {
                content: '"';
                font-size: 4rem;
                color: #00A89D/20;
                position: absolute;
                top: -10px;
                left: 10px;
                font-family: serif;
              }
              .blog-content img {
                max-width: 100%;
                height: auto;
                border-radius: 1rem;
                margin: 2rem 0;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              }
              .blog-content hr {
                border: none;
                height: 2px;
                background: linear-gradient(to right, #00A89D, #E3A700);
                margin: 3rem 0;
                border-radius: 1px;
              }
              /* Preserve inline styles for colors and highlights */
              .blog-content [style*="color"] {
                /* Inline color styles will override this */
              }
              .blog-content mark {
                background: linear-gradient(120deg, #00A89D/20, #E3A700/20);
                padding: 0.1rem 0.3rem;
                border-radius: 0.25rem;
              }
            `}</style>
                        <div
                            className="blog-content"
                            dangerouslySetInnerHTML={{ __html: blogPost.content }}
                        />
                    </div>

                    {/* Navigation & Social Sharing */}
                    <div className="bg-white rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100/50">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Back to Blog Link */}
                            <a
                                href="/blog"
                                className="inline-flex items-center gap-4 text-[#00A89D] hover:gap-6 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-[#00A89D]/10 rounded-full flex items-center justify-center group-hover:bg-[#00A89D]/20 transition-colors">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5 rotate-180 transition-transform group-hover:scale-110"
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
                                <div>
                                    <p className="font-openSans text-sm text-gray-600">Back to</p>
                                    <p className="font-montserrat text-base font-semibold">Blog Posts</p>
                                </div>
                            </a>

                            {/* Share Section */}
                            <div className="flex items-center gap-4">
                                <span className="text-gray-600 font-openSans text-sm font-medium">Share:</span>
                                <div className="flex items-center gap-2">
                                    {/* Social Share Buttons */}
                                    <button className="w-10 h-10 bg-[#1877F2]/10 hover:bg-[#1877F2]/20 rounded-full flex items-center justify-center transition-all duration-200 group">
                                        <svg className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 rounded-full flex items-center justify-center transition-all duration-200 group">
                                        <svg className="w-5 h-5 text-[#1DA1F2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </button>
                                    <button className="w-10 h-10 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 rounded-full flex items-center justify-center transition-all duration-200 group">
                                        <svg className="w-5 h-5 text-[#0A66C2] group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Blog Posts */}
                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-100/50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                            <h3 className="text-[#0A1E3F] font-montserrat text-2xl md:text-3xl font-bold">
                                Related Articles
                            </h3>
                            <div className="bg-[#00A89D] w-3 h-3 rounded-full animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* This would be populated with actual related posts from the API */}
                            {/* For now, showing placeholder cards */}
                            <div className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 hover:border-[#00A89D]/30">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#00A89D] to-[#E3A700] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[#0A1E3F] font-montserrat text-lg font-semibold mb-2 group-hover:text-[#00A89D] transition-colors">
                                            Energy Innovation Trends
                                        </h4>
                                        <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-3">
                                            Discover the latest developments shaping Africa's energy landscape and what they mean for the future.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#00A89D] font-openSans text-xs font-medium">5 min read</span>
                                            <svg className="w-4 h-4 text-[#00A89D] transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100/50 hover:border-[#00A89D]/30">
                                <div className="flex items-start gap-4">
                                    <div className="w-16 h-16 bg-gradient-to-br from-[#E3A700] to-[#00A89D] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-[#0A1E3F] font-montserrat text-lg font-semibold mb-2 group-hover:text-[#00A89D] transition-colors">
                                            Sustainable Development Goals
                                        </h4>
                                        <p className="text-[#4D5767] font-openSans text-sm leading-relaxed mb-3">
                                            How ASEDO's initiatives align with global sustainability targets and contribute to a greener future.
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[#00A89D] font-openSans text-xs font-medium">7 min read</span>
                                            <svg className="w-4 h-4 text-[#00A89D] transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* View All Blogs CTA */}
                        <div className="text-center mt-8">
                            <a
                                href="/blog"
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#00A89D] to-[#009890] hover:from-[#009890] hover:to-[#00A89D] text-white px-8 py-4 rounded-2xl font-montserrat font-semibold transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                Explore All Articles
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
