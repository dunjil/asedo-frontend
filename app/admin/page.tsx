"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blogAPI, projectsAPI, teamAPI, servicesAPI } from "../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    totalTeamMembers: 0,
    totalServices: 0,
    publishedServices: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [allBlogs, projects, teamMembers, services] = await Promise.all([
          blogAPI.getAll(false),
          projectsAPI.getAll(),
          teamAPI.getAll(false),
          servicesAPI.getAll(false),
        ]);

        setStats({
          totalBlogs: allBlogs.length,
          publishedBlogs: allBlogs.filter((b: any) => b.published).length,
          totalProjects: projects.length,
          totalTeamMembers: teamMembers.length,
          totalServices: services.length,
          publishedServices: services.filter((s: any) => s.published).length,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <Link href="/admin/blog" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">📝</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Blog Posts
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalBlogs}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/blog" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">✅</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Published Blogs
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.publishedBlogs}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/projects" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">🏗️</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Projects
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalProjects}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/team" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">👥</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Team Members
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalTeamMembers}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/services" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">⚡</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Services
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.totalServices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/services" className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-4xl">🟢</div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Published Services
                  </dt>
                  <dd className="text-3xl font-semibold text-gray-900">
                    {stats.publishedServices}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/content"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#00A89D]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00A89D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Edit Content
                </p>
                <p className="text-sm text-gray-500">Vision & Mission</p>
              </div>
            </Link>

            <Link
              href="/admin/blog/new"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#E3A700]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E3A700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New Blog Post
                </p>
                <p className="text-sm text-gray-500">Create article</p>
              </div>
            </Link>

            <Link
              href="/admin/projects/new"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0A1E3F]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New Project
                </p>
                <p className="text-sm text-gray-500">Add portfolio item</p>
              </div>
            </Link>

            <Link
              href="/admin/team/new"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#00A89D]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#00A89D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New Team Member
                </p>
                <p className="text-sm text-gray-500">Add to the team</p>
              </div>
            </Link>

            <Link
              href="/admin/services/new"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#E3A700]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#E3A700]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  New Service
                </p>
                <p className="text-sm text-gray-500">Add new service</p>
              </div>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-[#00A89D] hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[#0A1E3F]/10 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#0A1E3F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  View Website
                </p>
                <p className="text-sm text-gray-500">Preview changes</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
