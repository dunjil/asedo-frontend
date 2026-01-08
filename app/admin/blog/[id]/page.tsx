"use client";

import { useState, FormEvent, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { blogAPI } from "../../../lib/api";
import ImageUpload from "../../components/ImageUpload";
import RichTextEditor from "../../../components/RichTextEditor";

export default function EditBlogPost() {
    const router = useRouter();
    const params = useParams();
    const postId = parseInt(params.id as string);

    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        image_url: "",
        category: "",
        tags: "",
        published: false,
        featured: false,
        created_at: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchBlogPost();
    }, [postId]);

    const fetchBlogPost = async () => {
        try {
            // We need to get all blogs and find the one with matching ID
            const blogs = await blogAPI.getAll(false);
            const blog = blogs.find((b: any) => b.id === postId);

            if (blog) {
                // Format created_at for datetime-local input
                const createdDate = blog.created_at ? new Date(blog.created_at).toISOString().slice(0, 16) : "";
                setFormData({
                    title: blog.title,
                    slug: blog.slug,
                    content: blog.content,
                    excerpt: blog.excerpt || "",
                    image_url: blog.image_url || "",
                    category: blog.category || "",
                    tags: blog.tags || "",
                    published: blog.published,
                    featured: blog.featured,
                    created_at: createdDate,
                });
            } else{
                setError("Blog post not found");
            }
        } catch (err) {
            setError("Failed to load blog post");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSaving(true);

        try {
            await blogAPI.update(postId, formData);
            router.push("/admin/blog");
        } catch (err: any) {
            setError(err.message || "Failed to update blog post");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading blog post...</div>
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
                <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
                <p className="mt-2 text-sm text-gray-600">
                    Update your blog post content
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
                            <label className="block text-sm font-medium text-gray-700">
                                Excerpt
                            </label>
                            <textarea
                                rows={2}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                                value={formData.excerpt}
                                onChange={(e) =>
                                    setFormData({ ...formData, excerpt: e.target.value })
                                }
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Content *
                            </label>
                            <RichTextEditor
                                value={formData.content}
                                onChange={(html) =>
                                    setFormData({ ...formData, content: html })
                                }
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <ImageUpload
                                value={formData.image_url}
                                onChange={(url) =>
                                    setFormData({ ...formData, image_url: url })
                                }
                                label="Featured Image"
                            />
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
                                Tags
                            </label>
                            <input
                                type="text"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                                value={formData.tags}
                                onChange={(e) =>
                                    setFormData({ ...formData, tags: e.target.value })
                                }
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Post Date
                            </label>
                            <input
                                type="datetime-local"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                                value={formData.created_at}
                                onChange={(e) =>
                                    setFormData({ ...formData, created_at: e.target.value })
                                }
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Set the date and time when this post was published
                            </p>
                        </div>

                        <div className="sm:col-span-2 space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="published"
                                    className="h-4 w-4 text-[#00A89D] focus:ring-[#00A89D] border-gray-300 rounded"
                                    checked={formData.published}
                                    onChange={(e) =>
                                        setFormData({ ...formData, published: e.target.checked })
                                    }
                                />
                                <label
                                    htmlFor="published"
                                    className="ml-2 block text-sm text-gray-900"
                                >
                                    Published
                                </label>
                            </div>

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
                                    Featured post
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
