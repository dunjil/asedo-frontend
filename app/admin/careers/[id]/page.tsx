"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { careersAPI } from "../../../lib/api";

interface CareerForm {
  title: string;
  department: string;
  location: string;
  employment_type: string;
  published: boolean;
  created_at?: string;
}

export default function CareerFormPage() {
  const router = useRouter();
  const params = useParams();
  const isNew = params.id === "new";

  const [formData, setFormData] = useState<CareerForm>({
    title: "",
    department: "",
    location: "",
    employment_type: "Full-time",
    published: false,
    created_at: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      fetchCareer();
    }
  }, [params.id]);

  const fetchCareer = async () => {
    setIsLoading(true);
    try {
      const data = await careersAPI.getById(Number(params.id));
      // Format created_at for datetime-local input
      const createdDate = data.created_at ? new Date(data.created_at).toISOString().slice(0, 16) : "";
      setFormData({
        title: data.title,
        department: data.department,
        location: data.location,
        employment_type: data.employment_type,
        published: data.published,
        created_at: createdDate,
      });
    } catch (error) {
      console.error("Failed to fetch career:", error);
      alert("Failed to load job posting");
      router.push("/admin/careers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (isNew) {
        await careersAPI.create(formData);
      } else {
        await careersAPI.update(Number(params.id), formData);
      }
      router.push("/admin/careers");
    } catch (error: any) {
      alert(error.message || "Failed to save job posting");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.push("/admin/careers")}
          className="text-[#00A89D] hover:underline mb-4"
        >
          ← Back to Careers
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          {isNew ? "Add Job Posting" : "Edit Job Posting"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Senior Project Manager"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00A89D] focus:border-[#00A89D]"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department *
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              placeholder="e.g., Engineering"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00A89D] focus:border-[#00A89D]"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="e.g., Lagos, Nigeria"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00A89D] focus:border-[#00A89D]"
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type *
            </label>
            <select
              name="employment_type"
              value={formData.employment_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00A89D] focus:border-[#00A89D]"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Post Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Post Date
            </label>
            <input
              type="datetime-local"
              name="created_at"
              value={formData.created_at}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#00A89D] focus:border-[#00A89D]"
            />
            <p className="mt-1 text-sm text-gray-500">
              Set the date and time when this job was posted
            </p>
          </div>

          {/* Published */}
          <div className="flex items-center">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
              className="h-4 w-4 text-[#00A89D] focus:ring-[#00A89D] border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-700">
              Publish immediately
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#0A1E3F] text-white px-6 py-2 rounded-md hover:bg-[#00A89D] transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : isNew ? "Create Job Posting" : "Update Job Posting"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/careers")}
              className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
