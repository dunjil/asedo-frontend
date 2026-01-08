"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { projectsAPI, getImageUrl } from "../../../lib/api";
import RichTextEditor from "../../../components/RichTextEditor";
import MultipleImageUploader from "../../../components/MultipleImageUploader";

export default function EditProject() {
    const router = useRouter();
    const params = useParams();
    const projectId = parseInt(params.id as string);

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
    const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProject();
    }, [projectId]);

    const handleImageUpload = async (files: File[]): Promise<string[]> => {
        const uploadFormData = new FormData();
        files.forEach((file) => {
            uploadFormData.append('files', file);
        });

        let token = localStorage.getItem('access_token');

        if (!token) {
            alert('Please log in again to upload images');
            throw new Error('No access token found');
        }

        const uploadWithToken = async (authToken: string) => {
            return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upload/images`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
                body: uploadFormData,
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
                        alert('Session expired. Please log in again.');
                        window.location.href = '/admin/login';
                        throw new Error('Session expired');
                    }
                } catch (error) {
                    localStorage.clear();
                    alert('Session expired. Please log in again.');
                    window.location.href = '/admin/login';
                    throw error;
                }
            } else {
                localStorage.clear();
                alert('Session expired. Please log in again.');
                window.location.href = '/admin/login';
                throw new Error('No refresh token found');
            }
        }

        if (!response.ok) {
            const errorText = await response.text();
            try {
                const errorData = JSON.parse(errorText);
                const errorMsg = errorData.detail || 'Failed to upload images';
                alert(`Upload failed: ${errorMsg}`);
                throw new Error(errorMsg);
            } catch (e) {
                alert(`Upload failed (${response.status}): ${errorText}`);
                throw new Error(`Upload failed: ${errorText}`);
            }
        }

        const data = await response.json();

        // Show errors if any files failed
        if (data.errors && data.errors.length > 0) {
            alert(`Warning: ${data.errors.length} image(s) failed to upload. ${data.total} uploaded successfully.`);
        }

        return data.uploaded.map((file: any) => file.url);
    };

    const fetchProject = async () => {
        try {
            const projects = await projectsAPI.getAll();
            const project = projects.find((p: any) => p.id === projectId);

            if (project) {
                setFormData({
                    title: project.title,
                    slug: project.slug,
                    description: project.description,
                    image_url: project.image_url || "",
                    images: project.images || [],
                    category: project.category || "",
                    status: project.status,
                    location: project.location || "",
                    year: project.year || new Date().getFullYear(),
                    client: project.client || "",
                    featured: project.featured,
                    display_order: project.display_order,
                });
            } else {
                setError("Project not found");
            }
        } catch (err) {
            setError("Failed to load project");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            // Upload new images if there are any
            let uploadedImageUrls: string[] = [];
            if (newImageFiles.length > 0) {
                uploadedImageUrls = await handleImageUpload(newImageFiles);
            }

            // Combine existing images with newly uploaded ones
            const allImages = [...formData.images, ...uploadedImageUrls];

            // Update project with all image URLs
            const projectData = {
                ...formData,
                images: allImages,
                image_url: allImages.length > 0 ? allImages[0] : formData.image_url,
            };

            await projectsAPI.update(projectId, projectData);
            router.push("/admin/projects");
        } catch (err: any) {
            setError(err.message || "Failed to update project");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading project...</div>
            </div>
        );
    }

    if (error && !formData.title) {
        return (
            <div className="px-4 py-6">
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-800">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Update project information
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
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
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
                            {formData.images.length > 0 && (
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Existing Images
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {formData.images.map((imageUrl, index) => (
                                            <div key={index} className="relative group border-2 border-gray-300 rounded-lg overflow-hidden">
                                                <div className="aspect-square relative bg-gray-100">
                                                    <img
                                                        src={getImageUrl(imageUrl)}
                                                        alt={`Image ${index + 1}`}
                                                        style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            display: 'block',
                                                            filter: 'none !important',
                                                            mixBlendMode: 'normal',
                                                            imageRendering: 'auto'
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const newImages = formData.images.filter((_, i) => i !== index);
                                                        setFormData({ ...formData, images: newImages });
                                                    }}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Remove"
                                                >
                                                    ✕
                                                </button>
                                                <div className="absolute top-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                                    #{index + 1}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <MultipleImageUploader
                                files={newImageFiles}
                                onChange={setNewImageFiles}
                                maxImages={20 - formData.images.length}
                            />
                            <p className="mt-2 text-xs text-gray-500">
                                Add up to {20 - formData.images.length} more images. The first image will be used as the main project image.
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
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
