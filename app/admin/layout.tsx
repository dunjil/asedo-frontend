"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "../lib/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Skip auth check for login page
    if (pathname === "/admin/login") {
      setIsLoading(false);
      return;
    }

    // Check if user is authenticated
    const checkAuth = () => {
      if (!authAPI.isAuthenticated()) {
        router.push("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    authAPI.logout();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="text-lg text-[#0A1E3F]">Loading...</div>
      </div>
    );
  }

  // Show login page without admin navigation
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Show admin dashboard with navigation
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Admin Navigation */}
      <nav className="bg-gradient-to-r from-[#0A1E3F] via-[#00A89D] to-[#E3A700] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 md:h-20">
            <div className="flex items-center">
              <Link href="/admin" className="flex items-center">
                <img
                  src="/logos/logo.png"
                  alt="ASEDO Energy Group"
                  className="h-10 md:h-12 w-auto max-w-full"
                />
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex ml-10 space-x-8">
                <Link
                  href="/admin"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/content"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Content
                </Link>
                <Link
                  href="/admin/blog"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Blog Posts
                </Link>
                <Link
                  href="/admin/projects"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Projects
                </Link>
                <Link
                  href="/admin/team"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Team
                </Link>
                <Link
                  href="/admin/services"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Services
                </Link>
                <Link
                  href="/admin/careers"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-[#00A89D]"
                >
                  Careers
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Desktop View Site & Logout */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-[#00A89D]"
                  target="_blank"
                >
                  View Site
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  Logout
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-white/20">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/content"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Content
                </Link>
                <Link
                  href="/admin/blog"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog Posts
                </Link>
                <Link
                  href="/admin/projects"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/admin/team"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Team
                </Link>
                <Link
                  href="/admin/services"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/admin/careers"
                  className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Careers
                </Link>
                <div className="border-t border-white/20 pt-4 mt-4">
                  <Link
                    href="/"
                    className="block px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                    target="_blank"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    View Site
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-white hover:bg-white/10 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
