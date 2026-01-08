"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { teamAPI, getImageUrl } from "../../lib/api";

interface TeamMember {
  id: number;
  name: string;
  title: string;
  image_url: string;
  bio: string;
  order: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export default function TeamManagement() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await teamAPI.getAll(false); // Get all including unpublished
      setMembers(data);
    } catch (error) {
      console.error("Failed to fetch team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await teamAPI.delete(id);
      fetchMembers();
    } catch (error: any) {
      alert(error.message || "Failed to delete team member");
    }
  };

  const togglePublish = async (member: TeamMember) => {
    try {
      await teamAPI.update(member.id, { published: !member.published });
      fetchMembers();
    } catch (error: any) {
      alert(error.message || "Failed to update team member");
    }
  };

  if (isLoading) {
    return (
      <div className="p-8">
        <p>Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Team Management</h1>
        <button
          onClick={() => router.push("/admin/team/new")}
          className="bg-[#0A1E3F] text-white px-6 py-2 rounded-md hover:bg-[#00A89D] transition-colors"
        >
          Add Team Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No team members yet</p>
          <button
            onClick={() => router.push("/admin/team/new")}
            className="text-[#00A89D] hover:underline"
          >
            Add your first team member
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order
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
              {members.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={getImageUrl(member.image_url) || "/team/default-avatar.svg"}
                      alt={member.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {member.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{member.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{member.order}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${member.published
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                        }`}
                    >
                      {member.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => router.push(`/admin/team/${member.id}`)}
                      className="text-[#00A89D] hover:text-[#0A1E3F]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => togglePublish(member)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      {member.published ? "Unpublish" : "Publish"}
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
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
