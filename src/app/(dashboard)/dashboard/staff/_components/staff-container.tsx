"use client";

import { StaffTable } from "@/components/tables/staff-table";
import type { IStaff } from "@/types/index";
import axiosInstance from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function StaffPage({
  staffData: staffMembers,
}: {
  staffData: IStaff[];
}) {
  const router = useRouter();

  const handleAdd = async (
    staff: Omit<IStaff, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/staffs`, staff);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedStaff: Partial<IStaff>) => {
    const res = await axiosInstance.put(`/api/staffs/${id}`, updatedStaff);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/staffs/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Staff Management</h1>
        <p className="text-muted-foreground">
          Manage all non-teaching and support staff members
        </p>
      </div>

      <StaffTable
        data={staffMembers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
