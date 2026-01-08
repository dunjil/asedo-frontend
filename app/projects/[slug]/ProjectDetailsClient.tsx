"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import ShapeFutureCTA from "../../components/ShapeFutureCTA";
import { projectsAPI, getImageUrl } from "../../lib/api";

interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    status: string;
    category?: string;
    location?: string;
    year?: number;
    client?: string;
    image_url: string;
    images?: string[];
    featured: boolean;
    published: boolean;
    created_at: string;
    updated_at: string;
}

export default function ProjectDetailsClient() {
    const params = useParams();
    const router = useRouter();
    const slug = params.slug as string;
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const data = await projectsAPI.getAll();
                const foundProject = data.find((p: Project) => p.slug === slug);
                if (foundProject) {
                    setProject(foundProject);
                } else {
                    router.push('/projects');
                }
            } catch (error) {
                console.error("Failed to fetch project:", error);
                router.push('/projects');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [slug, router]);

    if (isLoading) {
        return (
            <div className="flex flex-col min-h-screen bg-white">
                <Navigation currentPath="/projects" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <p className="text-xl text-gray-600">Loading project...</p>
                </div>
                <Footer />
            </div>
        );
    }

    if (!project) {
        return null;
    }

    const displayImages = project.images && project.images.length > 0
        ? project.images
        : project.image_url
            ? [project.image_url]
            : [];

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navigation currentPath="/projects" />

            {/* Modern Hero Section */}
            <div className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image with Overlay */}
                {displayImages.length > 0 && (
                    <>
                        <img
                            src={getImageUrl(displayImages[selectedImageIndex]) || "/projects/default-project.png"}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt={project.title}
                            style={{
                                filter: 'none !important',
                                mixBlendMode: 'normal',
                                imageRendering: 'auto'
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F]/90 via-[#00A89D]/70 to-[#0A1E3F]/80"></div>
                    </>
                )}

                {/* Fallback gradient background if no image */}
                {!displayImages.length && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0A1E3F] via-[#00A89D]/80 to-[#0A1E3F]"></div>
                )}

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-[#E3A700] rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-20 text-center">
                    {/* Status Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-8">
                        <span className="text-white font-openSans text-sm font-semibold uppercase tracking-wider">
                            {project.status}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-white font-montserrat text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 capitalize">
                        {project.title}
                    </h1>

                    {/* Location */}
                    {project.location && (
                        <p className="text-white/90 font-openSans text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
                            {project.location}
                        </p>
                    )}

                    {/* Project Meta Information */}
                    <div className="flex items-center justify-center gap-6 text-white/80">
                        {project.category && (
                            <>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-openSans text-sm font-medium">{project.category}</span>
                                </div>
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                            </>
                        )}
                        {project.year && (
                            <>
                                <div className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                                    </svg>
                                    <span className="font-openSans text-sm font-medium">{project.year}</span>
                                </div>
                                <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                            </>
                        )}
                        {project.client && (
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                                <span className="font-openSans text-sm font-medium">{project.client}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-20 left-20 w-16 h-16 bg-[#E3A700]/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute bottom-32 right-32 w-12 h-12 bg-white/20 rounded-full blur-lg animate-bounce"></div>
            </div>

            {/* Modern Image Gallery Section */}
            {displayImages.length > 1 && (
                <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8 md:py-12 px-4 sm:px-6 md:px-10 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Section Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A89D]/30 to-transparent"></div>
                            <p className="text-[#0A1E3F] font-montserrat text-sm font-semibold uppercase tracking-widest">
                                Project Gallery
                            </p>
                            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#00A89D]/30 to-transparent"></div>
                        </div>
                        
                        {/* Modern Grid Gallery */}
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
                            {displayImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`group relative aspect-square rounded-xl overflow-hidden shadow-md transition-all duration-300 
                                        ${selectedImageIndex === index
                                            ? 'ring-3 ring-[#00A89D] ring-offset-2 scale-105 shadow-xl shadow-[#00A89D]/20'
                                            : 'hover:scale-105 hover:shadow-xl hover:shadow-gray-300/50'
                                        }`}
                                >
                                    <img
                                        src={getImageUrl(image) || "/projects/default-project.png"}
                                        alt={`${project.title} ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            filter: 'none !important',
                                            mixBlendMode: 'normal',
                                            imageRendering: 'auto'
                                        }}
                                    />
                                    {/* Overlay with number */}
                                    <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300
                                        ${selectedImageIndex === index 
                                            ? 'bg-[#00A89D]/40' 
                                            : 'bg-black/0 group-hover:bg-black/30'
                                        }`}>
                                        <span className={`font-montserrat font-bold text-white text-lg transition-all duration-300
                                            ${selectedImageIndex === index 
                                                ? 'opacity-100 scale-100' 
                                                : 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
                                            }`}>
                                            {index + 1}
                                        </span>
                                    </div>
                                    {/* Active indicator */}
                                    {selectedImageIndex === index && (
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-full shadow-lg"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        {/* Image counter */}
                        <div className="flex justify-center mt-6">
                            <div className="inline-flex items-center gap-2 bg-[#0A1E3F]/5 px-4 py-2 rounded-full">
                                <svg className="w-4 h-4 text-[#00A89D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-[#0A1E3F] font-openSans text-sm font-medium">
                                    {selectedImageIndex + 1} of {displayImages.length} images
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Project Details */}
            <div className="w-full bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-10 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
                                <p className="text-[#00A89D] font-openSans text-sm md:text-base font-bold uppercase tracking-wide">
                                    PROJECT DETAILS
                                </p>
                                <div className="bg-[#0A1E3F] w-1.5 h-1.5 rounded-full"></div>
                            </div>

                            <div
                                className="text-[#0A1E3F] font-openSans text-base md:text-lg leading-relaxed prose prose-lg max-w-none
                  prose-headings:text-[#0A1E3F] prose-headings:font-montserrat
                  prose-p:text-[#0A1E3F] prose-strong:font-semibold
                  prose-ul:text-[#0A1E3F] prose-ol:text-[#0A1E3F]
                  prose-li:text-[#0A1E3F]"
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        </div>

                        {/* Simplified Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-lg sticky top-24">
                                <h3 className="text-[#0A1E3F] font-montserrat text-xl font-semibold mb-6">
                                    Project Information
                                </h3>

                                <div className="space-y-6">
                                    {project.category && (
                                        <div>
                                            <p className="text-[#00A89D] font-openSans text-sm font-bold uppercase mb-2">
                                                Category
                                            </p>
                                            <p className="text-[#0A1E3F] font-openSans text-base">
                                                {project.category}
                                            </p>
                                        </div>
                                    )}

                                    {project.location && (
                                        <div>
                                            <p className="text-[#00A89D] font-openSans text-sm font-bold uppercase mb-2">
                                                Location
                                            </p>
                                            <p className="text-[#0A1E3F] font-openSans text-base">
                                                {project.location}
                                            </p>
                                        </div>
                                    )}

                                    {project.year && (
                                        <div>
                                            <p className="text-[#00A89D] font-openSans text-sm font-bold uppercase mb-2">
                                                Year
                                            </p>
                                            <p className="text-[#0A1E3F] font-openSans text-base">
                                                {project.year}
                                            </p>
                                        </div>
                                    )}

                                    {project.client && (
                                        <div>
                                            <p className="text-[#00A89D] font-openSans text-sm font-bold uppercase mb-2">
                                                Client
                                            </p>
                                            <p className="text-[#0A1E3F] font-openSans text-base">
                                                {project.client}
                                            </p>
                                        </div>
                                    )}

                                    <div>
                                        <p className="text-[#00A89D] font-openSans text-sm font-bold uppercase mb-2">
                                            Status
                                        </p>
                                        <div className="inline-block bg-[#00A89D] px-3 py-1 rounded">
                                            <p className="text-white font-openSans text-sm font-medium">
                                                {project.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push('/projects')}
                                    className="mt-8 w-full bg-[#0A1E3F] text-white font-openSans font-medium px-6 py-3 rounded hover:bg-[#00A89D] transition-colors duration-300"
                                >
                                    ← Back to Projects
                                </button>
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
