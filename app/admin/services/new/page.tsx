"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { servicesAPI } from "../../../lib/api";
import ImageUpload from "../../components/ImageUpload";
import RichTextEditor from "../../../components/RichTextEditor";

export default function NewService() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    excerpt: "",
    image: "",
    contact_email: "",
    intro: "",
    sections: [{ title: "", content: "", list: [] as string[] }],
    whatSetsUsApart: { title: "", points: [] as string[] },
    published: true,
    order: 0,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

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

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [...formData.sections, { title: "", content: "", list: [] }],
    });
  };

  const removeSection = (index: number) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
    });
  };

  const updateSection = (index: number, field: string, value: any) => {
    const newSections = [...formData.sections];
    newSections[index] = { ...newSections[index], [field]: value };
    setFormData({ ...formData, sections: newSections });
  };

  const addSectionListItem = (index: number) => {
    const newSections = [...formData.sections];
    newSections[index].list.push("");
    setFormData({ ...formData, sections: newSections });
  };

  const updateSectionListItem = (sectionIndex: number, listIndex: number, value: string) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].list[listIndex] = value;
    setFormData({ ...formData, sections: newSections });
  };

  const removeSectionListItem = (sectionIndex: number, listIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].list = newSections[sectionIndex].list.filter((_, i) => i !== listIndex);
    setFormData({ ...formData, sections: newSections });
  };

  const addWhatSetsUsApartPoint = () => {
    setFormData({
      ...formData,
      whatSetsUsApart: {
        ...formData.whatSetsUsApart,
        points: [...formData.whatSetsUsApart.points, ""],
      },
    });
  };

  const updateWhatSetsUsApartPoint = (index: number, value: string) => {
    const newPoints = [...formData.whatSetsUsApart.points];
    newPoints[index] = value;
    setFormData({
      ...formData,
      whatSetsUsApart: { ...formData.whatSetsUsApart, points: newPoints },
    });
  };

  const removeWhatSetsUsApartPoint = (index: number) => {
    setFormData({
      ...formData,
      whatSetsUsApart: {
        ...formData.whatSetsUsApart,
        points: formData.whatSetsUsApart.points.filter((_, i) => i !== index),
      },
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSaving(true);

    try {
      const serviceData = {
        slug: formData.slug,
        title: formData.title,
        subtitle: formData.subtitle,
        excerpt: formData.excerpt,
        image: formData.image,
        contact_email: formData.contact_email,
        content: {
          intro: formData.intro,
          sections: formData.sections.map(section => ({
            title: section.title,
            content: section.content,
            ...(section.list.length > 0 ? { list: section.list.filter(item => item.trim() !== "") } : {}),
          })),
          ...(formData.whatSetsUsApart.title && formData.whatSetsUsApart.points.length > 0
            ? {
                whatSetsUsApart: {
                  title: formData.whatSetsUsApart.title,
                  points: formData.whatSetsUsApart.points.filter(point => point.trim() !== ""),
                },
              }
            : {}),
        },
        published: formData.published,
        order: formData.order,
      };

      await servicesAPI.create(serviceData);
      router.push("/admin/services");
    } catch (err: any) {
      setError(err.message || "Failed to create service");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Service</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create a new service for your website
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-800">{error}</div>
            </div>
          )}

          {/* Basic Information */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
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
                <p className="mt-1 text-xs text-gray-500">
                  URL-friendly version of the title
                </p>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Subtitle *
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                  value={formData.subtitle}
                  onChange={(e) =>
                    setFormData({ ...formData, subtitle: e.target.value })
                  }
                  placeholder="Brief tagline for the service"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Excerpt *
                </label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Brief summary of the service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact Email *
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                  value={formData.contact_email}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_email: e.target.value })
                  }
                  placeholder="service@asedoenergy.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Order
                </label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
                  }
                  placeholder="0"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Display order (lower numbers appear first)
                </p>
              </div>

              <div className="sm:col-span-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(url) =>
                    setFormData({ ...formData, image: url })
                  }
                  label="Service Image *"
                />
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Intro Content *
              </label>
              <RichTextEditor
                value={formData.intro}
                onChange={(html) =>
                  setFormData({ ...formData, intro: html })
                }
                placeholder="Write the introduction for this service..."
              />
            </div>
          </div>

          {/* Content Sections */}
          <div className="border-b border-gray-200 pb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Content Sections</h2>
              <button
                type="button"
                onClick={addSection}
                className="px-4 py-2 text-sm bg-[#00A89D] text-white rounded-md hover:bg-[#009890]"
              >
                + Add Section
              </button>
            </div>

            {formData.sections.map((section, index) => (
              <div key={index} className="mb-6 p-6 border border-gray-200 rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Section {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => removeSection(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove Section
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Section Title
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-3 border"
                      value={section.title}
                      onChange={(e) => updateSection(index, "title", e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Section Content
                    </label>
                    <RichTextEditor
                      value={section.content}
                      onChange={(html) => updateSection(index, "content", html)}
                      placeholder="Write the section content..."
                    />
                  </div>

                  {/* List Items */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        List Items (Optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => addSectionListItem(index)}
                        className="text-sm text-[#00A89D] hover:text-[#009890]"
                      >
                        + Add List Item
                      </button>
                    </div>
                    {section.list.map((item, listIndex) => (
                      <div key={listIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-[#00A89D] focus:ring-[#00A89D] sm:text-sm p-2 border"
                          value={item}
                          onChange={(e) => updateSectionListItem(index, listIndex, e.target.value)}
                          placeholder="List item"
                        />
                        <button
                          type="button"
                          onClick={() => removeSectionListItem(index, listIndex)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>



          {/* Publishing Options */}
          <div className="pb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Publishing Options</h2>
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
                Publish immediately
              </label>
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
              {isSaving ? "Creating..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
