"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { projectsAPI, getImageUrl } from "../../lib/api";

export default function ProjectsManagement() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll(false); // Get all projects including unpublished
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await projectsAPI.delete(id);
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="bg-white shadow sm:rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No projects yet</p>
          <Link
            href="/admin/projects/new"
            className="inline-block px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
          >
            Create Your First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={getImageUrl(project.image_url) || "/projects/default-project.png"}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {project.featured && (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {project.category || "Uncategorized"}
                </p>
                <div
                  className="text-sm text-gray-500 line-clamp-2 mb-4 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
                <div className="flex items-center justify-between text-sm">
                  <span
                    className={`px-2 py-1 rounded-full ${project.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : project.status === "ongoing"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                      }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-gray-500">
                    {project.year || "N/A"}
                  </span>
                </div>
                <div className="mt-4 flex space-x-3 border-t pt-4">
                  <Link
                    href={`/admin/projects/${project.id}`}
                    className="flex-1 text-center text-sm font-medium text-[#00A89D] hover:text-[#0A1E3F]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    className="flex-1 text-center text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
