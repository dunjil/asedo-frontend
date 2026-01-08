"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { projectsAPI } from "../../../lib/api";
import ImageUpload from "../../components/ImageUpload";
import RichTextEditor from "../../../components/RichTextEditor";
import MultipleImageUploader from "../../../components/MultipleImageUploader";
import Modal from "../../components/Modal";

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    image_url: "",
    images: [] as string[],
    category: "",
    status: "completed",
    location: "",
    year: new Date().getFullYear(),
    client: "",
    featured: false,
    display_order: 0,
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    type: 'success' as 'success' | 'error' | 'info',
    title: '',
    message: ''
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleImageUpload = async (files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    let token = localStorage.getItem('access_token');

    if (!token) {
      throw new Error('No access token found. Please log in again.');
    }

    const uploadWithToken = async (authToken: string) => {
      return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData,
      });
    };

    let response = await uploadWithToken(token);

    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          });

          if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            localStorage.setItem('access_token', refreshData.access_token);
            localStorage.setItem('refresh_token', refreshData.refresh_token);

            // Retry upload with new token
            response = await uploadWithToken(refreshData.access_token);
          } else {
            localStorage.clear();
            throw new Error('Session expired. Please log in again.');
          }
        } catch (error) {
          localStorage.clear();
          throw new Error('Session expired. Please log in again.');
        }
      } else {
        localStorage.clear();
        throw new Error('No refresh token found. Please log in again.');
      }
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);

      try {
        const errorData = JSON.parse(errorText);
        const errorMsg = errorData.detail || 'Failed to upload images';
        throw new Error(errorMsg);
      } catch (e) {
        throw new Error(`Upload failed (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();

    // Show errors if any files failed
    if (data.errors && data.errors.length > 0) {
      console.warn('Some images failed to upload:', data.errors);
      // Don't use alert() as it blocks the UI - let the form handle showing the error
      throw new Error(`${data.errors.length} image(s) failed to upload. ${data.total} uploaded successfully.`);
    }

    return data.uploaded.map((file: any) => file.url);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      // Upload images first if there are any
      let uploadedImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        try {
          uploadedImageUrls = await handleImageUpload(imageFiles);
        } catch (uploadError: any) {
          // Don't clear the imageFiles here - let user retry or remove failed files
          throw new Error(`Image upload failed: ${uploadError.message}`);
        }
      }

      // Create project with uploaded image URLs
      const projectData = {
        ...formData,
        images: uploadedImageUrls,
        image_url: uploadedImageUrls.length > 0 ? uploadedImageUrls[0] : formData.image_url,
      };

      await projectsAPI.create(projectData);
      router.push("/admin/projects");
    } catch (err: any) {
      // Show error modal instead of inline error
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Upload Failed',
        message: err.message || "Failed to create project. Please try again."
      });
      // Keep imageFiles so user can retry or modify selection
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
        <p className="mt-2 text-sm text-gray-600">
          Add a new project to your portfolio
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Slug *
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <RichTextEditor
                value={formData.description}
                onChange={(html) =>
                  setFormData({ ...formData, description: html })
                }
              />
            </div>

            <div className="sm:col-span-2">
              <MultipleImageUploader
                files={imageFiles}
                onChange={setImageFiles}
                maxImages={20}
              />
              <p className="mt-2 text-xs text-gray-500">
                Add up to 20 images. The first image will be used as the main project image.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="e.g., Offshore Drilling"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="completed">Completed</option>
                <option value="ongoing">Ongoing</option>
                <option value="planned">Planned</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., Gulf of Guinea"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Client
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Display Order
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    display_order: parseInt(e.target.value),
                  })
                }
              />
              <p className="mt-1 text-xs text-gray-500">
                Lower numbers appear first
              </p>
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  className="h-4 w-4 text-[#00A89D] focus:ring-[#00A89D] border-gray-300 rounded"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Featured project
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00A89D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal(prev => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        autoClose={modal.type === 'success'}
        autoCloseDelay={2000}
      />
    </div>
  );
}
