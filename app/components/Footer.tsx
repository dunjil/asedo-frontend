"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { servicesAPI, projectsAPI } from "../lib/api";

interface Service {
    id: number;
    title: string;
    slug: string;
    published: boolean;
}

interface Project {
    id: number;
    title: string;
    slug: string;
    published: boolean;
}

export default function Footer() {
    const [services, setServices] = useState<Service[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [servicesData, projectsData] = await Promise.all([
                    servicesAPI.getAll(true),
                    projectsAPI.getAll(true)
                ]);
                setServices(servicesData.slice(0, 4)); // Limit to 4 services
                setProjects(projectsData.slice(0, 4)); // Limit to 4 projects
            } catch (error) {
                console.error("Failed to fetch footer data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    return (
        <footer className="bg-gradient-to-b from-gray-50 to-white w-full py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 border-t border-gray-200/50 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 right-10 w-32 h-32 bg-[#00A89D] rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#E3A700] rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">

                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        <img
                            src="/logos/logo.png"
                            className="w-40 h-auto"
                            alt="ASEDO Logo"
                        />
                        <p className="text-[#0A1E3F] font-openSans text-sm font-normal leading-relaxed">
                            Leading Nigerian oil and gas company dedicated to delivering
                            innovative solutions and exceptional services across the entire
                            energy value chain.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-4 mt-2">
                            {/* Facebook */}
                            <a href="https://www.facebook.com/share/15fXEiNCMU/" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#00A89D] hover:bg-[#00A89D] hover:text-white hover:border-[#00A89D] transition-all duration-300 shadow-sm hover:shadow-md">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="currentColor" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a href="https://www.instagram.com/asedoenergygroup?igsh=YzFkb3E4b3ZhNDE1" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#00A89D] hover:bg-[#00A89D] hover:text-white hover:border-[#00A89D] transition-all duration-300 shadow-sm hover:shadow-md">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor" />
                                </svg>
                            </a>

                            {/* YouTube */}
                            <a href="https://youtube.com/@asedoenergylimited?si=PU0mhBRQQevLC4iw" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#00A89D] hover:bg-[#00A89D] hover:text-white hover:border-[#00A89D] transition-all duration-300 shadow-sm hover:shadow-md">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="currentColor" />
                                </svg>
                            </a>

                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/in/asedo-energy-limited-5943b7346?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#00A89D] hover:bg-[#00A89D] hover:text-white hover:border-[#00A89D] transition-all duration-300 shadow-sm hover:shadow-md">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="currentColor" />
                                </svg>
                            </a>

                            {/* Twitter/X */}
                            <a href="https://x.com/AsedoEnerggroup?t=b_5G9vjFO91k84hiYexeww&s=09" target="_blank" rel="noopener noreferrer" className="group w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-[#00A89D] hover:bg-[#00A89D] hover:text-white hover:border-[#00A89D] transition-all duration-300 shadow-sm hover:shadow-md">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="flex flex-col md:flex-row gap-10 md:gap-16 lg:gap-20">
                        {/* Company */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Company</h3>
                            <div className="flex flex-col gap-3 text-[#00A89D] font-montserrat text-sm font-normal">
                                <Link href="/about-us" className="hover:underline">About Us</Link>
                                <Link href="/team" className="hover:underline">Our Team</Link>
                                <Link href="/blog" className="hover:underline">Our Blog</Link>
                                <Link href="/about-us" className="hover:underline">Who We Are</Link>
                                <Link href="/careers" className="hover:underline">Careers</Link>
                                <Link href="/hse-policy" className="hover:underline">HSE Policy</Link>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Services</h3>
                            <div className="flex flex-col gap-3 text-[#000206] font-montserrat text-sm font-normal">
                                {loading ? (
                                    <>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                    </>
                                ) : services.length > 0 ? (
                                    services.map((service) => (
                                        <Link
                                            key={service.id}
                                            href={`/services/${service.slug}`}
                                            className="hover:text-[#00A89D] transition-colors"
                                        >
                                            {service.title}
                                        </Link>
                                    ))
                                ) : (
                                    <Link href="/services" className="hover:text-[#00A89D] transition-colors">View All Services</Link>
                                )}
                            </div>
                        </div>

                        {/* Projects */}
                        <div className="flex flex-col gap-4 max-w-xs">
                            <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Projects</h3>
                            <div className="flex flex-col gap-3 text-[#000206] font-montserrat text-sm font-normal">
                                {loading ? (
                                    <>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                        <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                                    </>
                                ) : projects.length > 0 ? (
                                    projects.map((project) => (
                                        <Link
                                            key={project.id}
                                            href={`/projects/${project.slug}`}
                                            className="hover:text-[#00A89D] transition-colors"
                                        >
                                            {project.title}
                                        </Link>
                                    ))
                                ) : (
                                    <Link href="/projects" className="hover:text-[#00A89D] transition-colors">View All Projects</Link>
                                )}
                            </div>
                            <div className="flex items-center gap-2 border-b border-[#00A89D] w-fit pb-0.5 mt-1">
                                <Link href="/projects" className="text-[#00A89D] font-montserrat text-sm font-medium">More links</Link>
                                <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M8 24L24 8M24 8H13.3333M24 8V18.6667" stroke="#00A89D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
                    {/* Office Address */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Office Address</h3>
                        <div className="flex items-start gap-3">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0 text-[#00A89D]">
                                <path d="M21.3337 17.8326C26.0427 18.7585 29.3337 20.873 29.3337 23.3333C29.3337 26.647 23.3641 29.3333 16.0003 29.3333C8.63653 29.3333 2.66699 26.647 2.66699 23.3333C2.66699 20.873 5.95791 18.7585 10.667 17.8326M16.0003 22.6667V12M16.0003 12C18.2095 12 20.0003 10.2091 20.0003 8C20.0003 5.79086 18.2095 4 16.0003 4C13.7912 4 12.0003 5.79086 12.0003 8C12.0003 10.2091 13.7912 12 16.0003 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <p className="text-[#000206] font-openSans text-sm font-normal leading-relaxed max-w-sm">
                                Mara Court, 12 Sambrerio Close off Limpopo Street Maitama Abuja.
                            </p>
                        </div>
                    </div>

                    {/* Phone Contact */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Phone</h3>
                        <div className="flex items-start gap-3">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0 text-[#00A89D]">
                                <path d="M2.66675 5.33398C2.66675 4.5976 3.2637 4.00065 4.00008 4.00065H8.53341C8.92021 4.00065 9.24675 4.28065 9.30675 4.65398L10.0801 9.33398C10.1334 9.66732 9.97341 10.0007 9.69341 10.2007L7.52008 11.7073C8.92008 14.7207 11.2801 17.0807 14.2934 18.4807L15.8001 16.3073C16.0001 16.0273 16.3334 15.8673 16.6667 15.9207L21.3467 16.694C21.7201 16.754 22.0001 17.0807 22.0001 17.4673V22.0007C22.0001 22.737 21.4031 23.334 20.6667 23.334C11.3267 23.334 3.66675 15.674 3.66675 6.33398C3.66675 5.5976 4.2637 5.00065 4.00008 5.00065H2.66675V5.33398Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex flex-col gap-1">
                                <a href="tel:+2349128888816" className="text-[#000206] font-openSans text-sm font-normal hover:text-[#00A89D] transition-colors">
                                    +234 912 888 8816
                                </a>
                                <p className="text-[#4D5767] font-openSans text-xs">
                                    24/7 Support Available
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* General Contact Email */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">General Contact</h3>
                        <div className="flex items-start gap-3">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0 text-[#00A89D]">
                                <path d="M2.66675 8.00008C2.66675 6.15913 4.15908 4.66675 6.00008 4.66675H26.0001C27.841 4.66675 29.3334 6.15913 29.3334 8.00008V24.0001C29.3334 25.841 27.841 27.3334 26.0001 27.3334H6.00008C4.15913 27.3334 2.66675 25.841 2.66675 24.0001V8.00008Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M29.3334 8L16.0001 16.6667L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex flex-col gap-1">
                                <a href="mailto:info@asedoenergygroup.com" className="text-[#000206] font-openSans text-sm font-normal hover:text-[#00A89D] transition-colors">
                                    info@asedoenergygroup.com
                                </a>
                                <p className="text-[#4D5767] font-openSans text-xs">
                                    General Inquiries
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Careers Email */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-[#000] font-montserrat text-base md:text-lg font-semibold tracking-tight">Careers</h3>
                        <div className="flex items-start gap-3">
                            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 flex-shrink-0 text-[#00A89D]">
                                <path d="M2.66675 8.00008C2.66675 6.15913 4.15908 4.66675 6.00008 4.66675H26.0001C27.841 4.66675 29.3334 6.15913 29.3334 8.00008V24.0001C29.3334 25.841 27.841 27.3334 26.0001 27.3334H6.00008C4.15913 27.3334 2.66675 25.841 2.66675 24.0001V8.00008Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M29.3334 8L16.0001 16.6667L2.66675 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div className="flex flex-col gap-1">
                                <a href="mailto:careers@asedoenergygroup.com" className="text-[#000206] font-openSans text-sm font-normal hover:text-[#00A89D] transition-colors">
                                    careers@asedoenergygroup.com
                                </a>
                                <p className="text-[#4D5767] font-openSans text-xs">
                                    Join Our Team
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 md:pt-10 border-t border-[#000]">
                    <div className="flex justify-center items-center">
                        <p className="text-[#0A1E3F] font-openSans text-xs md:text-sm font-normal">{new Date().getFullYear()} ASEDO ENERGY GROUP. All rights reserved.</p>
                    </div>
                </div>

            </div>
        </footer>
    );
}
