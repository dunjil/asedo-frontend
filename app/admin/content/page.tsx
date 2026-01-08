"use client";

import { useEffect, useState, FormEvent } from "react";
import { contentAPI } from "../../lib/api";

export default function ContentManagement() {
  const [content, setContent] = useState({
    vision: "",
    mission: "",
    about_text: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const data = await contentAPI.get();
      setContent(data);
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await contentAPI.update(content);
      setMessage({ type: "success", text: "Content updated successfully!" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update content",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading content...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage your website's vision, mission, and about text
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {message && (
            <div
              className={`rounded-md p-4 ${
                message.type === "success"
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              <div className="text-sm">{message.text}</div>
            </div>
          )}

          <div>
            <label
              htmlFor="vision"
              className="block text-sm font-medium text-gray-700"
            >
              Vision
            </label>
            <textarea
              id="vision"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
              placeholder="Enter your company vision..."
              value={content.vision}
              onChange={(e) =>
                setContent({ ...content, vision: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="mission"
              className="block text-sm font-medium text-gray-700"
            >
              Mission
            </label>
            <textarea
              id="mission"
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
              placeholder="Enter your company mission..."
              value={content.mission}
              onChange={(e) =>
                setContent({ ...content, mission: e.target.value })
              }
            />
          </div>

          <div>
            <label
              htmlFor="about_text"
              className="block text-sm font-medium text-gray-700"
            >
              About Text
            </label>
            <textarea
              id="about_text"
              rows={6}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
              placeholder="Enter about text..."
              value={content.about_text}
              onChange={(e) =>
                setContent({ ...content, about_text: e.target.value })
              }
            />
          </div>

          <div className="flex justify-end">
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
