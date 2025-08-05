"use client";

import { HonoredStudentTable } from "@/components/tables/honored-student-table";
import axiosInstance from "@/lib/axios";
import type { IHonoredStudent } from "@/types/index";
import { useRouter } from "next/navigation";

export default function HonoredStudentsPage({
  honoredData: honoredStudents,
}: {
  honoredData: IHonoredStudent[];
}) {
  const router = useRouter();

  const handleAdd = async (
    student: Omit<IHonoredStudent, "_id" | "createdAt" | "updatedAt">
  ) => {
    const res = await axiosInstance.post(`/api/honored-students`, student);

    if (res.status === 200 || res.status === 201) {
      router.refresh();
    }
  };

  const handleEdit = async (
    id: string,
    updatedStudent: Partial<IHonoredStudent>
  ) => {
    const res = await axiosInstance.put(
      `/api/honored-students/${id}`,
      updatedStudent
    );

    if (res.status === 200) {
      router.refresh();
    }
  };

  const handleDelete = async (id: string) => {
    const res = await axiosInstance.delete(`/api/honored-students/${id}`);

    if (res.status === 200) {
      router.refresh();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Honored Students</h1>
        <p className="text-muted-foreground">
          Recognize and manage students honored for their achievements
        </p>
      </div>

      <HonoredStudentTable
        data={honoredStudents}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
