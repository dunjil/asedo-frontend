"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { blogAPI, getImageUrl } from "../../lib/api";

export default function BlogManagement() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await blogAPI.getAll(false); // Get all blogs including unpublished
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await blogAPI.delete(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      alert("Failed to delete blog post");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading blog posts...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all your blog posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
        >
          New Blog Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white shadow sm:rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/new"
            className="inline-block px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
          >
            Create Your First Post
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {blogs.map((blog) => (
              <li key={blog.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={getImageUrl(blog.image_url) || "/blog/default-blog.png"}
                        alt={blog.title}
                        className="h-20 w-32 object-cover rounded-md border border-gray-200"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-[#0A1E3F] truncate">
                          {blog.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${blog.published
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                              }`}
                          >
                            {blog.published ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            By {blog.author} • {blog.category || "Uncategorized"}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {new Date(blog.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <Link
                          href={`/admin/blog/${blog.id}`}
                          className="text-sm font-medium text-[#00A89D] hover:text-[#0A1E3F]"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(blog.id, blog.title)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        {blog.published && (
                          <Link
                            href={`/blog/${blog.slug}`}
                            target="_blank"
                            className="text-sm font-medium text-gray-600 hover:text-gray-800"
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
