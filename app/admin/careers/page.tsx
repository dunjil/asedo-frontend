"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { careersAPI } from "../../lib/api";

interface Career {
  id: number;
  title: string;
  department: string;
  location: string;
  employment_type: string;
  description?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function CareersManagement() {
  const router = useRouter();
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const data = await careersAPI.getAll(false); // Get all including unpublished
      setCareers(data);
    } catch (error) {
      console.error("Failed to fetch careers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job posting?")) return;

    try {
      await careersAPI.delete(id);
      fetchCareers();
    } catch (error: any) {
      alert(error.message || "Failed to delete job posting");
    }
  };

  const togglePublish = async (career: Career) => {
    try {
      await careersAPI.update(career.id, { published: !career.published });
      fetchCareers();
    } catch (error: any) {
      alert(error.message || "Failed to update job posting");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading job postings...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Careers Management</h1>
        <button
          onClick={() => router.push("/admin/careers/new")}
          className="bg-[#0A1E3F] text-white px-6 py-2 rounded-md hover:bg-[#00A89D] transition-colors"
        >
          Add Job Posting
        </button>
      </div>

      {careers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No job postings yet</p>
          <button
            onClick={() => router.push("/admin/careers/new")}
            className="text-[#00A89D] hover:underline"
          >
            Add your first job posting
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {careers.map((career) => (
                <tr key={career.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      {career.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{career.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{career.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{career.employment_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${career.published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {career.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => router.push(`/admin/careers/${career.id}`)}
                      className="text-[#00A89D] hover:text-[#0A1E3F]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => togglePublish(career)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {career.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(career.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
