"use client";

import { TeacherTable } from "@/components/tables/teacher-table";
import type { ITeacher } from "@/types/index";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axios";

export default function TeachersPage({
  teacherData: teachers,
}: {
  teacherData: ITeacher[];
}) {
  const router = useRouter();
  const handleAdd = async (
    teacher: Omit<ITeacher, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/teachers`, teacher);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (id: string, updatedTeacher: Partial<ITeacher>) => {
    const res = await axiosInstance.put(`/api/teachers/${id}`, updatedTeacher);

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/teachers/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Teachers Management</h1>
        <p className="text-muted-foreground">
          Manage profiles and details of teaching staff
        </p>
      </div>

      <TeacherTable
        data={teachers}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
