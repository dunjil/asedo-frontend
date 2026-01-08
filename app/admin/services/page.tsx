"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { servicesAPI, getImageUrl } from "../../lib/api";

export default function ServicesManagement() {
  const router = useRouter();
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await servicesAPI.getAll(false); // Get all services including unpublished
      setServices(data);
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      await servicesAPI.delete(id);
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      alert("Failed to delete service");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all your services
          </p>
        </div>
        <Link
          href="/admin/services/new"
          className="px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
        >
          New Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="bg-white shadow sm:rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">No services yet</p>
          <Link
            href="/admin/services/new"
            className="inline-block px-6 py-2 bg-[#0A1E3F] text-white font-medium rounded-md hover:bg-[#00A89D] transition-colors"
          >
            Create Your First Service
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {services.map((service) => (
              <li key={service.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-start gap-4">
                    {/* Thumbnail Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={getImageUrl(service.image) || "/services/default-service.jpg"}
                        alt={service.title}
                        className="h-20 w-32 object-cover rounded-md border border-gray-200"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-[#0A1E3F] truncate">
                          {service.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex gap-2">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              service.published
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {service.published ? "Published" : "Draft"}
                          </span>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            Order: {service.order}
                          </span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {service.subtitle}
                        </p>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            {service.slug} • {service.contact_email}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <p>
                            {new Date(service.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="text-sm font-medium text-[#00A89D] hover:text-[#0A1E3F]"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(service.id, service.title)}
                          className="text-sm font-medium text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                        {service.published && (
                          <Link
                            href={`/services/${service.slug}`}
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
